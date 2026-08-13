import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const title = "LeadMap — лиды для веб-студии из 2ГИС";
  const description = "Поиск компаний без сайта, скоринг потребности в CRM и готовые поводы для контакта.";

  return {
    title,
    description,
    icons: { icon: "/og.png", shortcut: "/og.png" },
    openGraph: { title, description, type: "website", images: [{ url: image, width: 1200, height: 630, alt: "LeadMap — бизнес, готовый расти" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${plexMono.variable}`}>{children}</body>
    </html>
  );
}
