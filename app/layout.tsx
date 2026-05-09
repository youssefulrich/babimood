import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "BabiMood — Sorties & Nightlife Abidjan",
  description:
    "Découvre les meilleurs événements, clubs, plages et spots tendance à Abidjan.",
  keywords: ["abidjan", "sorties", "nightlife", "événements", "clubs"],
  openGraph: {
    title: "BabiMood — Sorties & Nightlife Abidjan",
    description: "La référence des sorties à Abidjan",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
