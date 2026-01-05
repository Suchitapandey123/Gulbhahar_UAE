
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/all_components/Footer/Footer";
import Navbar from "@/all_components/Navbar/Main";
import ReactQueryProvider from "@/Providers/ReactQueryProvider/ReactQueryProvider";
import Script from "next/script";
import { AuthProvider } from "@/Providers/ContextProviders/AuthContext";
import { CartProvider } from "@/Providers/ContextProviders/CartContext";
import SessionWrapper from "@/Providers/GoogleSessionProvider/SessionWrapper";
import { Toaster } from "sonner";
import RouteChangeTracker from "@/app/components/RouteChangeTracker"
import Image from "next/image";


// Configure fonts
const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

export async function generateMetadata() {
  return {
    title: "Gulbhahar | The Art of Handmade Luxury Ethnic Wear",
    description:
      "Experience Gulbhahar, where Indian tradition meets handmade perfection.  Ethnic Wear, Juttis, Jewellery, Bags all crafted with detail and elegance.",

    keywords: ["Gulbhahar", " Gulbhahar.com", "gulbahar", "gulbahar.com", "Ethnic Wear", "Juttis", "Jewellery", "Bags "],

    icons: {
      icon: "/logo.png",
      apple: "/apple-touch-icon.png", // Add Apple touch icon
    },
    alternates: {
      canonical: "https://www.gulbhahar.com",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.facebook.com" />

        {/* DNS Prefetch for third-party domains */}
        <link rel="dns-prefetch" href="https://analytic.thekapslog.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <meta name="facebook-domain-verification" content="i8jg1img7zm6lm54vot1vlfhvys5nc" />
        <meta name="facebook-domain-verification" content="vsnutk0lf5e8h8j3qr40cba416cap0" />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager */}
        {/* <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T5S7S772');
            `,
          }}
        /> */}
      </head>

      <SessionWrapper>
        <body
          className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
        >
          {/* GTM noscript */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-T5S7S772"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          {/* Analytics Scripts */}
          <Script
            src="https://analytic.thekapslog.com/script.js"
            data-website-id="20dfac58-c9ab-4176-86f4-6430b377abdb"
            strategy="afterInteractive"
          />

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-M4Q3C3DJQM"
            strategy="afterInteractive"
          />

          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M4Q3C3DJQM', {
                page_path: window.location.pathname
              });
            `,
            }}
          />

          {/* Microsoft Clarity */}
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "s4y81yz4rh");
              `,
            }}
          />

          {/* Facebook Pixel */}

          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '1557129638938241');
                    fbq('track', 'PageView');
              `,
            }}
          />





          {/* <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');

                fbq('init', '1705895113580123', {
                  em: 'optional',
                  ph: 'optional',
                  external_id: 'optional'
                });

                fbq('track', 'PageView');
              `,
            }}
          /> */}

          {/* Facebook Pixel Noscript */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1557129638938241&ev=PageView&noscript=1"
              alt="facebook image"
            />
            {/* <Image
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1705895113580123&ev=PageView&noscript=1"
              alt="facebook image"
            /> */}
          </noscript>

          <AuthProvider>
            <ReactQueryProvider>
              <Toaster position="bottom-right" />
              <CartProvider>
                <Navbar />
                <main id="main-content">
                  {children}
                </main>
                <Footer />
              </CartProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}