import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rise Up — Eleve sua mente. Execute seu propósito.",
  description:
    "Rise Up é um ecossistema de crescimento pessoal com app, conteúdos e ferramentas para disciplina, foco e propósito.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
