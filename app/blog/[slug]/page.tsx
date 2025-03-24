import { sanityFetch } from "@/sanity/lib/client";
import { Post } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { format } from "date-fns";
import { readingTime } from "reading-time-estimator";
import { toPlainText } from "next-sanity";
import { PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { ScrollToTop } from "../../../components/scroll-to-top";
import PostRecommendations from "../components/post-recommendations";
import BackButton from "../components/back-button";
import Portable from "@/components/portable";
import ShareButton from "../components/share-button";

// Revalidate once per week (in seconds)
export const revalidate = 604800;

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
  "author": author-> {
    _id,
    name,
    title,
    slug,
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
  const post = await sanityFetch<Post>({
    query: POST_QUERY,
    params: { slug },
    revalidate: 604800,
    tags: ["post"],
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        <h1 className="text-2xl font-geist">Post not found</h1>
      </div>
    );
  }

  const readTime = readingTime(
    toPlainText(post.body as unknown as PortableTextBlock),
    200,
  );

  return (
    <article
      className="min-h-screen bg-gray-50 text-gray-900 scroll-smooth"
      id="blog"
    >
      <ScrollToTop />
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <BackButton currentPage="blog" />
          <ShareButton
            title={post.title}
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug.current}`}
            description={post.excerpt}
          />
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full">
        {post.mainImage?.asset?.url && (
          <Image
            src={urlFor(post.mainImage.asset.url).url()}
            alt={post.title || ""}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-geist mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-300 font-geist font-semibold">
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
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-12">
          {/* Author Info */}
          <Link href={`/authors/${post.author.slug?.current}`}>
            <div className="flex items-center gap-4 transition-transform duration-300 hover:scale-105 hover:bg-gray-100 p-2 rounded-lg">
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
                <h2 className="text-xl font-bold font-geist text-gray-900">
                  {post.author?.name}
                </h2>
                <p className="text-gray-600 font-geist">{post.author?.title}</p>
              </div>
            </div>
          </Link>
          <BackButton currentPage="blog" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.categories.map((category) => (
            <span
              key={category._id}
              className="bg-gray-200 px-4 py-1.5 rounded-full text-sm font-geist font-semibold text-gray-900"
            >
              {category.title}
            </span>
          ))}
        </div>

        {/* Post Content */}
        <div className="prose prose-invert prose-lg max-w-none font-geist">
          <Portable post={post} />
        </div>
      </div>

      {/* Post Recommendations */}
      <PostRecommendations
        currentPost={{
          _id: post._id,
          author: post.author,
          categories: post.categories,
        }}
      />
    </article>
  );
}
