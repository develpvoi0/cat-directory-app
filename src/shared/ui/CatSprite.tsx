import {
  CAT_CHEEKS,
  CAT_EYES,
  CAT_EYE_SHINES,
  CAT_EYE_SPARKLES,
  CAT_HEAD_PATH,
  CAT_HIGHLIGHT_PATHS,
  CAT_MOUTH_PATH,
  CAT_NOSE_SHINE,
  CAT_OUTLINE_PATH,
  CAT_SHADOW_PATH,
  CAT_WHISKER_PATHS,
} from "./cat-shape";

const INK = "#000072";

export function CatSprite() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute size-0 overflow-hidden">
      <defs>
        <path id="cat-head" d={CAT_HEAD_PATH} />
        <g id="cat-face">
          <path d={CAT_SHADOW_PATH} fill={INK} opacity="0.15" />
          {CAT_HIGHLIGHT_PATHS.map((d) => (
            <path key={d} d={d} fill="#ffffff" opacity="0.35" />
          ))}
          {CAT_CHEEKS.map((cheek) => (
            <ellipse key={cheek.cx} {...cheek} fill="#ff92b4" opacity="0.85" />
          ))}
          {CAT_EYES.map((eye) => (
            <ellipse key={eye.cx} {...eye} fill={INK} />
          ))}
          {CAT_EYE_SHINES.map((shine) => (
            <ellipse key={shine.cx} {...shine} fill="#ffffff" />
          ))}
          {CAT_EYE_SPARKLES.map((sparkle) => (
            <ellipse key={sparkle.cx} {...sparkle} fill="#ffffff" opacity="0.35" />
          ))}
          <path d={CAT_MOUTH_PATH} fill={INK} />
          <ellipse {...CAT_NOSE_SHINE} fill="#ffffff" />
        </g>
        <g id="cat-lines">
          <path d={CAT_OUTLINE_PATH} />
          {CAT_WHISKER_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </defs>
    </svg>
  );
}
