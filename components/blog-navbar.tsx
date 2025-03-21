"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

const BlogNavbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-50 border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <Image
            src="/logo.svg"
            alt="ERNYG Logo"
            width={95}
            height={31}
            className="transition-opacity duration-300 hover:opacity-80 invert"
          />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-mono text-2xl font-medium transition-colors relative group"
          >
            <span className="text-gray-900">Home</span>
            <span
              className={`absolute -bottom-1 left-0 h-px bg-gray-900 transition-all duration-300 ${
                isActive("/") ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
          <Link
            href="/blog"
            className="font-mono text-2xl font-medium transition-colors relative group"
          >
            <span className="text-gray-900">Blog</span>
            <span
              className={`absolute -bottom-1 left-0 h-px bg-gray-900 transition-all duration-300 ${
                isActive("/blog") ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BlogNavbar;
