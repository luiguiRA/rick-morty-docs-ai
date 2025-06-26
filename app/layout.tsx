import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { title } from "process";

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
    <html lang="es">
      <body>
        <Navbar />
        <div className="p-4">{children}</div>
      </body>
    </html>
  );
}
