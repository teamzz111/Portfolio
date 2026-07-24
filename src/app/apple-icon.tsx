import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060507",
          backgroundImage:
            "radial-gradient(140px 140px at 80% 10%, rgba(66,230,221,.18), rgba(66,230,221,0) 70%)",
          color: "#42e6dd",
          fontSize: 64,
          letterSpacing: 2,
        }}
      >
        A—L
      </div>
    ),
    { ...size },
  );
}
