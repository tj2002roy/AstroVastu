import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sri Suvabrata Bharati | Gold Medalist Astrologer, Palmist & Vastu Expert",
  description: "Autonomous digital consultation ecosystem for Vedic Astrology, KP System, Palmistry, Numerology and 16-Zone Vastu Shastra with Sri Suvabrata Bharati. Chambers in Jalpaiguri, Siliguri and Global Online Consultations.",
  keywords: [
    "Sri Suvabrata Bharati",
    "Astrologer Jalpaiguri",
    "Astrologer Siliguri",
    "Gold Medalist Astrologer",
    "Vastu Consultant",
    "16 Zone Vastu",
    "KP Astrology",
    "Palmist North Bengal",
    "Kundli Matching",
    "Vedic Horoscope"
  ],
  authors: [{ name: "Sri Suvabrata Bharati" }],
  creator: "Sri Suvabrata Bharati",
  openGraph: {
    title: "Sri Suvabrata Bharati | Gold Medalist Astrologer & Vastu Consultant",
    description: "Personalized Vedic Astrology, KP, Palmistry & 16-Zone Vastu Consultations. Chambers in Jalpaiguri, Siliguri & Worldwide Online Consultations.",
    siteName: "Sri Suvabrata Bharati Consultations",
    type: "website",
    locale: "en_IN",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/images/brand_logo_emblem.jpg",
    apple: "/images/brand_logo_emblem.jpg",
  }
};

export const viewport: Viewport = {
  themeColor: "#0A1128",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cinzel.variable} ${inter.variable} dark h-full`}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#0A1128] text-[#F8F9FA] selection:bg-[#D4AF37] selection:text-[#0A1128]"
      >
        {children}
      </body>
    </html>
  );
}
