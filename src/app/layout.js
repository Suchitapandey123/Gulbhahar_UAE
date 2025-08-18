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

// Configure fonts
const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Customize as needed
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata() {
  return {
    title: "Gulbhahar | Crafting Luxury – Handmade Juttis & Designer Bags",
    description:
      "Gulbhahar offers luxury handmade juttis and designer bags crafted by skilled artisans. Shop exclusive, handcrafted collections that redefine elegance and style.",
    icons: {
      icon: "/logo.png",
    },
    alternates: {
      canonical: "https://www.gulbhahar.com", // ← Fixed URL to match your brand
    },
    openGraph: {
      title: "Gulbhahar | Crafting Luxury – Handmade Juttis & Designer Bags", // ← Fixed title
      description:
        "Gulbhahar offers luxury handmade juttis and designer bags crafted by skilled artisans. Shop exclusive, handcrafted collections that redefine elegance and style.", // ← Fixed description
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com", // ← Fixed URL
      siteName: "Gulbhahar", // ← Fixed site name
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow, noodp" />
        <meta name="googlebot" content="index, follow, noodp" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <script
          defer
          src="https://analytic.thekapslog.com/script.js"
          data-website-id="44e63c96-7961-4702-9c43-961a03afa948"
        ></script>

        {/* Microsoft Clarity - Inline script for immediate loading */}
        <script
          type="text/javascript"
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
      </head>
      <SessionWrapper>
        <body
          className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
        >
          {/* Google Analytics - Using Next.js Script component properly */}
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
              gtag('config', 'G-NR9HQHE5F4');
            `,
            }}
          />
          <AuthProvider>
            <ReactQueryProvider>
              <CartProvider>
                <Navbar />
                {children}
                <Footer />
              </CartProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
