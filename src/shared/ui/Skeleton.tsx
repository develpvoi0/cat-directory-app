import type { CSSProperties } from "react";

export function Skeleton({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return <div aria-hidden="true" style={style} className={`animate-skeleton rounded-[4px] bg-surface-2 ${className}`} />;
}
