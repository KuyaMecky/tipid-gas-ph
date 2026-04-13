import { ImageResponse } from "next/og";

export const alt = "Latest Balita PH — Presyo ng Gasolina, Diesel, at LPG sa Pilipinas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          background: "linear-gradient(135deg, #1e3a8a 0%, #991b1b 50%, #DC2626 100%)",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#EAB308",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {/* LATEST */}
          <span
            style={{
              fontSize: "48px",
              fontWeight: 900,
              color: "#EAB308",
              letterSpacing: "8px",
              textTransform: "uppercase",
            }}
          >
            LATEST
          </span>

          {/* BALITA PH */}
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            BALITA PH
          </span>

          {/* Tagline */}
          <span
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              marginTop: "8px",
            }}
          >
            Presyo ng Gasolina, Diesel, at LPG sa Pilipinas
          </span>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            latestbalita.ph
          </span>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#EAB308",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
