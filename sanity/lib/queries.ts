import { defineQuery } from "next-sanity";

// gets all posts with slugs
export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{
    _id,
    body,
    slug,
    title,
    categories[]->{
      slug,
      title
    },
    publishedAt,
    _createdAt,
    mainImage{
      asset->{
        url,
        metadata{
          dimensions,
          lqip
        }
      }
    }
  } | order(_createdAt desc)`);
