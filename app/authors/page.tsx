import { sanityFetch } from "@/sanity/lib/client";
import { Author } from "@/sanity/types";
import AuthorCard from "./components/AuthorCard";

const AUTHORS_QUERY = `*[_type == "author"] {
  _id,
  name,
  title,
  slug,
  image,
  bio,
  contact
}`;

export default async function AuthorsPage() {
  const authors = await sanityFetch<Author[]>({ query: AUTHORS_QUERY });

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-geist text-gray-900 mb-4">
            Our Authors
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our team of content creators and experts sharing their
            knowledge and experiences
          </p>
        </header>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <AuthorCard key={author._id} author={author} />
          ))}
        </div>
      </div>
    </main>
  );
}
