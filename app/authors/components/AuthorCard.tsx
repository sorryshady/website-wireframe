"use client";
import { Author } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin, Instagram, Twitter, Github } from "lucide-react";
import { PortableText } from "next-sanity";

interface SocialLinksPreviewProps {
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
} as const;

// Consistent order of social platforms
const socialOrder = ["instagram", "linkedin", "twitter", "github"] as const;

function SocialLinksPreview({ social }: SocialLinksPreviewProps) {
  const handleSocialClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string,
  ) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Filter out platforms that don't have URLs and get their URLs
  const availableSocials = socialOrder
    .map((platform) => ({ platform, url: social[platform] }))
    .filter(
      (item): item is { platform: (typeof socialOrder)[number]; url: string } =>
        Boolean(item.url),
    );

  return (
    <div
      className="flex justify-between w-full"
      onClick={(e) => e.preventDefault()}
    >
      {availableSocials.map(({ platform, url }) => {
        const Icon = socialIcons[platform];
        return (
          <button
            key={platform}
            onClick={(e) => handleSocialClick(e, url)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label={`Visit ${platform}`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link
      href={`/authors/${author.slug?.current}`}
      className="block group h-full"
    >
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-500 h-full flex flex-col">
        <div className="aspect-[3/2] relative bg-gray-100 overflow-hidden flex-shrink-0">
          {author.image?.asset && (
            <Image
              src={urlFor(author.image.asset).width(600).height(400).url()}
              alt={author.name || ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold font-geist text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {author.name}
            </h2>
            <p className="text-gray-600 font-geist mb-4">{author.title}</p>

            {/* Bio Preview */}
            {author.bio && (
              <div className="text-gray-600 text-sm font-geist line-clamp-2 mb-6">
                <PortableText value={author.bio} />
              </div>
            )}
          </div>

          {/* Social Links Preview */}
          <div className="mt-auto">
            {author.contact?.social && (
              <div className="mb-6">
                <SocialLinksPreview social={author.contact.social} />
              </div>
            )}

            {/* View Profile Link */}
            <div className="inline-flex items-center text-sm font-semibold font-geist text-gray-900 group-hover:text-gray-700">
              View Profile
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 duration-500" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
