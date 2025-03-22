import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/blog/*", "/authors", "/authors/*"],
        disallow: ["/studio", "/studio/*", "/api/*", "/_next/*", "/static/*"],
      },
    ],
    sitemap: "https://ernyg.com/sitemap.xml", // Your sitemap URL
    host: "https://ernyg.com",
  };
}
