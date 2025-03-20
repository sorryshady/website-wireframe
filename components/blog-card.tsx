"use client";
import { BlogPost } from "@/data/blog";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article
      className="blog-post group cursor-pointer rounded-xl transition-all duration-300
        bg-white
        border border-black/5
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:border-black/10
        hover:-translate-y-1
        overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 md:p-8">
        {/* Categories and Read Time */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 font-mont mb-4">
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="bg-black/10 px-3 py-1 rounded-full font-medium hover:bg-black/15 transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        {/* Title and Excerpt */}
        <div className="space-y-3 mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-mont text-black group-hover:text-black/80 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 font-mont line-clamp-3 text-sm md:text-base">
            {post.excerpt}
          </p>
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shadow-sm flex-shrink-0">
              <Image
                src={post.author.image}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium font-mont text-black">
                {post.author.name}
              </span>
              <span className="text-xs md:text-sm text-gray-600 font-mont">
                {post.author.position}
              </span>
            </div>
          </div>
          <span className="text-sm text-gray-600 font-mont">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
