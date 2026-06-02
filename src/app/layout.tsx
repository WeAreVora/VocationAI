import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import VercelAnalytics from "../components/VercelAnalytics";
import VercelSpeedInsights from "../components/VercelSpeedInsights";

const GTM_ID = "GTM-WVX258H4";

export const metadata: Metadata = {
  title: "VocacionIA | Descubrí tu Futuro con IA",
  description:
    "Un análisis profundo basado en un test guiado y 4 marcos teóricos validados. Obtené tu mapa profesional en minutos.",
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','855334637032762');fbq('track','PageView');`}
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
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=855334637032762&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <VercelAnalytics />
        <VercelSpeedInsights />
      </body>
    </html>
  );
}
