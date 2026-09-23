"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowLeftIcon } from "@/shared/ui/icons";
import { readDirectoryUrl } from "../utils/directory-url-storage";

const subscribe = () => () => {};

export function BackLink() {
  const href = useSyncExternalStore(subscribe, readDirectoryUrl, () => "/");

  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-md font-bold text-accent hover:underline"
    >
      <ArrowLeftIcon className="size-[18px]" />
      Volver al directorio
    </Link>
  );
}
