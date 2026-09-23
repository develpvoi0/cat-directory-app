import type { CSSProperties } from "react";
import type { Breed } from "../schemas/breed.schema";

const FUR_TONES = ["#e9d8b8", "#d08a4e", "#9c5b3a", "#7e8c99", "#5a3e33", "#2b2b2e", "#bfc6cc"];

/* Aqui hacemos la silueta de la cabeza del gato */

const CAT_HEAD = "polygon(0% 100%, 0% 14%, 22% 0%, 38% 22%, 62% 22%, 78% 0%, 100% 14%, 100% 100%)";

function hash(value: string): number {
  let h = 0;
  for (const char of value) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return h;
}

function patternLayer(pattern: string | null, color: string): string | null {
  const p = pattern?.toLowerCase() ?? "";
  if (p.includes("point")) return `radial-gradient(circle at 50% 55%, transparent 30%, ${color} 95%)`;
  if (p.includes("tabby") || p.includes("mackerel"))
    return `repeating-linear-gradient(115deg, transparent 0 7px, ${color} 7px 10px)`;
  if (p.includes("spot")) return `radial-gradient(${color} 22%, transparent 24%) 0 0 / 14px 14px`;
  if (p.includes("ticked")) return `radial-gradient(${color} 14%, transparent 16%) 0 0 / 6px 6px`;
  if (p.includes("bicolor") || p.includes("van")) return `linear-gradient(160deg, ${color} 0 48%, transparent 48%)`;
  if (p.includes("tortie") || p.includes("calico"))
    return `conic-gradient(from 40deg at 40% 60%, ${color} 0 22%, transparent 0 55%, ${color} 0 72%, transparent 0)`;
  return null; // sólido o desconocido
}

type Props = Pick<Breed, "slug" | "pattern"> & { size?: "sm" | "lg"; className?: string };

export function CoatSwatch({ slug, pattern, size = "sm", className = "" }: Props) {
  const h = hash(slug);
  const baseIndex = h % FUR_TONES.length;
  const markIndex = (baseIndex + 1 + ((h >>> 4) % (FUR_TONES.length - 1))) % FUR_TONES.length;

  const layer = patternLayer(pattern, FUR_TONES[markIndex]);
  const style: CSSProperties = {
    background: layer ? `${layer}, ${FUR_TONES[baseIndex]}` : FUR_TONES[baseIndex],
    clipPath: CAT_HEAD,
  };

  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 ${size === "lg" ? "size-40 sm:size-52" : "size-12"} ${className}`}
      style={style}
    />
  );
}