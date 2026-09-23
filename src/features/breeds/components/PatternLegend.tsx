import { PATTERN_LEGEND, type CoatColor } from "../utils/coat";
import { CoatFace } from "./CoatSwatch";

const LEGEND_COAT: CoatColor = { name: "Canela", base: "#a9693f", mark: "#5a3119" };
const POINT_COAT: CoatColor = { name: "Seal", base: "#efe6d8", mark: "#4b3b31" };

export function PatternLegend() {
  return (
    <aside aria-labelledby="pattern-legend-title" className="hidden pt-2 lg:block">
      <div className="sticky top-6 flex flex-col gap-[18px] rounded-2xl border border-line bg-surface p-6">
        <h2
          id="pattern-legend-title"
          className="text-[13px] font-bold uppercase tracking-[0.09em] text-ink-subtle"
        >
          Clave de patrones
        </h2>
        <ul className="flex flex-col gap-3.5">
          {PATTERN_LEGEND.map((item) => (
            <li key={item.family} className="flex items-center gap-3.5">
              <CoatFace
                family={item.family}
                coat={item.family === "colorpoint" ? POINT_COAT : LEGEND_COAT}
                className="size-9"
              />
              <span className="flex flex-col">
                <span className="text-[15px] font-bold">{item.label}</span>
                <span className="text-[13px] text-ink-subtle">{item.api}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
