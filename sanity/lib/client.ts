import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import { QueryParams } from "sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = process.env.NODE_ENV === "development" ? 10 : 60 * 5, // default revalidation time in seconds
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}
