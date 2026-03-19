import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VocaciónIA — Test Vocacional con Inteligencia Artificial",
  description:
    "Hacé el test vocacional con inteligencia artificial y descubrí tu camino profesional en solo 5 minutos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full font-funnel antialiased bg-[var(--bg-sand)]">
        {children}
      </body>
    </html>
  );
}
