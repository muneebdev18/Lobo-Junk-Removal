type MarkProps = {
  className?: string;
  title?: string;
};

/**
 * The LOBO mark — a howling wolf head, built from the business card artwork.
 * Drawn as a single filled path with knocked-out eyes and an open howl so it
 * reads at any size, on any background.
 */
export function WolfMark({ className = "h-10 w-10", title = "LOBO Junk Removal" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      {/* skull, jaw and ears — eyes and the open howl are knocked out */}
      <path
        fillRule="evenodd"
        d="M60 15 C69 15 74 19 78 23 L106 6 L101 40 C100 56 95 72 86 87 C78 98 69 105 60 108 C51 105 42 98 34 87 C25 72 20 56 19 40 L14 6 L42 23 C46 19 51 15 60 15 Z
           M31 52 L51 44 L49 58 L34 61 Z
           M89 52 L69 44 L71 58 L86 61 Z
           M60 54 L77 70 L73 92 L60 102 L47 92 L43 70 Z"
      />
    </svg>
  );
}

export function LoboWordmark({
  className = "",
  subClassName = "",
}: {
  className?: string;
  subClassName?: string;
}) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="wordmark text-[1.65em] leading-[0.82]">LOBO</span>
      <span
        className={`dim-label mt-[0.42em] text-[0.44em] tracking-[0.34em] ${subClassName}`}
      >
        Junk Removal
      </span>
    </span>
  );
}

export default function Logo({
  className = "",
  tone = "gold",
  subTone = "inherit",
}: {
  className?: string;
  tone?: "gold" | "white" | "black";
  subTone?: "inherit" | "muted";
}) {
  const markColor =
    tone === "gold" ? "text-gold" : tone === "white" ? "text-on-ink" : "text-ink";
  const wordColor =
    tone === "gold" ? "text-on-ink" : tone === "white" ? "text-on-ink" : "text-ink";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <WolfMark className={`h-10 w-10 shrink-0 ${markColor}`} />
      <span className={`flex flex-col leading-none ${wordColor}`}>
        <span className="wordmark text-[1.75rem] leading-[0.82]">LOBO</span>
        <span
          className={`dim-label mt-[0.45em] text-[0.5rem] tracking-[0.32em] ${
            subTone === "muted" ? "text-muted-invert" : "text-current opacity-70"
          }`}
        >
          Junk Removal
        </span>
      </span>
    </span>
  );
}
