import { cn } from "@/lib/utils";

interface IpadMockProps {
  children: React.ReactNode;
  className?: string;
  showPencil?: boolean;
}

export function IpadMock({ children, className, showPencil = false }: IpadMockProps) {
  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "relative rounded-[2rem] shadow-2xl ring-1 ring-black/10",
          className
        )}
        style={{
          aspectRatio: "3/4",
          background: "linear-gradient(145deg, #d8d8d8 0%, #b4b4b4 50%, #cacaca 100%)",
        }}
      >
        {/* Aluminum frame highlight */}
        <div
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 45%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* Screen bezel — no camera dot */}
        <div className="absolute inset-[7px] rounded-[1.6rem] overflow-hidden bg-[#1c1c1e]">
          {/* Screen content */}
          <div className="absolute inset-0 pt-4 bg-white">{children}</div>
          {/* Screen glare */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 55%)",
            }}
          />
        </div>

        {/* Top button (right side) */}
        <div className="absolute right-[-2px] top-16 w-[3px] h-7 bg-[#9a9a9a] rounded-l-full" />
        {/* Volume buttons (left side) */}
        <div className="absolute left-[-2px] top-20 w-[3px] h-8 bg-[#9a9a9a] rounded-r-full" />
        <div className="absolute left-[-2px] top-32 w-[3px] h-8 bg-[#9a9a9a] rounded-r-full" />
      </div>

      {showPencil && (
        <div
          className="absolute -right-6 top-1/4 w-[10px]"
          style={{ height: "70%" }}
          aria-hidden
        >
          <ApplePencil />
        </div>
      )}
    </div>
  );
}

function ApplePencil() {
  return (
    <div
      className="relative w-full h-full rounded-full shadow-lg"
      style={{
        background: "linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 40%, #d0d0d0 100%)",
      }}
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full"
        style={{
          height: "6%",
          background: "linear-gradient(to bottom, #c8c8c8, #a0a0a0)",
          borderRadius: "0 0 50% 50%",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-[4%] rounded-full"
        style={{ background: "#e8e8e8", transform: "translateX(-45%)" }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center"
        style={{ top: "40%", background: "rgba(230,48,39,0.12)", border: "1px solid rgba(230,48,39,0.2)" }}
      >
        <span className="text-pen text-[6px] font-bold">+</span>
      </div>
    </div>
  );
}
