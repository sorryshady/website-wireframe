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
    <main
      className="min-h-screen bg-gray-50 py-16 scroll-smooth"
      id="authors-page"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="relative pt-16 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 text-center font-mont text-gray-900">
            Our Authors
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 font-mont text-center">
            Meet our team of developers and designers sharing their knowledge
            and experiences.
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
