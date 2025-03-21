"use client";

import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity/types";
import Image from "next/image";
import { useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { readingTime } from "reading-time-estimator";
import { PortableTextBlock, toPlainText } from "next-sanity";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const router = useRouter();
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

  const handleClick = () => {
    router.push(`/blog/${post.slug.current}`);
  };

  return (
    <article
      onClick={handleClick}
      className="blog-post group cursor-pointer rounded-xl transition-all duration-300
        bg-gray-50
        border border-gray-300
        shadow-lg
        hover:shadow-2xl
        hover:border-gray-300
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
        <div className="flex flex-wrap items-center gap-3 text-sm font-geist mb-4 justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="bg-gray-200 border-2 border-gray-200 px-3 py-1 rounded-full font-semibold text-gray-800"
              >
                {category.title}
              </span>
            ))}
          </div>
          <span className="font-semibold text-gray-500">
            {readTime.minutes} min read
          </span>
        </div>

        {/* Title and Excerpt */}
        <div className="space-y-3 mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-geist text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 font-geist line-clamp-3 text-sm md:text-base">
            {post.excerpt}
          </p>
        </div>

        {/* Author and Date */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-sm flex-shrink-0">
            {post.author?.image?.asset && (
              <Image
                src={urlFor(post.author.image.asset).url()}
                alt={post.author?.name || ""}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-semibold font-geist text-gray-900">
              {post.author?.name}
            </span>
            <span className="text-sm md:text-base text-gray-600 font-geist">
              {post.author?.title}
            </span>
          </div>
          <div className="ml-auto flex gap-2">
            <span className="text-sm md:text-base text-gray-500 font-geist">
              {publishedDateDescription?.actualDate}
            </span>
            <span className="text-sm md:text-base text-gray-500 font-geist hidden md:block">
              ({publishedDateDescription?.timeAgo} ago)
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
