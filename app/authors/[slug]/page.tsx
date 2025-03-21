import { sanityFetch } from "@/sanity/lib/client";
import { Author, Post } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogCard from "@/components/blog-card";
import AuthorSocials from "../components/AuthorSocials";

type Params = Promise<{ slug: string }>;
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
  bio,
  contact,
  "posts": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc) {
    _id,
    title,
    slug,
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
    excerpt,
    body
  }
}`;

export default async function AuthorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const author = await sanityFetch<Author & { posts: Post[] }>({
    query: AUTHOR_QUERY,
    params: { slug },
  });

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-geist text-gray-900 mb-4">
            Author not found
          </h1>
          <Link
            href="/authors"
            className="text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Authors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Author Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Author Image */}
            <div className="w-full md:w-1/3">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                {author.image?.asset && (
                  <Image
                    src={urlFor(author.image.asset)
                      .width(400)
                      .height(400)
                      .url()}
                    alt={author.name || ""}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="w-full md:w-2/3">
              <Link
                href="/authors"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Authors
              </Link>
              <h1 className="text-4xl font-bold font-geist text-gray-900 mb-2">
                {author.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{author.title}</p>

              {/* Contact Information */}
              {author.contact && (
                <div className="space-y-2 mb-8">
                  {author.contact.email && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span>{" "}
                      <a
                        href={`mailto:${author.contact.email}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {author.contact.email}
                      </a>
                    </p>
                  )}
                  {author.contact.website && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Website:</span>{" "}
                      <a
                        href={author.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {author.contact.website}
                      </a>
                    </p>
                  )}
                </div>
              )}

              {/* Social Links */}
              {author.contact?.social && (
                <AuthorSocials socials={author.contact.social} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <PortableText value={author.bio!} />
        </div>
      </div>

      {/* Author's Articles */}
      {author.posts && author.posts.length > 0 && (
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold font-geist text-gray-900 mb-8">
              Articles by {author.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {author.posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
