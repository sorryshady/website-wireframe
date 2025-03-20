"use client";

import { Post, Category } from "@/sanity/types";
import BlogCard from "@/components/blog-card";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

interface BlogContainerProps {
  initialPosts: Post[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  selectedCategory: string;
  searchQuery: string;
}

export function BlogContainer({
  initialPosts,
  categories,
  currentPage,
  totalPages,
  selectedCategory,
  searchQuery: initialSearchQuery,
}: BlogContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(initialSearchQuery);
  const debouncedSearch = useDebounce(searchInput, 500);

  // Only update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    // Preserve the current page when updating search
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }
    router.replace(`/blog?${params.toString()}`);
  }, [debouncedSearch, router, searchParams, currentPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    if (searchInput) {
      params.set("search", searchInput);
    }
    router.replace(`/blog?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.delete("page");
    if (searchInput) {
      params.set("search", searchInput);
    }
    router.replace(`/blog?${params.toString()}`);
  };

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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
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
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category.title || "")}
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
          {initialPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 font-mont">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {initialPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 pt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-2 bg-white/10 text-white rounded-full font-mont hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white font-mont">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 bg-white/10 text-white rounded-full font-mont hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
