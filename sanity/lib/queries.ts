// gets all categories
export const CATEGORIES_QUERY = `*[_type == "category"] {
  _id,
  title,
  description
}`;

// gets paginated posts with slugs
export const POSTS_QUERY = `*[_type == "post" && (!$category || $category in categories[]->title)] | order(publishedAt desc) [$start...$end] {
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

// gets total count of posts for pagination
export const POSTS_COUNT_QUERY = `count(*[_type == "post" && (!$category || $category in categories[]->title)])`;
