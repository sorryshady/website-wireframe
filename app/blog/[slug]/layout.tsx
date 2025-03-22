import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { Post } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { toPlainText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

// Reuse the same query from page.tsx to get post data
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
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

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post>({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const ogImage = post.mainImage?.asset?.url
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  const description =
    post.excerpt && post.excerpt.length > 190
      ? post.excerpt.slice(0, 190) + "..."
      : post.excerpt ||
        toPlainText(post.body as unknown as PortableTextBlock).substring(
          0,
          155,
        );

  const title =
    post.title.length > 57 ? post.title.slice(0, 55) + "..." : post.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "Unknown"],
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
