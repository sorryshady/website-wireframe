import BlogNavbar from "@/components/blog-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors | Ernyg",
  description:
    "Meet our team of developers and designers sharing their knowledge and experiences.",
  keywords: [
    "authors",
    "writers",
    "content creators",
    "blog writers",
    "experts",
    "team",
    "ernyg authors",
    "ernyg team",
    "tech writers",
    "technology experts",
    "UI/UX designers",
    "web developers",
    "software engineers",
    "product managers",
    "project managers",
    "content strategists",
    "branding experts",
    "Artists",
    "Designers",
    "Graphic designers",
  ],
  alternates: {
    canonical: "https://ernyg.com/authors",
  },
  openGraph: {
    title: "Authors | Ernyg",
    description:
      "Meet our team of developers and designers sharing their knowledge and experiences.",
    url: "https://ernyg.com/authors",
    siteName: "Ernyg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Authors | Ernyg",
    description:
      "Meet our team of developers and designers sharing their knowledge and experiences.",
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

export default function AuthorsLayout({
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
