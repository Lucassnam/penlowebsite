import { cn } from "@/lib/utils";

interface RedMark {
  type: "strike" | "caret-insert" | "circle" | "underline" | "period";
  top: string;
  left: string;
  text?: string;
}

interface DocCardProps {
  filename: string;
  lines?: string[];
  marks?: RedMark[];
  className?: string;
  rotate?: number;
}

export function DocCard({
  filename,
  lines = [],
  marks = [],
  className,
  rotate = 0,
}: DocCardProps) {
  return (
    <div
      className={cn(
        "relative w-56 bg-white rounded-xl shadow-xl overflow-hidden border border-black/7",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Ruled lines background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, rgba(0,0,0,0.05) 24px)",
          backgroundPositionY: "44px",
        }}
      />

      {/* Doc header */}
      <div className="px-4 pt-3 pb-2.5 border-b border-black/7 bg-[#FAFAFA]">
        <div className="flex items-center gap-2">
          {/* Word doc icon */}
          <div className="w-4 h-4 rounded-sm bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[7px] font-bold leading-none">W</span>
          </div>
          <span className="text-[9px] font-body text-ink-muted font-medium truncate leading-none">
            {filename}
          </span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
          </div>
        </div>
      </div>

      {/* Content lines */}
      <div className="px-4 py-3 space-y-1.5 relative">
        {lines.map((line, i) => (
          <div
            key={i}
            className="text-[9px] font-body text-ink leading-[18px]"
            style={{ color: line === "" ? "transparent" : undefined }}
          >
            {line || "·"}
          </div>
        ))}

        {/* Red marks overlay */}
        {marks.map((mark, i) => (
          <RedMarkSvg key={i} mark={mark} />
        ))}
      </div>
    </div>
  );
}

function RedMarkSvg({ mark }: { mark: RedMark }) {
  const base = "absolute pointer-events-none";
  const style = { top: mark.top, left: mark.left };

  if (mark.type === "strike") {
    return (
      <svg
        className={base}
        style={style}
        width="52"
        height="8"
        viewBox="0 0 52 8"
        aria-hidden
      >
        <path
          d="M1,4 C10,2.5 22,5.5 36,3.5 C42,2.5 48,4.5 51,4"
          stroke="#E63027"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (mark.type === "caret-insert") {
    return (
      <div className={`${base} flex flex-col items-center`} style={style}>
        <span className="text-[8px] text-pen font-body leading-tight font-medium">
          {mark.text}
        </span>
        <svg width="10" height="8" viewBox="0 0 10 8" aria-hidden>
          <path
            d="M1,7 L5,1 L9,7"
            stroke="#E63027"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (mark.type === "circle") {
    return (
      <svg
        className={base}
        style={style}
        width="44"
        height="20"
        viewBox="0 0 44 20"
        aria-hidden
      >
        <ellipse
          cx="22"
          cy="10"
          rx="20"
          ry="8"
          stroke="#E63027"
          strokeWidth="1.5"
          fill="rgba(230,48,39,0.06)"
          strokeDasharray="2 1"
        />
      </svg>
    );
  }

  if (mark.type === "underline") {
    return (
      <svg
        className={base}
        style={style}
        width="80"
        height="6"
        viewBox="0 0 80 6"
        aria-hidden
      >
        <path
          d="M1,3 C20,2 45,4 60,2.5 C68,2 74,3.5 79,3"
          stroke="#E63027"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (mark.type === "period") {
    return (
      <svg
        className={base}
        style={style}
        width="7"
        height="7"
        viewBox="0 0 7 7"
        aria-hidden
      >
        <circle cx="3.5" cy="3.5" r="2.5" fill="#E63027" />
      </svg>
    );
  }

  return null;
}
