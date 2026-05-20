import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import VercelAnalytics from "../components/VercelAnalytics";
import VercelSpeedInsights from "../components/VercelSpeedInsights";

const GTM_ID = "GTM-WVX258H4";

export const metadata: Metadata = {
  title: "VocacionIA | Descubrí tu Futuro con IA",
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
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body antialiased selection:bg-primary selection:text-on-primary-fixed">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <VercelAnalytics />
        <VercelSpeedInsights />
      </body>
    </html>
  );
}
