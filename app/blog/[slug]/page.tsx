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
      <div className="relative h-[40vh] md:h-[50vh] w-full">
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
        <div className="flex justify-end mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white font-mont text-sm"
          >
            <ArrowLeft className="w-3 h-3" />
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
          <PortableText
            value={post.body as unknown as CustomPortableTextBlock[]}
            components={{
              block: {
                h1: ({ children }) => <H1>{children}</H1>,
                h2: ({ children }) => <H2>{children}</H2>,
                h3: ({ children }) => <H3>{children}</H3>,
                h4: ({ children }) => <H4>{children}</H4>,
                p: ({ children }) => <P>{children}</P>,
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
                hr: () => <hr className="my-8 border-gray-700" />,
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
                        <p className="mt-2 text-center text-sm text-gray-400">
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
                  console.log(value);
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
                  <code className="bg-gray-800 rounded px-1 py-0.5">
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
    </article>
  );
}
