import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VocacionAI | Descubrí tu Futuro con IA",
  description:
    "Un análisis profundo basado en 40 preguntas y 4 marcos teóricos validados. Obtené tu mapa profesional en minutos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body antialiased selection:bg-primary selection:text-on-primary-fixed">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
