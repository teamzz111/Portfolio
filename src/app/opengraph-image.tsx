import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Andrés Largo — FullStack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#060507",
          backgroundImage:
            "radial-gradient(720px 480px at 82% 4%, rgba(66,230,221,.16), rgba(66,230,221,0) 65%)",
          color: "#e9eef0",
          fontSize: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 6,
            color: "#727f85",
          }}
        >
          <span>A—L</span>
          <span>BOGOTÁ D.C. · 04°42′N 74°04′W</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 300,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Andrés Largo
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 28,
              fontSize: 34,
              color: "#9aa3a7",
            }}
          >
            <div
              style={{
                width: 64,
                height: 3,
                marginRight: 24,
                backgroundColor: "#42e6dd",
              }}
            />
            FullStack Developer — AI Workflows · Cloud · Mobile
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 4,
            color: "#727f85",
          }}
        >
          <span>andreslargo.com</span>
          <span style={{ color: "#42e6dd" }}>EN / ES</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
