import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AESTHETIX | Swiss Premium Skincare for Men",
  description: "Hochdosierte Skincare-Formeln und professionelle Tools aus der Schweiz. Designed für Männer, die das Maximum aus ihrem Look herausholen. Master Your Appearance.",
  keywords: ["AESTHETIX", "Skincare", "Looksmaxing", "Swiss Made", "Premium Skincare", "Männer Skincare", "Dermaroller", "Gua Sha", "Vitamin C Serum"],
  openGraph: {
    title: "AESTHETIX | Master Your Appearance",
    description: "Swiss Premium Skincare & Tools für Männer. Hochdosierte Formeln, professionelle Tools, designed in der Schweiz.",
    type: "website",
    locale: "de_CH",
    siteName: "AESTHETIX",
  },
  twitter: {
    card: "summary_large_image",
    title: "AESTHETIX | Master Your Appearance",
    description: "Swiss Premium Skincare & Looksmaxing Tools für Männer.",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "AESTHETIX" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
