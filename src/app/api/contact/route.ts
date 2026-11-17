import dns from "node:dns";
import { Resolver } from "node:dns/promises";
import https from "node:https";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

// Some local networks/routers fail to resolve api.resend.com via their own
// DNS (intermittent SERVFAIL), while public DNS works fine. Try the system
// resolver first, then fall back to Cloudflare/Google resolvers — scoped to
// this app's requests only.
const fallbackResolver = new Resolver();
fallbackResolver.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);

const lookup: typeof dns.lookup = ((
  hostname: string,
  options: dns.LookupOptions & { all?: boolean },
  callback: (
    err: NodeJS.ErrnoException | null,
    address: string | dns.LookupAddress[],
    family?: number,
  ) => void,
) => {
  const all = options?.all === true;
  const succeed = (addrs: dns.LookupAddress[]) => {
    if (all) callback(null, addrs);
    else callback(null, addrs[0].address, addrs[0].family);
  };
  const fail = (err: NodeJS.ErrnoException) => {
    if (all) callback(err, []);
    else callback(err, "", 0);
  };
  dns.lookup(hostname, options, (err, address, family) => {
    if (!err) {
      if (all) return callback(null, address as dns.LookupAddress[]);
      return callback(null, address as string, family);
    }
    fallbackResolver
      .resolve4(hostname)
      .then((addrs) => succeed(addrs.map((address) => ({ address, family: 4 }))))
      .catch(() => fail(err));
  });
}) as typeof dns.lookup;

function postResendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<{ status: number; body: { message?: string } }> {
  return new Promise((resolve, reject) => {
    const data = Buffer.from(JSON.stringify(payload));
    const req = https.request(
      {
        hostname: "api.resend.com",
        path: "/emails",
        method: "POST",
        lookup,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
        timeout: 15000,
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode ?? 0, body: JSON.parse(raw || "{}") });
          } catch {
            resolve({ status: res.statusCode ?? 0, body: { message: raw } });
          }
        });
      },
    );
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("Resend request timed out")));
    req.write(data);
    req.end();
  });
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field; real users never see it.
  if ((form.get("company") as string | null)?.trim()) {
    return Response.json({ ok: true });
  }

  const field = (key: string) => (form.get(key) as string | null)?.trim() ?? "";
  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const location = field("location");
  const type = field("type");
  const pickupWindow = field("window");
  const notes = field("notes");

  if (!name || !notes) {
    return Response.json(
      { error: "Name and details about the job are required." },
      { status: 400 },
    );
  }
  if (!email && !phone) {
    return Response.json(
      { error: "Add a phone number or an email so we can reach you." },
      { status: 400 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address does not look right." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact form email.");
    return Response.json(
      { error: "The form is not configured yet. Please call instead." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "lobojunkremover@gmail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "LOBO Junk Removal <onboarding@resend.dev>";

  const files = form
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length > MAX_FILES) {
    return Response.json({ error: "Up to 5 files, please." }, { status: 400 });
  }

  const attachments = [];
  for (const f of files) {
    if (f.size > MAX_FILE_BYTES) {
      return Response.json(
        { error: `"${f.name}" is over the 5 MB limit.` },
        { status: 400 },
      );
    }
    if (f.type && !ALLOWED_MIME.has(f.type)) {
      return Response.json(
        { error: `"${f.name}" is not a supported file type.` },
        { status: 400 },
      );
    }
    attachments.push({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
    });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone || "—"],
    ["Email", email || "—"],
    ["City / ZIP", location || "—"],
    ["Job type", type || "—"],
    ["Timeframe", pickupWindow || "—"],
  ];

  const text = [
    "New quote request — LOBO Junk Removal",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "What needs to go:",
    notes,
    "",
    attachments.length
      ? `Attachments: ${attachments.map((a) => a.filename).join(", ")}`
      : "Attachments: none",
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
      <div style="background:#111; padding:16px 20px;">
        <p style="margin:0; color:#f5c518; font-size:11px; letter-spacing:2px; text-transform:uppercase;">LOBO Junk Removal</p>
        <h1 style="margin:6px 0 0; color:#fff; font-size:20px;">New quote request</h1>
      </div>
      <div style="border:1px solid #e5e5e5; border-top:0; padding:20px;">
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:6px 12px 6px 0; color:#666; white-space:nowrap; vertical-align:top;">${esc(k)}</td>
              <td style="padding:6px 0;">${esc(v)}</td>
            </tr>`,
            )
            .join("")}
        </table>
        <p style="margin:18px 0 6px; color:#666; font-size:11px; letter-spacing:1px; text-transform:uppercase;">What needs to go</p>
        <p style="margin:0; font-size:14px; line-height:1.6; white-space:pre-wrap;">${esc(notes)}</p>
        <p style="margin:18px 0 0; font-size:12px; color:#666;">
          ${
            attachments.length
              ? `Attachments: ${esc(attachments.map((a) => a.filename).join(", "))}`
              : "No photos attached."
          }
        </p>
      </div>
    </div>`;

  const payload = {
    from,
    to,
    ...(email ? { reply_to: email } : {}),
    subject: `Quote request — ${name}${location ? ` (${location})` : ""}`,
    text,
    html,
    attachments: attachments.map((a) => ({
      filename: a.filename,
      content: a.content.toString("base64"),
    })),
  };

  let error: { message: string; statusCode?: number | null } | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 400 * attempt));
    try {
      const { status, body } = await postResendEmail(apiKey, payload);
      if (status >= 200 && status < 300) break;
      error = {
        message: body.message ?? `Resend responded with status ${status}`,
        statusCode: status,
      };
    } catch (e) {
      error = { message: e instanceof Error ? e.message : String(e), statusCode: null };
    }
    const retryable =
      error.statusCode == null ||
      error.statusCode === 429 ||
      (error.statusCode >= 500 && error.statusCode < 600);
    console.error(`Resend error (attempt ${attempt + 1}/3):`, error);
    if (!retryable) break;
  }

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { error: "Something went wrong sending your request. Please call us instead." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
