"use client";

import { Post, Category } from "@/sanity/types";
import CompactBlogCard from "./compact-blog-card";
import { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";

interface RelatedPostsProps {
  currentPost: {
    _id: string;
    categories: Category[];
  };
}

const RelatedPosts = ({ currentPost }: RelatedPostsProps) => {
  console.log("currentPost categories", currentPost.categories);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setIsLoading(true);
        const categoryRefs = currentPost.categories.map((cat) => cat._id);

        // Updated query to properly match categories
        const query = `*[
          _type == "post" &&
          _id != $currentPostId &&
          count((categories[]->_id)[@ in $categoryRefs]) > 0
        ] | order(count((categories[]->_id)[@ in $categoryRefs]) desc, publishedAt desc) [0...3] {
          _id,
          title,
          slug,
          excerpt,
          mainImage {
            asset-> {
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            }
          },
          publishedAt,
          _createdAt,
          categories[]-> {
            _id,
            title
          },
          author-> {
            name,
            title
          },
          body
        }`;

        const relatedPosts = (await sanityFetch({
          query,
          params: {
            currentPostId: currentPost._id,
            categoryRefs: categoryRefs,
          },
        })) as Post[];

        console.log("relatedPosts", relatedPosts);
        setPosts(relatedPosts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentPost.categories.length > 0) {
      fetchRelatedPosts();
    } else {
      setIsLoading(false);
    }
  }, [currentPost._id, currentPost.categories]);

  if (isLoading) {
    return (
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold font-geist text-gray-900 mb-8">
            Related Articles
          </h2>
          <div className="flex items-center justify-center w-full py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold font-geist text-gray-900 mb-8">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <CompactBlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
