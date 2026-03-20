interface AdSlotProps {
  size?: "leaderboard" | "sidebar" | "in-article";
  className?: string;
}

const sizeMap = {
  leaderboard: { width: "728px", height: "90px", label: "728 x 90" },
  sidebar: { width: "300px", height: "250px", label: "300 x 250" },
  "in-article": { width: "100%", height: "250px", label: "In-Article Ad" },
};

export default function AdSlot({ size = "leaderboard", className = "" }: AdSlotProps) {
  const config = sizeMap[size];

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className="bg-gray-100 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center"
        style={{
          width: size === "in-article" ? "100%" : `min(${config.width}, 100%)`,
          height: config.height,
        }}
      >
        <p className="text-xs text-gray-400 uppercase tracking-wider">Advertisement</p>
        <p className="text-xs text-gray-300 mt-1">{config.label}</p>
      </div>
    </div>
  );
}
