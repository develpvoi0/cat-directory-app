"use client";

import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib/error-messages";
import { Button } from "@/shared/ui/Button";
import { RefreshIcon } from "@/shared/ui/icons";
import { useReloadBreeds } from "../hooks/useReloadBreeds";

export function ReloadButton() {
  const { reload, isReloading } = useReloadBreeds();

  async function handleReload() {
    if (!navigator.onLine) {
      toast.error("Sin conexión. Recarga la lista cuando vuelva la red.", { id: "reload" });
      return;
    }
    const state = await reload();
    if (state?.status === "error") {
      toast.error(`No se pudo recargar la lista. ${getErrorMessage(state.error)}`, {
        id: "reload",
        action: { label: "Reintentar", onClick: () => void handleReload() },
      });
    }
  }

  return (
    <Button
      size="icon"
      className="border-line"
      aria-label={isReloading ? "Recargando lista" : "Recargar lista"}
      disabled={isReloading}
      onClick={handleReload}
    >
      <RefreshIcon className={isReloading ? "animate-spin" : ""} />
    </Button>
  );
}
