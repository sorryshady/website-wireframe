"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

const BlogNavbar = () => {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <Image
            src="/logo.svg"
            alt="ERNYG Logo"
            width={95}
            height={31}
            className="invert transition-opacity duration-300 hover:opacity-80"
          />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`font-oxygenMono text-2xl font-medium transition-colors relative group`}
          >
            <span className="text-black">Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/blog"
            className={`font-oxygenMono text-2xl font-medium transition-colors relative group`}
          >
            <span className="text-black">Blog</span>
            <span
              className={`absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 ${pathname === "/blog" ? "w-full" : "group-hover:w-full"}`}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BlogNavbar;
