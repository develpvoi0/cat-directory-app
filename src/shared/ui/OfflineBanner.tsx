"use client";

import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { WifiOffIcon } from "./icons";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div role="status" className="bg-ink text-on-ink">
      <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-5 py-2.5 text-[15px] sm:px-16">
        <WifiOffIcon className="shrink-0" />
        <p className="min-w-0 flex-1">
          <strong>Sin conexión.</strong> Lo que ya cargaste sigue disponible y la búsqueda funciona sobre ello.
        </p>
        <span className="hidden items-center gap-2 text-sm opacity-80 sm:flex">
          <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-accent-fill" />
          Reconectando
        </span>
      </div>
    </div>
  );
}
