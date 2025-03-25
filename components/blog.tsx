"use client";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BlogCard from "./blog-card";
import { fetchLatestPost } from "@/lib/fetch-latest";
import { Post } from "@/sanity/types";
import { ExternalLink } from "lucide-react";

const Blog = () => {
  const containerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const post = await fetchLatestPost();
        setPost(post);
      } catch (error) {
        console.error("Error fetching latest post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatest();
  }, []);

  useGSAP(() => {
    // Animate title
    gsap.from(".blog-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".blog-title",
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
    gsap.from(".blog-description", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".blog-description",
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Continuous bounce animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full max-w-3xl mx-auto p-8 border border-white/10 rounded-lg bg-white/5 backdrop-blur">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-white/10 rounded-lg"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </div>
        </div>
      );
    }

    if (!post) {
      return (
        <div className="w-full max-w-3xl mx-auto p-8 border border-white/10 rounded-lg bg-white/5 backdrop-blur text-center">
          <h3 className="text-2xl font-mont font-semibold mb-4">Coming Soon</h3>
          <p className="text-gray-400">
            We&apos;re working on some exciting articles. Check back soon for
            our latest insights and updates.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <BlogCard post={post} />
        <div className="flex justify-center">
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full border border-white bg-white text-black
                         hover:bg-transparent hover:text-white transition-all duration-300 font-oxygen text-base tracking-wide font-semibold uppercase"
          >
            <span>Read More Articles</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div
      className="about-section h-[100svh] bg-black text-white flex flex-col justify-center items-center py-10 sm:py-20 relative"
      ref={containerRef}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="blog-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center font-mont">
            Blog
          </h2>
          <p className="blog-description text-xl sm:text-2xl text-gray-400 font-mont">
            Discover the latest in technology, design, and innovation from the
            minds at Ernyg.{" "}
            {post
              ? "Read our newest article below, or explore more on our blog."
              : "Stay tuned for our upcoming articles."}
          </p>
        </div>
        {renderContent()}
      </div>
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60
         transition-opacity duration-300 mb-safe"
      >
        <span className="text-sm sm:text-base font-medium tracking-wider">
          KEEP SCROLLING
        </span>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Blog;
