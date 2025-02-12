import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Work_Sans,
  Montserrat,
  Oxygen,
  Oxygen_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/smooth-scroller";
import { ToastProvider } from "@/components/toast-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // regular, medium, semibold, bold
});

const oxygen = Oxygen({
  variable: "--font-oxygen",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const oxygenMono = Oxygen_Mono({
  variable: "--font-oxygen-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Ernyg | Design. Develop. Simplify.",
  description:
    "Ernyg is a premier design and development studio specializing in UI/UX design, full-stack development, and illustrations. We create beautiful, functional websites and mobile applications with a focus on speed, accessibility, and intuitive design.",
  keywords: [
    "UI/UX Design",
    "Web Development",
    "Mobile App Development",
    "Full Stack Development",
    "Illustrations",
    "Digital Design",
    "Web Design",
    "Software Development",
    "Creative Studio",
    "Design Agency",
  ],
  authors: [{ name: "Ernyg" }],
  creator: "Ernyg",
  publisher: "Ernyg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Ernyg | Design. Develop. Simplify.",
    description:
      "Where design and art meets code. We create beautiful, functional websites and mobile applications with a focus on speed, accessibility, and intuitive design.",
    url: "https://ernyg.com",
    siteName: "Ernyg",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ernyg | Design. Develop. Simplify.",
    description:
      "Where design and art meets code. We create beautiful, functional websites and mobile applications with a focus on speed, accessibility, and intuitive design.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable} ${montserrat.variable} ${oxygen.variable} ${oxygenMono.variable} antialiased`}
      >
        <SmoothScroller>
          <ToastProvider>{children}</ToastProvider>
        </SmoothScroller>
      </body>
    </html>
  );
}
