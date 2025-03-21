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
      <div className="relative w-full h-32 overflow-hidden">
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
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and Category */}
        <div className="space-y-2 mb-2">
          <h3 className="text-base font-bold font-geist text-gray-900 line-clamp-2 group-hover:text-gray-700">
            {post.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 1).map((category) => (
              <span
                key={category._id}
                className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
              >
                {category.title}
              </span>
            ))}
            <span className="text-xs font-medium text-gray-500">
              {readTime.minutes} min read
            </span>
          </div>
        </div>

        {/* Date and Author - Mobile Hidden */}
        <div className="mt-auto pt-2 border-t border-gray-200 hidden sm:flex items-center justify-between">
          <span className="text-xs text-gray-500 font-geist">
            {format(
              new Date(post.publishedAt || post._createdAt!),
              "dd MMM yyyy",
            )}
          </span>
          <span className="text-xs font-medium text-gray-600 font-geist">
            {post.author?.name}
          </span>
        </div>
      </div>
    </article>
  );
};

export default CompactBlogCard;
