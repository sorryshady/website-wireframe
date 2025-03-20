import { sanityFetch } from "@/sanity/lib/client";
import { Post } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { format } from "date-fns";
import { readingTime } from "reading-time-estimator";
import { toPlainText } from "next-sanity";
import { PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Params = Promise<{ slug: string }>;

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

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = (await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })) as Post;

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl font-mont">Post not found</h1>
      </div>
    );
  }

  const readTime = readingTime(
    toPlainText(post.body as unknown as PortableTextBlock),
    200,
  );

  return (
    <article className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        {post.mainImage?.asset?.url && (
          <Image
            src={urlFor(post.mainImage.asset.url).url()}
            alt={post.title || ""}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mont mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-300 font-mont">
              <span>{readTime.minutes} min read</span>
              <span>•</span>
              <span>
                {format(
                  new Date(post.publishedAt || post._createdAt!),
                  "dd MMM yyyy",
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="flex justify-center mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white font-mont"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-12">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            {post.author?.image?.asset && (
              <Image
                src={urlFor(post.author.image.asset).url()}
                alt={post.author?.name || ""}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold font-mont text-white">
              {post.author?.name}
            </h2>
            <p className="text-gray-400 font-mont">{post.author?.title}</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.categories.map((category) => (
            <span
              key={category._id}
              className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-mont text-white"
            >
              {category.title}
            </span>
          ))}
        </div>

        {/* Post Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText value={post.body as unknown as PortableTextBlock} />
        </div>
      </div>
    </article>
  );
}
