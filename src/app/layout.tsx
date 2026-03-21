import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Interactive learning tool to help beginners build mental models around HTML and CSS through visual, hands-on exercises.";

export const metadata: Metadata = {
  title: {
    default: "WebSprout",
    template: "%s | WebSprout",
  },
  description,
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://websprout.dev"
  ),
  openGraph: {
    type: "website",
    siteName: "WebSprout",
    title: {
      default: "WebSprout",
      template: "%s | WebSprout",
    },
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "WebSprout",
      template: "%s | WebSprout",
    },
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
