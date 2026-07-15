import { ImageResponse } from "next/og";

export const alt = "Caret: Mark it up like paper. Keep the document.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBFAF7",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 17 L12 7 L20 17"
            stroke="#E63027"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 800,
            color: "#0A0A10",
            letterSpacing: "-0.03em",
            marginTop: 12,
          }}
        >
          Caret
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#6B6B6B",
            marginTop: 8,
          }}
        >
          Mark it up like paper. Keep the document.
        </div>
      </div>
    ),
    { ...size },
  );
}
