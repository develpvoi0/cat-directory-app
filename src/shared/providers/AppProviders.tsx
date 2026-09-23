"use client";

import { ThemeProvider } from "next-themes";
import { AppToaster } from "../ui/AppToaster";
import { OfflineBanner } from "../ui/OfflineBanner";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <OfflineBanner />
        {children}
        <AppToaster />
      </QueryProvider>
    </ThemeProvider>
  );
}
