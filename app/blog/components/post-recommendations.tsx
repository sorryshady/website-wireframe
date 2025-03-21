"use client";

import { Post, Author, Category } from "@/sanity/types";
import { useCallback, useState } from "react";
import AuthorPosts from "./author-posts";
import RelatedPosts from "./related-posts";

interface PostRecommendationsProps {
  currentPost: {
    _id: string;
    author?: Author;
    categories: Category[];
  };
}

const PostRecommendations = ({ currentPost }: PostRecommendationsProps) => {
  const [authorPostIds, setAuthorPostIds] = useState<string[]>([]);
  const [hasLoadedAuthorPosts, setHasLoadedAuthorPosts] = useState(false);

  const handleAuthorPostsFetched = useCallback((posts: Post[]) => {
    setAuthorPostIds(posts.map((p) => p._id));
    setHasLoadedAuthorPosts(true);
  }, []);

  return (
    <>
      {/* More from Author */}
      <AuthorPosts
        currentPost={{
          _id: currentPost._id,
          author: currentPost.author,
        }}
        onPostsFetched={handleAuthorPostsFetched}
      />

      {/* Only show Related Posts after author posts have loaded */}
      {hasLoadedAuthorPosts && (
        <RelatedPosts
          currentPost={{
            _id: currentPost._id,
            categories: currentPost.categories,
          }}
          excludePostIds={authorPostIds}
        />
      )}
    </>
  );
};

export default PostRecommendations;
