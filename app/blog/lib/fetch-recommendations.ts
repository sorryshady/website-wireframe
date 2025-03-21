import { Post, Author, Category } from "@/sanity/types";
import { sanityFetch } from "@/sanity/lib/client";

interface RecommendationsResult {
  authorPosts: Post[];
  relatedPosts: Post[];
}

export async function fetchRecommendations(currentPost: {
  _id: string;
  author?: Author;
  categories: Category[];
}): Promise<RecommendationsResult> {
  // First, fetch author posts
  const authorPosts = await fetchAuthorPosts(currentPost);

  // Then fetch related posts, excluding author posts
  const relatedPosts = await fetchRelatedPosts(
    currentPost,
    authorPosts.map((post) => post._id),
  );

  return {
    authorPosts,
    relatedPosts,
  };
}

async function fetchAuthorPosts(currentPost: {
  _id: string;
  author?: Author;
}): Promise<Post[]> {
  if (!currentPost.author?.name) {
    return [];
  }

  const query = `*[
    _type == "post" &&
    _id != $currentPostId &&
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

  const posts = await sanityFetch<Post[]>({
    query,
    params: {
      currentPostId: currentPost._id,
      authorName: currentPost.author.name,
    },
  });

  return posts;
}

async function fetchRelatedPosts(
  currentPost: {
    _id: string;
    categories: Category[];
  },
  excludePostIds: string[],
): Promise<Post[]> {
  const categoryRefs = currentPost.categories.map((cat) => cat._id);
  const idsToExclude = [currentPost._id, ...excludePostIds];

  // First try to fetch related posts by category
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

  const relatedPosts = await sanityFetch<Post[]>({
    query: relatedQuery,
    params: {
      currentPostId: currentPost._id,
      categoryRefs,
      excludePostIds: idsToExclude,
    },
  });

  // If no related posts found, fetch recent posts instead
  if (relatedPosts.length === 0) {
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

    return sanityFetch<Post[]>({
      query: recentQuery,
      params: {
        currentPostId: currentPost._id,
        excludePostIds: idsToExclude,
      },
    });
  }

  return relatedPosts;
}
