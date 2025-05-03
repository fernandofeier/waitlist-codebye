import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Espera - Comunidade Codebye",
  description: "Entre na lista de espera da Comunidade Codebye e seja um dos primeiros a ter acesso a conteúdos exclusivos sobre no-code.",
  icons: {
    // Substitua "URLDASUALOGO" pela URL da sua logo
    icon: "https://i.ibb.co/JDbyLH9/Design-sem-nome.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
