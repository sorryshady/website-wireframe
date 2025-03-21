import BlogNavbar from "@/components/blog-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Ernyg",
  description:
    "Insights, tutorials, and thoughts on design, development, and technology.",
  openGraph: {
    title: "Blog | Ernyg",
    description:
      "Insights, tutorials, and thoughts on design, development, and technology.",
    type: "website",
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
