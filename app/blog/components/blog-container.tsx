"use client";

import { Post, Category } from "@/sanity/types";
import BlogCard from "@/components/blog-card";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";

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

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
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
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="relative pt-16 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 text-center font-mont text-gray-900">
            Blog
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 font-mont">
            Exploring tech, design, and the art of building something great -
            From the Minds at Ernyg.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="space-y-6 mb-16">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-6 py-3 bg-white border border-gray-400 rounded-full shadow-sm
              focus:border-gray-500 focus:ring-2 focus:ring-gray-100 focus:outline-none
              font-mont text-lg transition-all duration-300
              placeholder:text-gray-500 text-gray-900"
            />
            <div className="h-8" />
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <button
                onClick={() => handleCategoryChange("All")}
                className={`px-4 py-1.5 rounded-full font-mont text-sm transition-all duration-300 border-2 ${
                  selectedCategory === "All"
                    ? "bg-gray-900 text-white border-gray-900 shadow-md font-bold"
                    : "bg-white hover:bg-gray-100 text-gray-800 border-gray-400 hover:border-gray-500 shadow-sm"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category.title || "")}
                  className={`px-4 py-1.5 rounded-full font-mont text-sm transition-all duration-300 border-2 ${
                    selectedCategory === category.title
                      ? "bg-gray-900 text-white border-gray-900 shadow-md font-bold"
                      : "bg-white hover:bg-gray-100 text-gray-800 border-gray-400 hover:border-gray-500 shadow-sm"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-8">
          {initialPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-mont">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {initialPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
              <div className="flex justify-center items-center gap-4 pt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-2 text-gray-800 rounded-full font-mont border border-gray-500 shadow-md hover:bg-gray-300 hover:border-gray-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-gray-800 font-mont">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 text-gray-800 rounded-full font-mont border border-gray-500 shadow-md hover:bg-gray-300 hover:border-gray-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
