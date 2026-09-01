import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { CartToast } from "@/components/commerce/cart-toast";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uclothia.com"),
  title: {
    default: "UCLOTHIA — A Digital Fashion House",
    template: "%s — UCLOTHIA",
  },
  description:
    "UCLOTHIA is a luxury fashion house — couture, ready-to-wear, and craftsmanship for the modern wardrobe. Explore collections, lookbooks, and private client services.",
  keywords: [
    "luxury fashion",
    "Indian couture",
    "bridal wear",
    "designer sarees",
    "lehengas",
    "sherwanis",
    "ready-to-wear",
    "bespoke",
  ],
  authors: [{ name: "UCLOTHIA" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "UCLOTHIA",
    title: "UCLOTHIA — A Digital Fashion House",
    description:
      "Couture, ready-to-wear, and craftsmanship for the modern wardrobe.",
  },
  twitter: {
    card: "summary_large_image",
    title: "UCLOTHIA — A Digital Fashion House",
    description:
      "Couture, ready-to-wear, and craftsmanship for the modern wardrobe.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UCLOTHIA",
    url: "https://uclothia.com",
    description:
      "A modern luxury fashion house where heritage Indian craftsmanship meets contemporary editorial vision.",
  };

  return (
    <html
      lang="en"
      className={`no-js ${cormorant.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[var(--color-text)] focus:text-[var(--color-background)] focus:px-4 focus:py-2 focus:text-[0.75rem] focus:tracking-[0.1em] focus:uppercase"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" className="animate-page-in">{children}</main>
          <Footer />
          <CartDrawer />
          <CartToast />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
