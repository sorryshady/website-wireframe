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
import Script from "next/script";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ernyg.com/#website",
      url: "https://ernyg.com",
      name: "Ernyg",
      description: "Creative Design & Development Studio",
      publisher: {
        "@type": "Organization",
        name: "Ernyg",
        logo: {
          "@type": "ImageObject",
          url: "https://ernyg.com/logo.png",
        },
      },
    },
    {
      "@type": "Organization",
      "@id": "https://ernyg.com/#organization",
      name: "Ernyg",
      url: "https://ernyg.com",
      logo: {
        "@type": "ImageObject",
        url: "https://ernyg.com/logo.png",
        width: 190,
        height: 60,
      },
      sameAs: [
        // Add your social media URLs here
        "https://instagram.com/ernygtech",
        "https://linkedin.com/company/ernyg",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://ernyg.com/#service",
      name: "Ernyg",
      description:
        "Premier creative studio specializing in UI/UX design, web development, and digital experiences",
      url: "https://ernyg.com",
      priceRange: "$$",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Design & Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "UI/UX Design",
              description:
                "Creating intuitive and engaging user interfaces and experiences that delight users and drive engagement",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Development",
              description:
                "Building modern, responsive, and performant web applications using cutting-edge technologies",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile Development",
              description:
                "Developing native and cross-platform mobile applications that provide seamless user experiences",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Brand Design",
              description:
                "Crafting unique and memorable brand identities that resonate with your target audience",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Marketing",
              description:
                "Strategic digital marketing solutions to enhance your online presence and reach",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Consulting",
              description:
                "Expert guidance and consulting services for your digital transformation journey",
            },
          },
        ],
      },
    },
  ],
};

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
