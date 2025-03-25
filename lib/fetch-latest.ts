import { sanityFetch } from "@/sanity/lib/client";
import { Post } from "@/sanity/types";

export async function fetchLatestPost() {
  const query = `*[_type == "post"] | order(publishedAt desc) [0]  {
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

  const post = await sanityFetch<Post>({
    query,
    tags: ["latest-post"],
  });

  return post;
}
