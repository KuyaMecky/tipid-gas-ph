import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        <span
          style={{
            fontSize: "22px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-1px",
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
