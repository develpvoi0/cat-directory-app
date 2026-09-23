import { CAT_EYES, CAT_HEAD_PATH, CAT_VIEW_BOX } from "./cat-shape";

type Props = { className?: string; withEyes?: boolean };

export function CatSilhouette({ className = "", withEyes = false }: Props) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox={CAT_VIEW_BOX} className={`block shrink-0 ${className}`}>
      <path d={CAT_HEAD_PATH} fill="currentColor" />
      {withEyes &&
        CAT_EYES.map((eye) => (
          <ellipse key={eye.cx} cx={eye.cx} cy={eye.cy} rx={eye.rx * 1.3} ry={eye.ry * 0.8} className="fill-accent-fill" />
        ))}
    </svg>
  );
}
