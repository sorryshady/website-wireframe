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
  title: "Ernyg",
  description:
    "Ernyg is a design and development studio that creates beautiful, functional websites and apps.",
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
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
