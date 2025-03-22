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
import { ScrollToTop } from "../../../components/scroll-to-top";
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Ul,
  Ol,
} from "@/app/blog/components/typography";
import { Link as TypographyLink } from "@/app/blog/components/link";
import { Tabs } from "@/app/blog/components/portable-text/tabs";
import { Embed } from "@/app/blog/components/portable-text/embed";
import { Callout } from "@/app/blog/components/portable-text/callout";
import { CodeBlock } from "@/app/blog/components/portable-text/code-block";
import PostRecommendations from "../components/post-recommendations";
import BackButton from "../components/back-button";

// Define custom block types
type CustomImageBlock = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
};

type CalloutBlock = {
  _type: "callout";
  type: "info" | "warning" | "success" | "error";
  content: string;
};

type TabsBlock = {
  _type: "tabs";
  tabs: {
    title: string;
    content: PortableTextBlock[];
  }[];
};

type EmbedBlock = {
  _type: "embed";
  url: string;
  type: "youtube" | "twitter" | "github" | "codepen";
};

type CodeBlockType = {
  _type: "code";
  language: string;
  code: string;
  filename?: string;
};

type CustomPortableTextBlock =
  | PortableTextBlock
  | CustomImageBlock
  | CalloutBlock
  | TabsBlock
  | EmbedBlock
  | CodeBlockType;

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
          <PortableText
            value={post.body as unknown as CustomPortableTextBlock[]}
            components={{
              block: {
                h1: ({ children }) => <H1>{children}</H1>,
                h2: ({ children }) => <H2>{children}</H2>,
                h3: ({ children }) => <H3>{children}</H3>,
                h4: ({ children }) => <H4>{children}</H4>,
                normal: ({ children }) => <P>{children}</P>,
                blockquote: ({ children }) => (
                  <Blockquote>{children}</Blockquote>
                ),
                table: ({ children }) => <Table>{children}</Table>,
                thead: ({ children }) => <Thead>{children}</Thead>,
                th: ({ children }) => <Th>{children}</Th>,
                tr: ({ children }) => <Tr>{children}</Tr>,
                tbody: ({ children }) => <Tbody>{children}</Tbody>,
                td: ({ children }) => <Td>{children}</Td>,
                ul: ({ children }) => <Ul>{children}</Ul>,
                ol: ({ children }) => <Ol>{children}</Ol>,
                hr: () => <hr className="my-8 border-gray-400" />,
              },
              types: {
                image: ({ value }) => {
                  const imageValue = value as unknown as CustomImageBlock;
                  const imageUrl = urlFor(imageValue).url();
                  return (
                    <div className="my-8">
                      <div className="relative w-full aspect-video">
                        <Image
                          src={imageUrl}
                          alt={imageValue.alt || "Blog post image"}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      {imageValue.caption && (
                        <p className="mt-2 text-center text-base text-gray-500 font-semibold">
                          {imageValue.caption}
                        </p>
                      )}
                    </div>
                  );
                },
                code: ({ value }) => {
                  const codeValue = value as unknown as CodeBlockType;
                  return (
                    <CodeBlock
                      language={codeValue.language}
                      code={codeValue.code}
                      filename={codeValue.filename}
                    />
                  );
                },
                callout: ({ value }) => {
                  const calloutValue = value as unknown as CalloutBlock;
                  return (
                    <Callout
                      type={calloutValue.type}
                      content={calloutValue.content}
                    />
                  );
                },
                tabs: ({ value }) => {
                  const tabsValue = value as unknown as TabsBlock;
                  return <Tabs tabs={tabsValue.tabs} />;
                },
                embed: ({ value }) => {
                  const embedValue = value as unknown as EmbedBlock;
                  return <Embed url={embedValue.url} type={embedValue.type} />;
                },
              },
              marks: {
                link: ({ children, value }) => {
                  return (
                    <TypographyLink
                      href={value.href}
                      target={value.blank ? "_blank" : undefined}
                      rel={value.blank ? "noopener noreferrer" : undefined}
                    >
                      {children}
                    </TypographyLink>
                  );
                },
                strong: ({ children }) => (
                  <strong className="font-bold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children }) => (
                  <code className="bg-gray-200 rounded px-1 py-0.5">
                    {children}
                  </code>
                ),
                strike: ({ children }) => (
                  <span className="line-through">{children}</span>
                ),
                highlight: ({ children }) => (
                  <span className="bg-yellow-500/20 text-yellow-200">
                    {children}
                  </span>
                ),
              },
              list: {
                bullet: ({ children }) => <Ul>{children}</Ul>,
                number: ({ children }) => <Ol>{children}</Ol>,
                checkbox: ({ children }) => (
                  <Ul className="list-none space-y-2">{children}</Ul>
                ),
              },
            }}
          />
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
