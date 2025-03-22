import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { Author } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  title,
  slug,
  image {
    asset-> {
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  contact,
  bio
}`;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await sanityFetch<Author>({
    query: AUTHOR_QUERY,
    params: { slug },
  });

  if (!author) {
    return {
      title: "Author Not Found",
      description: "The requested author profile could not be found.",
    };
  }

  const ogImage = author.image
    ? urlFor(author.image).width(1200).height(630).url()
    : undefined;

  const description = `${author.name} - ${author.title}${
    author.contact?.website ? ` | ${author.contact.website}` : ""
  }`;

  return {
    title: `${author.name} - ${author.title || "Author"}`,
    description,
    openGraph: {
      title: `${author.name} - ${author.title || "Author"}`,
      description,
      type: "profile",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: author.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${author.name} - ${author.title || "Author"}`,
      description,
      images: ogImage ? [ogImage] : [],
      creator: author.contact?.social?.twitter
        ? author.contact.social.twitter.split("/").pop()
        : undefined,
    },
  };
}

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
