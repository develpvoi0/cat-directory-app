"use client";

import { useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { AlertCircleIcon, CheckCircleIcon } from "./icons";

function ConnectionToasts() {
  const isOnline = useOnlineStatus();
  const wasOnline = useRef(isOnline);

  useEffect(() => {
    if (!wasOnline.current && isOnline) {
      toast.success("Conexión restablecida. Actualizando…", { id: "connection" });
    }
    wasOnline.current = isOnline;
  }, [isOnline]);

  return null;
}

export function AppToaster() {
  return (
    <>
      <ConnectionToasts />
      <Toaster
        position="bottom-right"
        icons={{
          success: <CheckCircleIcon className="text-success" />,
          error: <AlertCircleIcon className="text-danger" />,
        }}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "flex w-[var(--width)] items-center gap-3 rounded-xl border border-line bg-surface py-2 pl-4 pr-2 text-[15px] text-ink shadow-[0_6px_20px_rgba(23,34,43,.08)] min-h-14",
            title: "flex-1",
            icon: "shrink-0",
            actionButton:
              "h-11 shrink-0 cursor-pointer rounded-lg px-3.5 font-bold text-accent hover:bg-surface-2",
          },
        }}
      />
    </>
  );
}
