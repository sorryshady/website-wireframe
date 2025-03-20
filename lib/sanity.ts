import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-03-19",
  useCdn: true,
};

export const client = createClient(config);

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Reusable fetch functions
export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      author->{
        name,
        image,
        bio
      },
      categories[]->{
        _id,
        title
      }
    }`,
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      body,
      mainImage,
      publishedAt,
      author->{
        name,
        image,
        bio
      },
      categories[]->{
        _id,
        title
      }
    }`,
    { slug },
  );
}
