import { ImageResponse } from "next/og";

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
          background: "linear-gradient(135deg, #DC2626 0%, #1e3a8a 100%)",
          borderRadius: "32px",
        }}
      >
        <span
          style={{
            fontSize: "100px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          LB
        </span>
      </div>
    ),
    { ...size }
  );
}
