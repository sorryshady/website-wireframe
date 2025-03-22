import {
  POSTS_QUERY,
  CATEGORIES_QUERY,
  POSTS_COUNT_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { Post, Category } from "@/sanity/types";

import { BlogContainer } from "./components/blog-container";

// Revalidate once per day (in seconds)
export const revalidate = 86400;

type SearchParams = Promise<{
  page?: string;
  category?: string;
  search?: string;
}>;

const POSTS_PER_PAGE = 5;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, category, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const selectedCategory = category || "All";
  const searchQuery = search || "";
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // Fetch categories with daily revalidation
  const categories = await sanityFetch<Category[]>({
    query: CATEGORIES_QUERY,
    revalidate: 86400,
    tags: ["category"],
  });

  // Fetch total count for pagination, filtered by category and search
  const totalPosts = await sanityFetch<number>({
    query: POSTS_COUNT_QUERY,
    params: {
      category: selectedCategory === "All" ? "" : selectedCategory,
      search: searchQuery ? `*${searchQuery}*` : "",
    },
    revalidate: 86400,
    tags: ["post"],
  });

  // Fetch paginated posts, filtered by category and search
  const posts = await sanityFetch<Post[]>({
    query: POSTS_QUERY,
    params: {
      start,
      end,
      category: selectedCategory === "All" ? "" : selectedCategory,
      search: searchQuery ? `*${searchQuery}*` : "",
    },
    revalidate: 86400,
    tags: ["post"],
  });

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <BlogContainer
      initialPosts={posts}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedCategory={selectedCategory}
      searchQuery={searchQuery}
    />
  );
}
