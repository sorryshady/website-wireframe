"use client";

import { Post, Author } from "@/sanity/types";
import CompactBlogCard from "./compact-blog-card";
import { useEffect, useRef, useState } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";

interface AuthorPostsProps {
  currentPost: {
    _id: string;
    author?: Author;
  };
  excludePostIds?: string[];
  onPostsFetched?: (posts: Post[]) => void;
}

const AuthorPosts = ({
  currentPost,
  excludePostIds = [],
  onPostsFetched,
}: AuthorPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      if (!currentPost.author?.name || hasFetched.current) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const query = `*[
          _type == "post" &&
          _id != $currentPostId &&
          !(_id in $excludePostIds) &&
          author->name == $authorName
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

        const authorPosts = (await sanityFetch({
          query,
          params: {
            currentPostId: currentPost._id,
            authorName: currentPost.author.name,
            excludePostIds: excludePostIds,
          },
        })) as Post[];

        setPosts(authorPosts);
        onPostsFetched?.(authorPosts);
        hasFetched.current = true;
      } catch (error) {
        console.error("Error fetching author posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthorPosts();
  }, [currentPost._id, currentPost.author?.name]);

  if (isLoading) {
    return (
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold font-geist text-gray-900 mb-8 text-center">
            More from {currentPost.author?.name}
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
          More from {currentPost.author?.name}
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

export default AuthorPosts;
