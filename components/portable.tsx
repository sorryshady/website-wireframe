import { PortableText, PortableTextBlock } from "@portabletext/react";
import React from "react";
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
import { Post } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { CodeBlock } from "@/app/blog/components/portable-text/code-block";
import Image from "next/image";
import { Callout } from "@/app/blog/components/portable-text/callout";
import { Embed } from "@/app/blog/components/portable-text/embed";
import { Tabs } from "@/app/blog/components/portable-text/tabs";
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
const Portable = ({
  post,
  content,
}: {
  post?: Post;
  content?: PortableTextBlock[];
}) => {
  return (
    <PortableText
      value={content || (post?.body as unknown as CustomPortableTextBlock[])}
      components={{
        block: {
          h1: ({ children }) => <H1>{children}</H1>,
          h2: ({ children }) => <H2>{children}</H2>,
          h3: ({ children }) => <H3>{children}</H3>,
          h4: ({ children }) => <H4>{children}</H4>,
          normal: ({ children }) => <P>{children}</P>,
          blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
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
            <code className="bg-gray-200 rounded px-1 py-0.5">{children}</code>
          ),
          strike: ({ children }) => (
            <span className="line-through">{children}</span>
          ),
          highlight: ({ children }) => (
            <span className="bg-yellow-500/20 text-yellow-200">{children}</span>
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
  );
};

export default Portable;
