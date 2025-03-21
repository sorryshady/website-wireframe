"use client";

import { Post, Category } from "@/sanity/types";
import CompactBlogCard from "./compact-blog-card";
import { useEffect, useRef, useState } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";

interface RelatedPostsProps {
  currentPost: {
    _id: string;
    categories: Category[];
  };
  excludePostIds?: string[];
  onPostsFetched?: (posts: Post[]) => void;
}

const RelatedPosts = ({
  currentPost,
  excludePostIds = [],
  onPostsFetched,
}: RelatedPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRelated, setIsRelated] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (hasFetched.current) {
        return;
      }

      try {
        setIsLoading(true);
        const categoryRefs = currentPost.categories.map((cat) => cat._id);

        // First try to fetch related posts
        const relatedQuery = `*[
          _type == "post" &&
          _id != $currentPostId &&
          !(_id in $excludePostIds) &&
          count((categories[]->_id)[@ in $categoryRefs]) > 0
        ] | order(count((categories[]->_id)[@ in $categoryRefs]) desc, publishedAt desc) [0...2] {
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
            _id,
            name,
            title,
            image {
              asset-> {
                _id,
                url
              }
            }
          },
          body
        }`;

        const relatedPosts = (await sanityFetch({
          query: relatedQuery,
          params: {
            currentPostId: currentPost._id,
            categoryRefs: categoryRefs,
            excludePostIds: excludePostIds,
          },
        })) as Post[];

        // If no related posts, fetch recent posts instead
        if (relatedPosts.length === 0) {
          setIsRelated(false);
          const recentQuery = `*[
            _type == "post" &&
            _id != $currentPostId &&
            !(_id in $excludePostIds)
          ] | order(publishedAt desc) [0...2] {
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
              title,
              image {
                asset-> {
                  _id,
                  url
                }
              }
            },
            body
          }`;

          const recentPosts = (await sanityFetch({
            query: recentQuery,
            params: {
              currentPostId: currentPost._id,
              excludePostIds: excludePostIds,
            },
          })) as Post[];

          setPosts(recentPosts);
          onPostsFetched?.(recentPosts);
        } else {
          setIsRelated(true);
          setPosts(relatedPosts);
          onPostsFetched?.(relatedPosts);
        }
        hasFetched.current = true;
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPost._id, currentPost.categories]); // Removed excludePostIds and onPostsFetched from dependencies

  if (isLoading) {
    return (
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold font-geist text-gray-900 mb-8 text-center">
            {isRelated ? "Related Articles" : "You Might Be Interested In"}
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
        <h2 className="text-2xl font-bold font-geist text-gray-900 mb-8 text-center">
          {isRelated ? "Related Articles" : "You Might Be Interested In"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {posts.map((post) => (
            <CompactBlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
