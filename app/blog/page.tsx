"use client";
import { useState } from "react";
import { blogPosts, categories } from "@/data/blog";
import BlogNavbar from "@/components/blog-navbar";
import BlogCard from "@/components/blog-card";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.categories.includes(selectedCategory);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <BlogNavbar />
      <div className="min-h-screen bg-off-white text-black py-24">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10  text-center font-mont">
              Blog
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-mont">
              Exploring tech, design, and the art of building something great -
              From the Minds at Ernyg.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-16 space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border-b border-black/20 focus:border-black/40 focus:outline-none font-mont text-lg transition-colors placeholder:text-gray-500 text-black"
              />
              <div className="h-4" />
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-1.5 rounded-full font-mont text-sm transition-all duration-300 ${
                      selectedCategory === category.name
                        ? "bg-black text-white"
                        : "bg-black/5 hover:bg-black/10 text-black"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog List */}
            <div className="space-y-8">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 font-mont">
                    No articles found matching your criteria.
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
