"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogCard from "@/components/blog-card";
import { Post, Category } from "@/sanity/types";

interface BlogContainerProps {
  initialPosts: Post[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  selectedCategory: string;
}

export function BlogContainer({
  initialPosts,
  categories,
  currentPage,
  totalPages,
  hasMore,
  selectedCategory,
}: BlogContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  };

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (currentPage + 1).toString());
    router.push(`/blog?${params.toString()}`);
  };

  const filteredPosts = posts.filter((post: Post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      post.categories.some((cat: Category) => cat.title === selectedCategory);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Header Section */}
      <div className="fixed top-0 left-0 right-0 bg-black z-40">
        <div className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 text-center font-mont">
              Blog
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 font-mont">
              Exploring tech, design, and the art of building something great -
              From the Minds at Ernyg.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border-b border-white/20 focus:border-white/40 focus:outline-none font-mont text-lg transition-colors placeholder:text-gray-500 text-white"
              />
              <div className="h-6" />
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleCategoryChange("All")}
                  className={`px-4 py-1.5 rounded-full font-mont text-sm transition-all duration-300 ${
                    selectedCategory === "All"
                      ? "bg-white text-black"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  All
                </button>
                {categories.map((category: Category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category.title)}
                    className={`px-4 py-1.5 rounded-full font-mont text-sm transition-all duration-300 ${
                      selectedCategory === category.title
                        ? "bg-white text-black"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shadow Effect */}
        <div className="absolute -bottom-16 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      </div>

      {/* Scrollable Blog List */}
      <div className="pt-[32rem] pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 font-mont">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {filteredPosts.map((post: Post) => (
                <BlogCard key={post._id} post={post} />
              ))}
              {hasMore && (
                <div className="text-center pt-8">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-white text-black rounded-full font-mont hover:bg-white/90 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
