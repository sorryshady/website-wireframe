import { sanityFetch } from "@/sanity/lib/client";
import { Author, Post } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Globe } from "lucide-react";
import BlogCard from "@/components/blog-card";
import AuthorSocials from "../components/AuthorSocials";
import { ScrollToTop } from "@/components/scroll-to-top";
import BackButton from "@/app/blog/components/back-button";
import Portable from "@/components/portable";

// Revalidate once per day (in seconds)
export const revalidate = 86400;

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
    revalidate: 86400,
    tags: ["author", "post"],
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
            className="text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 font-geist"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Authors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 scroll-smooth" id="author">
      <ScrollToTop />
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-geist"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Authors
          </Link> */}
          <BackButton currentPage="authors" />
        </div>
      </div>

      {/* Author Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-8">
            {/* Author Image and Basic Info */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Left Column - Image */}
              <div className="w-3/4 md:w-1/4">
                <div className="relative">
                  <div className="aspect-square relative rounded-full overflow-hidden border-4 border-white shadow-lg">
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
              </div>

              {/* Right Column - Info */}
              <div className="w-full md:w-3/4 text-center md:text-left">
                <div className="flex flex-col h-full">
                  <h1 className="text-3xl md:text-5xl font-bold font-geist text-gray-900 mb-1 md:mb-2">
                    {author.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 font-geist mb-4">
                    {author.title}
                  </p>

                  {/* Contact Info and Social Links */}
                  <div className="space-y-6">
                    {/* Contact Links */}
                    <div className="flex items-center justify-center md:justify-start gap-8 text-base font-geist text-gray-600">
                      {author.contact?.email && (
                        <a
                          href={`mailto:${author.contact.email}`}
                          className="flex items-center gap-2 hover:text-gray-900 text-lg  "
                        >
                          <Mail className="w-6 h-6" />
                          {author.contact.email}
                        </a>
                      )}
                      {author.contact?.website && (
                        <a
                          href={author.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-gray-900 text-lg "
                        >
                          <Globe className="w-6 h-6" />
                          Website
                        </a>
                      )}
                    </div>

                    {/* Social Links */}
                    {author.contact?.social && (
                      <AuthorSocials socials={author.contact.social} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar - About */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-geist font-semibold text-gray-900 mb-4">
                  About
                </h3>
                <div className="prose prose-sm prose-gray font-geist max-w-none">
                  <Portable
                    content={author.bio as unknown as PortableTextBlock[]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area - Articles */}
          <div className="md:col-span-2">
            {/* Articles Section */}
            {author.posts && author.posts.length > 0 && (
              <div>
                <h2 className="text-xl font-bold font-geist text-gray-900 mb-6 sticky top-0 bg-gray-50 py-4 z-10">
                  Articles
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({author.posts.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {author.posts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
