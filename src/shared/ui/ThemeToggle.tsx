"use client";

import { useTheme } from "next-themes";
import { Button } from "./Button";
import { ThemeIcon } from "./icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      aria-label="Cambiar tema claro u oscuro"
      className="border-line"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <ThemeIcon />
    </Button>
  );
}
