"use client";

import { useId, type ReactNode } from "react";
import {
  CAT_CHEEKS,
  CAT_EYES,
  CAT_EYE_SHINES,
  CAT_EYE_SPARKLES,
  CAT_HEAD_BOX,
  CAT_HEAD_PATH,
  CAT_HIGHLIGHT_PATHS,
  CAT_MOUTH_PATH,
  CAT_NOSE_SHINE,
  CAT_OUTLINE_PATH,
  CAT_SHADOW_PATH,
  CAT_VIEW_BOX,
  CAT_WHISKER_PATHS,
} from "@/shared/ui/cat-shape";
import type { Breed } from "../schemas/breed.schema";
import { coatColorFor, patternFamily, type CoatColor, type PatternFamily } from "../utils/coat";

const LINE = "#000072";
const OUTLINE_CLASS = "fill-[#000072] dark:fill-[#c3c9f5]";
const WHITE_FUR = "#f6f2ea";
const POINT_CREAM = "#efe6d8";

const { x: HX, y: HY, width: HW, height: HH } = CAT_HEAD_BOX;
const FULL = { x: HX - 200, y: HY - 200, width: HW + 400, height: HH + 400 };

const TORTIE_WEDGES = [
  { fill: "#2a1f19", points: "1740,2157 3240,-441 4238,497 4716,1781 4573,3144" },
  { fill: "#d38a4a", points: "1740,2157 4573,3144 3747,4386 2425,5078 933,5046" },
  { fill: null, points: "1740,2157 933,5046 -268,4386 -1050,3261 -1250,1906" },
  { fill: "#2a1f19", points: "1740,2157 -1250,1906 -759,497 350,-502" },
  { fill: "#c77a3c", points: "1740,2157 350,-502 1802,-842 3240,-441" },
];

function furLayers(family: PatternFamily, coat: CoatColor, id: string): ReactNode {
  switch (family) {
    case "tabby":
      return (
        <>
          <defs>
            <pattern id={`${id}-a`} patternUnits="userSpaceOnUse" width="486" height="486" patternTransform="rotate(10)">
              <rect width="486" height="486" fill={coat.base} />
              <rect x="324" width="162" height="486" fill={coat.mark} />
            </pattern>
          </defs>
          <rect {...FULL} fill={`url(#${id}-a)`} />
        </>
      );
    case "spotted":
      return (
        <>
          <defs>
            <pattern id={`${id}-a`} patternUnits="userSpaceOnUse" width="594" height="594">
              <circle cx="148" cy="148" r="130" fill={coat.mark} />
              <circle cx="445" cy="445" r="108" fill={coat.mark} />
            </pattern>
          </defs>
          <rect {...FULL} fill={`url(#${id}-a)`} />
        </>
      );
    case "ticked":
      return (
        <>
          <defs>
            <pattern id={`${id}-a`} patternUnits="userSpaceOnUse" width="216" height="216" patternTransform="rotate(-30)">
              <rect width="54" height="216" fill="rgba(20,14,10,.24)" />
            </pattern>
            <pattern id={`${id}-b`} patternUnits="userSpaceOnUse" width="270" height="270" patternTransform="rotate(30)">
              <rect width="54" height="270" fill="rgba(255,255,255,.2)" />
            </pattern>
          </defs>
          <rect {...FULL} fill={`url(#${id}-a)`} />
          <rect {...FULL} fill={`url(#${id}-b)`} />
        </>
      );
    case "colorpoint":
      return (
        <>
          <defs>
            <linearGradient id={`${id}-a`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={coat.mark} />
              <stop offset="0.16" stopColor={coat.mark} />
              <stop offset="0.4" stopColor={POINT_CREAM} />
            </linearGradient>
            <radialGradient id={`${id}-b`}>
              <stop offset="0.55" stopColor={coat.mark} />
              <stop offset="1" stopColor={coat.mark} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x={HX} y={HY} width={HW} height={HH} fill={`url(#${id}-a)`} />
          <ellipse cx={HX + HW / 2} cy={HY + HH * 0.64} rx={HW * 0.3} ry={HH * 0.26} fill={`url(#${id}-b)`} />
        </>
      );
    case "bicolor":
      return (
        <>
          <rect x={FULL.x} y={HY + HH * 0.64} width={FULL.width} height={HH} fill={WHITE_FUR} />
          <polygon points={`2000,${HY + HH * 0.4} 1249,3104 2751,3104`} fill={WHITE_FUR} />
        </>
      );
    case "tortie":
      return TORTIE_WEDGES.map((wedge) => (
        <polygon key={wedge.points} points={wedge.points} fill={wedge.fill ?? coat.base} />
      ));
    case "mixed":
      return (
        <>
          <defs>
            <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0.34" stopColor={coat.base} />
              <stop offset="0.34" stopColor={coat.mark} />
              <stop offset="0.67" stopColor={coat.mark} />
              <stop offset="0.67" stopColor={WHITE_FUR} />
            </linearGradient>
          </defs>
          <rect x={HX} y={HY} width={HW} height={HH} fill={`url(#${id}-a)`} />
        </>
      );
    default:
      return null; // sólido o desconocido
  }
}

type CoatFaceProps = {
  family: PatternFamily;
  coat: CoatColor;
  className?: string;
};

export function CoatFace({ family, coat, className = "" }: CoatFaceProps) {
  const id = `coat${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={CAT_VIEW_BOX}
      className={`block shrink-0 ${className}`}
    >
      {/* Aqui hacemos la silueta de la cabeza del gato */}
      <defs>
        <clipPath id={`${id}-head`}>
          <path d={CAT_HEAD_PATH} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-head)`}>
        <rect {...FULL} fill={coat.base} />
        {furLayers(family, coat, id)}
      </g>

      <path d={CAT_SHADOW_PATH} fill={LINE} opacity="0.15" />
      {CAT_HIGHLIGHT_PATHS.map((d) => (
        <path key={d} d={d} fill="#ffffff" opacity="0.35" />
      ))}
      {CAT_CHEEKS.map((cheek) => (
        <ellipse key={cheek.cx} {...cheek} fill="#ff92b4" opacity="0.85" />
      ))}
      {CAT_EYES.map((eye) => (
        <ellipse key={eye.cx} {...eye} fill={LINE} />
      ))}
      {CAT_EYE_SHINES.map((shine) => (
        <ellipse key={shine.cx} {...shine} fill="#ffffff" />
      ))}
      {CAT_EYE_SPARKLES.map((sparkle) => (
        <ellipse key={sparkle.cx} {...sparkle} fill="#ffffff" opacity="0.35" />
      ))}
      <path d={CAT_MOUTH_PATH} fill={LINE} />
      <ellipse {...CAT_NOSE_SHINE} fill="#ffffff" />
      {CAT_WHISKER_PATHS.map((d) => (
        <path key={d} d={d} className={OUTLINE_CLASS} />
      ))}
      <path d={CAT_OUTLINE_PATH} className={OUTLINE_CLASS} />
    </svg>
  );
}

const SIZES = {
  xs: "size-8",
  sm: "size-11 sm:size-13",
  lg: "size-48 sm:size-64",
};

type Props = Pick<Breed, "slug" | "pattern"> & { size?: keyof typeof SIZES; className?: string };

export function CoatSwatch({ slug, pattern, size = "sm", className = "" }: Props) {
  return (
    <CoatFace
      family={patternFamily(pattern)}
      coat={coatColorFor(slug)}
      className={`${SIZES[size]} ${className}`}
    />
  );
}
