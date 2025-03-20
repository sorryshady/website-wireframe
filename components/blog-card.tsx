"use client";

import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity/types";
import Image from "next/image";
import { useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { readingTime } from "reading-time-estimator";
import { PortableTextBlock, toPlainText } from "next-sanity";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const publishedDateDescription = useMemo(() => {
    const date = post.publishedAt || post._createdAt;
    try {
      return {
        actualDate: format(new Date(date!), "dd MMM yyyy"),
        timeAgo: formatDistanceToNow(new Date(date!)),
      };
    } catch {
      return null;
    }
  }, [post]);

  const readTime = readingTime(
    toPlainText(post.body as unknown as PortableTextBlock),
    200,
  );
  return (
    <article
      className="blog-post group cursor-pointer rounded-xl transition-all duration-300
        bg-white/5
        border border-white/10
        shadow-[0_2px_15px_-3px_rgba(255,255,255,0.07),0_10px_20px_-2px_rgba(255,255,255,0.04)]
        hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)]
        hover:border-white/20
        hover:-translate-y-1
        overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden">
        {post.mainImage?.asset?.url && (
          <Image
            src={urlFor(post.mainImage.asset.url).url()}
            alt={post.title || ""}
            fill
            placeholder="blur"
            blurDataURL={post.mainImage.asset.metadata?.lqip || ""}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 md:p-8">
        {/* Categories and Read Time */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 font-mont mb-4">
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="bg-white/10 px-3 py-1 rounded-full font-medium hover:bg-white/15 transition-colors text-white"
              >
                {category.title}
              </span>
            ))}
          </div>
          <span>•</span>
          <span>{readTime.minutes} min read</span>
        </div>

        {/* Title and Excerpt */}
        <div className="space-y-3 mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-mont text-white group-hover:text-white/80 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-400 font-mont line-clamp-3 text-sm md:text-base">
            {post.excerpt}
          </p>
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shadow-sm flex-shrink-0">
              {post.author?.image?.asset && (
                <Image
                  src={urlFor(post.author.image.asset).url()}
                  alt={post.author?.name || ""}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium font-mont text-white">
              {post.author?.name}
            </span>
            <span className="text-xs md:text-sm text-gray-400 font-mont">
              {post.author?.title}
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-400 font-mont">
          {publishedDateDescription?.actualDate}
        </span>
      </div>
    </article>
  );
};

export default BlogCard;
