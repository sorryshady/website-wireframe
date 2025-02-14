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
  metadataBase: new URL("https://ernyg.com"),
  title: "Ernyg | Creative Design & Development Studio",
  description:
    "Ernyg is a premier creative studio specializing in UI/UX design, web development, and digital experiences. We create beautiful, functional, and accessible digital solutions that drive business growth.",
  keywords: [
    // Primary Keywords
    "UI/UX Design",
    "Web Development",
    "Digital Design",
    "Creative Studio",
    "Full Stack Development",
    "Mobile App Development",
    "Brand Design",
    "User Interface Design",
    "User Experience Design",

    // Service Keywords
    "Website Design",
    "Web Application Development",
    "React Development",
    "Next.js Development",
    "Frontend Development",
    "Backend Development",
    "Responsive Design",
    "Interactive Design",
    "Custom Web Solutions",
    "E-commerce Development",

    // Industry Keywords
    "Digital Agency",
    "Tech Studio",
    "Design Agency",
    "Software Development Company",
    "Creative Technology",
    "Digital Innovation",

    // Location Keywords
    "Design Studio India",
    "Web Development India",
    "Global Design Studio",

    // Brand Keywords
    "Ernyg",
    "Ernyg Studio",
    "Ernyg Design",
    "Ernyg Development",
  ],
  authors: [{ name: "Ernyg", url: "https://ernyg.com" }],
  creator: "Ernyg",
  publisher: "Ernyg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ernyg.com",
    title: "Ernyg | Creative Design & Development Studio",
    description:
      "Where design meets technology. We create beautiful, functional digital experiences with a focus on performance, accessibility, and user engagement.",
    siteName: "Ernyg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ernyg | Creative Design & Development Studio",
    description:
      "Where design meets technology. We create beautiful, functional digital experiences with a focus on performance, accessibility, and user engagement.",
    creator: "@ernyg",
    site: "@ernyg",
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
  alternates: {
    canonical: "https://ernyg.com",
  },
  category: "technology",
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
