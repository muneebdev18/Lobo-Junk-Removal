import puppeteer from "puppeteer-core";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const ports = [3000, 3001];

for (const port of ports) {
  try {
    const browser = await puppeteer.launch({ executablePath: chromePath, headless: "new", args: ["--no-sandbox"] });
    const page = await browser.newPage();
    page.on("console", (msg) => console.log(`[CONSOLE ${msg.type()}] ${msg.text()}`));
    page.on("pageerror", (err) => console.log("[PAGE ERROR]", err.message));
    page.on("requestfailed", (req) => console.log("[REQ FAIL]", req.url(), req.failure?.errorText));
    await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle2", timeout: 20000 });
    await new Promise((r) => setTimeout(r, 2000));

    const testi = await page.$("#testimonials");
    console.log(`\n=== PORT ${port} ===`);
    console.log("testimonials section exists:", !!testi);

    if (testi) {
      const visible = await testi.isVisible();
      const box = await testi.boundingBox();
      console.log("section visible:", visible, "box:", JSON.stringify(box));

      const cards = await testi.$$(".testi-card");
      console.log("card count:", cards.length);
      for (let i = 0; i < cards.length; i++) {
        const v = await cards[i].isVisible();
        const box = await cards[i].boundingBox();
        const style = await cards[i].evaluate((el) => el.getAttribute("style"));
        const opacity = await cards[i].evaluate((el) => window.getComputedStyle(el).opacity);
        const visibility = await cards[i].evaluate((el) => window.getComputedStyle(el).visibility);
        console.log(`  card ${i}: visible=${v} opacity=${opacity} visibility=${visibility} style=${style} box=${JSON.stringify(box)}`);
      }

      // scroll to testimonials and re-check
      await testi.scrollIntoViewIfNeeded();
      await new Promise((r) => setTimeout(r, 1500));
      console.log("--- after scroll into view ---");
      const cards2 = await testi.$$(".testi-card");
      for (let i = 0; i < cards2.length; i++) {
        const opacity = await cards2[i].evaluate((el) => window.getComputedStyle(el).opacity);
        const visibility = await cards2[i].evaluate((el) => window.getComputedStyle(el).visibility);
        console.log(`  card ${i}: opacity=${opacity} visibility=${visibility}`);
      }
    }
    await browser.close();
  } catch (e) {
    console.log(`\n=== PORT ${port} ERROR ===`, e.message);
  }
}
