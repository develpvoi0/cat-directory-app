import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default:"Cat Directory | Directorio de razas de gatos",
    template: "%s | Cat Directory",
  },
  description: "Explora un directorio de razas de gatos puedes ver su país de origen, tipo de pelaje y patrón sobre felinos.",
  applicationName: "Cat Directory",
  keywords:["razas de gatos", "gatos", "directorio felino", "pais de origen", "patrones curiosos de gatos"],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor:[
    {media: "(prefers-color-scheme: light)", color: "#ffffff" },
    {media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  width: "device-width",
  initialScale: 1
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
