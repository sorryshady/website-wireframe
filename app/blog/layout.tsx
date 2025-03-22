import BlogNavbar from "@/components/blog-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Ernyg",
  description:
    "Insights, tutorials, and thoughts on design, development, and technology.",
  keywords: [
    "tech blog",
    "development blog",
    "design insights",
    "programming tutorials",
    "web development",
    "software engineering",
    "UI/UX design",
    "tech insights",
    "coding tutorials",
    "development tips",
    "technology trends",
    "software development",
    "web design",
    "tech articles",
    "developer resources",
  ],
  alternates: {
    canonical: "https://ernyg.com/blog",
  },
  openGraph: {
    title: "Blog | Ernyg",
    description:
      "Insights, tutorials, and thoughts on design, development, and technology.",
    url: "https://ernyg.com/blog",
    siteName: "Ernyg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Ernyg",
    description:
      "Insights, tutorials, and thoughts on design, development, and technology.",
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
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNavbar />
      {children}
    </>
  );
}
