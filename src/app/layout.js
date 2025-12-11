// app/layout.js or app/layout.tsx

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

// Configure fonts
const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata() {
  return {
    title: "Gulbhahar | The Art of Handmade Luxury Ethnic Wear",
    description:
      "Experience Gulbhahar, where Indian tradition meets handmade perfection.  Ethnic Wear, Juttis, Jewellery, Bags all crafted with detail and elegance.",
    
      keywords: ["Gulbhahar"," Gulbhahar.com", "gulbahar","gulbahar.com",  "Ethnic Wear", "Juttis", "Jewellery", "Bags "],
    
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

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      
      <SessionWrapper>
        <body
          className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
        >
          {/* Analytics Scripts */}
          
          {/* Custom Analytics */}
          <Script
            src="https://analytic.thekapslog.com/script.js"
            data-website-id="20dfac58-c9ab-4176-86f4-6430b377abdb"
            strategy="afterInteractive"
          />

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-NR9HQHE5F4"
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
                gtag('config', 'G-NR9HQHE5F4', {
                  page_title: document.title,
                  page_location: window.location.href
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
                fbq('init', '1705895113580123');  
                fbq('track', 'PageView');
              `,
            }}
          />

          {/* Facebook Pixel Noscript */}
          <noscript>
            <img
              height="1" 
              width="1" 
              style={{display: 'none'}}
              src="https://www.facebook.com/tr?id=1705895113580123&ev=PageView&noscript=1"
              alt="facebook image"
            />
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