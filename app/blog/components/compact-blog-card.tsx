"use client";

import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity/types";
import Image from "next/image";
import { format } from "date-fns";
import { readingTime } from "reading-time-estimator";
import { PortableTextBlock, toPlainText } from "next-sanity";
import { useRouter } from "next/navigation";

interface CompactBlogCardProps {
  post: Post;
}

const CompactBlogCard = ({ post }: CompactBlogCardProps) => {
  const router = useRouter();
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
      className="group cursor-pointer rounded-lg transition-all duration-300
        bg-gray-50 border border-gray-300
        hover:shadow-lg hover:border-gray-400
        hover:-translate-y-1 overflow-hidden
        flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
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
      <div className="p-6 flex flex-col flex-grow">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <span
              key={post._id + category._id}
              className="text-xs font-semibold font-geist text-gray-800 bg-gray-200 px-2 py-1 rounded-full"
            >
              {category.title}
            </span>
          ))}
        </div>

        {/* Title and Excerpt */}
        <div className="space-y-2 mb-4">
          <h3 className="text-xl font-bold font-geist text-gray-900 line-clamp-2 group-hover:text-gray-700">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 font-geist">
            {post.excerpt}
          </p>
        </div>

        {/* Author and Meta */}
        <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.author?.image?.asset && (
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={urlFor(post.author.image.asset).url()}
                  alt={post.author?.name || ""}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm font-semibold text-gray-800 font-geist">
              {post.author?.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-geist font-semibold text-gray-600">
            <span>{readTime.minutes} min read</span>
            <span>•</span>
            <span>
              {format(
                new Date(post.publishedAt || post._createdAt!),
                "dd MMM yyyy",
              )}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CompactBlogCard;
