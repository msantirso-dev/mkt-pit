import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Jaime Smart Advisor | PI Proyectos Inteligentes",
  description:
    "Diagnóstico tecnológico gratuito para obras inteligentes. Domótica, seguridad, conectividad y energía solar.",
  openGraph: {
    title: "Jaime Smart Advisor",
    description: "La casa inteligente empieza antes de colocar el primer ladrillo",
    type: "website",
  },
  icons: {
    icon: "/logo-pi-icon.png",
    apple: "/logo-pi-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
