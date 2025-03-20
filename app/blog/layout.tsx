import BlogNavbar from "@/components/blog-navbar";
import Footer from "@/components/footer";
import SmoothScroller from "@/components/smooth-scroller";
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
      <SmoothScroller>
        {/* <BlogNavbar /> */}
        {children}
        {/* <Footer /> */}
      </SmoothScroller>
    </>
  );
}
