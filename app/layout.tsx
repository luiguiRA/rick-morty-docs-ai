import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Rick & Morty Docs",
  description: "Cartelera con personajes de la serie y su información",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-lime-100 font-sans">
        <Navbar />
        <div className="px-6 py-8 max-w-7xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
