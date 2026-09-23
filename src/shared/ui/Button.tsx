import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "ghost" | "link";
  size?: "md" | "icon";
};

const VARIANTS = {
  primary: "bg-ink text-on-ink hover:opacity-90",
  ghost: "border border-line-strong text-ink hover:bg-surface-2",
  link: "text-accent hover:underline",
};

const SIZES = {
  md: "h-11 px-[18px] text-[15px]",
  icon: "size-11 justify-center",
};

export function Button({
  variant = "ghost",
  size = "md",
  type = "button",
  className = "",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-[10px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  );
}
