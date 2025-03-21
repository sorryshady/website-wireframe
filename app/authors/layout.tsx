import BlogNavbar from "@/components/blog-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors | Ernyg",
  description:
    "Meet our team of content creators and experts sharing their knowledge and experiences.",
  openGraph: {
    title: "Authors | Ernyg",
    description:
      "Meet our team of content creators and experts sharing their knowledge and experiences.",
    type: "website",
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
