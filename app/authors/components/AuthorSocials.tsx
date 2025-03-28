import { Twitter, Linkedin, Github, Instagram } from "lucide-react";

interface AuthorSocialsProps {
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
};

export default function AuthorSocials({ socials }: AuthorSocialsProps) {
  return (
    <div className="flex gap-6 justify-center md:justify-start">
      {Object.entries(socials).map(([platform, url]) => {
        if (!url) return null;

        const Icon = socialIcons[platform as keyof typeof socialIcons];

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
            title={`Visit ${platform}`}
          >
            <Icon className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
}
