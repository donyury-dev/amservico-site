import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeStyles } from "@/components/theme-styles";
import { AdminAuthProvider } from "@/components/admin-auth-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AM Serviço e Manutenção | Engenharia Clínica, Diagnóstico por Imagem e Infraestrutura Hospitalar",
  description:
    "Soluções completas em engenharia clínica, manutenção de equipamentos de suporte à vida, diagnóstico por imagem, adequação de salas e infraestrutura hospitalar. Atendimento técnico especializado para hospitais e clínicas.",
  keywords: [
    "engenharia clínica",
    "manutenção hospitalar",
    "diagnóstico por imagem",
    "infraestrutura hospitalar",
    "suporte à vida",
    "tomografia",
    "ressonância magnética",
    "raio-x",
    "blindagem",
    "quadros elétricos",
  ],
  authors: [{ name: "AM Serviço e Manutenção" }],
  creator: "AM Serviço e Manutenção",
  metadataBase: new URL("https://www.amservico.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.amservico.com.br",
    siteName: "AM Serviço e Manutenção",
    title: "AM Serviço e Manutenção | Engenharia Clínica e Infraestrutura Hospitalar",
    description:
      "Soluções completas em engenharia clínica, manutenção de equipamentos de suporte à vida, diagnóstico por imagem e infraestrutura hospitalar.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AM Serviço e Manutenção",
    description:
      "Soluções completas em engenharia clínica, manutenção de equipamentos de suporte à vida e diagnóstico por imagem.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth antialiased`}>
      <head>
        <ThemeStyles />
      </head>
      <body className="min-h-screen bg-white text-slate-900 font-sans" style={{ fontFamily: "var(--font-body, inherit)" }}>
        <AdminAuthProvider>{children}</AdminAuthProvider>
      </body>
    </html>
  );
}

