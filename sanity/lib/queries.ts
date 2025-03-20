import { defineQuery } from "next-sanity";

// gets all categories
export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"]{
  _id,
  title,
  slug
}`);

// gets paginated posts with slugs
export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  body,
  slug,
  title,
  excerpt,
  publishedAt,
  _createdAt,
  categories[]->{
    _id,
    slug,
    title
  },
  mainImage{
    asset->{
      url,
      metadata{
        dimensions,
        lqip
      }
    }
  }
}`);

// gets total count of posts for pagination
export const POSTS_COUNT_QUERY = defineQuery(
  `count(*[_type == "post" && defined(slug.current)])`,
);
