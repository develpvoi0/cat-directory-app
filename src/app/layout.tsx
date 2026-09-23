import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/shared/providers/AppProviders";
import { CatSprite } from "@/shared/ui/CatSprite";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:"Cat Directory | Directorio de razas de gatos",
    template: "%s | Cat Directory",
  },
  description: "Explora razas de gatos, su origen, pelaje y patrón, con un dato curioso en cada visita.",
  applicationName: "Cat Directory",
  keywords:["razas de gatos", "gatos", "directorio felino", "cuidado de mascotas", "datos curiosos de gatos"],
  authors: [{ name: "Jhorman Parra", url: "https://github.com/develpvoi0" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Cat Directory",
    title: "Cat Directory | Directorio de razas de gatos",
    description: "Explora razas de gatos, su origen, pelaje y patrón, con un dato curioso en cada visita.",
  },
  twitter: {
    card: "summary",
    title: "Cat Directory | Directorio de razas de gatos",
    description: "Explora razas de gatos, su origen, pelaje y patrón.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor:[
    {media: "(prefers-color-scheme: light)", color: "#f3f5f6" },
    {media: "(prefers-color-scheme: dark)", color: "#0e1419" }
  ],
  width: "device-width",
  initialScale: 1
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <CatSprite />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}