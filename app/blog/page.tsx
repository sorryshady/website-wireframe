import {
  POSTS_QUERY,
  CATEGORIES_QUERY,
  POSTS_COUNT_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { Post, Category } from "@/sanity/types";

import { BlogContainer } from "./components/blog-container";

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
  };
}

const POSTS_PER_PAGE = 5;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const selectedCategory = searchParams.category || "All";
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // Fetch categories
  const categories = (await sanityFetch({
    query: CATEGORIES_QUERY,
  })) as Category[];

  // Fetch total count for pagination
  const totalPosts = (await sanityFetch({
    query: POSTS_COUNT_QUERY,
  })) as number;

  // Fetch paginated posts
  const posts = (await sanityFetch({
    query: POSTS_QUERY,
    params: { start, end },
  })) as Post[];

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <BlogContainer
      initialPosts={posts}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedCategory={selectedCategory}
    />
  );
}
