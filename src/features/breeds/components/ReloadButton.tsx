"use client";

import { Button } from "@/shared/ui/Button";
import { RefreshIcon } from "@/shared/ui/icons";
import { useBreedsInfinite } from "../hooks/useBreedsInfinite";

export function ReloadButton() {
  const { reloadFromStart, isReloading } = useBreedsInfinite();

  return (
    <Button
      size="icon"
      className="border-line"
      aria-label={isReloading ? "Recargando lista" : "Recargar lista"}
      disabled={isReloading}
      onClick={reloadFromStart}
    >
      <RefreshIcon className={isReloading ? "animate-spin" : ""} />
    </Button>
  );
}
