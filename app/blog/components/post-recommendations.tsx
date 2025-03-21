"use client";

import { Post, Author, Category } from "@/sanity/types";
import { useEffect, useState } from "react";
import { fetchRecommendations } from "../lib/fetch-recommendations";
import { Loader2 } from "lucide-react";
import CompactBlogCard from "./compact-blog-card";

interface PostRecommendationsProps {
  currentPost: {
    _id: string;
    author?: Author;
    categories: Category[];
  };
}

export default function PostRecommendations({
  currentPost,
}: PostRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<{
    authorPosts: Post[];
    relatedPosts: Post[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const result = await fetchRecommendations(currentPost);
        setRecommendations(result);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecommendations();
  }, [currentPost]);

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!recommendations) {
    return null;
  }

  return (
    <>
      {recommendations.authorPosts.length > 0 && (
        <section className="py-16 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold font-geist text-gray-900 mb-8 text-center">
              More from {currentPost.author?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {recommendations.authorPosts.map((post) => (
                <CompactBlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {recommendations.relatedPosts.length > 0 && (
        <section className="py-16 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold font-geist text-gray-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {recommendations.relatedPosts.map((post) => (
                <CompactBlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
