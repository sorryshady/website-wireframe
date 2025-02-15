import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ernyg.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ernyg.com/favicon.ico",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
