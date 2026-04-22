const FLUENT_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

const EMOJI_MAP: Record<string, string> = {
  "💻": `${FLUENT_BASE}/Laptop/3D/laptop_3d.png`,
  "🔬": `${FLUENT_BASE}/Microscope/3D/microscope_3d.png`,
  "🌿": `${FLUENT_BASE}/Herb/3D/herb_3d.png`,
  "🎨": `${FLUENT_BASE}/Artist palette/3D/artist_palette_3d.png`,
  "🗣️": `${FLUENT_BASE}/Speaking head/3D/speaking_head_3d.png`,
  "🎭": `${FLUENT_BASE}/Performing arts/3D/performing_arts_3d.png`,
  "🚀": `${FLUENT_BASE}/Rocket/3D/rocket_3d.png`,
  "🤝": `${FLUENT_BASE}/Handshake/3D/handshake_3d.png`,
  "⚖️": `${FLUENT_BASE}/Balance scale/3D/balance_scale_3d.png`,
  "📊": `${FLUENT_BASE}/Bar chart/3D/bar_chart_3d.png`,
  "🏗️": `${FLUENT_BASE}/Building construction/3D/building_construction_3d.png`,
};

type Props = {
  emoji: string;
  size?: number;
  className?: string;
};

export default function Emoji3D({ emoji, size = 80, className = "" }: Props) {
  const src = EMOJI_MAP[emoji];
  if (!src) {
    return <span style={{ fontSize: size * 0.75 }} className={className}>{emoji}</span>;
  }
  return (
    <img
      src={src}
      alt={emoji}
      width={size}
      height={size}
      className={`object-contain drop-shadow-[0_8px_24px_rgba(178,161,255,0.35)] ${className}`}
      style={{ imageRendering: "auto" }}
    />
  );
}
