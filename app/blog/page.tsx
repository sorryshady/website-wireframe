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
    search?: string;
  };
}

const POSTS_PER_PAGE = 5;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const selectedCategory = searchParams.category || "All";
  const searchQuery = searchParams.search || "";
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // Fetch categories
  const categories = (await sanityFetch({
    query: CATEGORIES_QUERY,
  })) as Category[];

  // Fetch total count for pagination, filtered by category and search
  const totalPosts = (await sanityFetch({
    query: POSTS_COUNT_QUERY,
    params: {
      category: selectedCategory === "All" ? "" : selectedCategory,
      search: searchQuery ? `*${searchQuery}*` : "",
    },
  })) as number;

  // Fetch paginated posts, filtered by category and search
  const posts = (await sanityFetch({
    query: POSTS_QUERY,
    params: {
      start,
      end,
      category: selectedCategory === "All" ? "" : selectedCategory,
      search: searchQuery ? `*${searchQuery}*` : "",
    },
  })) as Post[];

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
