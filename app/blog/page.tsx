import { POSTS_QUERY } from "@/sanity/lib/queries";

import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERYResult } from "@/sanity/types";

export default async function BlogPage() {
  const blogs = await sanityFetch<POSTS_QUERYResult>({ query: POSTS_QUERY });
  return <div>BlogPage</div>;
}
