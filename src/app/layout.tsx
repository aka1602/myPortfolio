import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/constants/personal";
import { GameRewardProvider } from "@/contexts/GameRewardContext";
import { GameModalProvider } from "@/contexts/GameModalContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.bio,
  keywords: [
    "frontend developer",
    "react developer",
    "next.js developer",
    "typescript developer",
    "web developer",
    "mobile developer",
    "react native developer",
    "javascript developer",
    "portfolio",
    PERSONAL_INFO.name.toLowerCase(),
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.portfolio }],
  creator: PERSONAL_INFO.name,
  publisher: PERSONAL_INFO.name,
  metadataBase: new URL(PERSONAL_INFO.portfolio),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PERSONAL_INFO.portfolio,
    title: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.bio,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.bio,
    images: ["/images/og-image.jpg"],
    creator: "@akash_gupta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-900 text-white`}
        suppressHydrationWarning={true}
      >
        <GameRewardProvider>
          <GameModalProvider>
            <div className="min-h-screen flex flex-col">{children}</div>
          </GameModalProvider>
        </GameRewardProvider>
      </body>
    </html>
  );
}
