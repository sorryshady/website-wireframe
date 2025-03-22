import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";

interface SanityDocument {
  slug: {
    current: string;
  };
  _updatedAt: string;
}

// Query to get all posts
const ALL_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] {
  slug,
  _updatedAt
}`;

// Query to get all authors
const ALL_AUTHORS_QUERY = `*[_type == "author" && defined(slug.current)] {
  slug,
  _updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all posts and authors
  const posts = await sanityFetch<SanityDocument[]>({ query: ALL_POSTS_QUERY });
  const authors = await sanityFetch<SanityDocument[]>({
    query: ALL_AUTHORS_QUERY,
  });

  // Base URLs
  const baseUrls = [
    {
      url: "https://ernyg.com",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: "https://ernyg.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: "https://ernyg.com/authors",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Generate post URLs
  const postUrls = posts.map((post) => ({
    url: `https://ernyg.com/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Generate author URLs
  const authorUrls = authors.map((author) => ({
    url: `https://ernyg.com/authors/${author.slug.current}`,
    lastModified: new Date(author._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...baseUrls, ...postUrls, ...authorUrls];
}
