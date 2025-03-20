// ./scripts/createData.ts

// Create 2 batches of 10 posts with references to one of 5 categories and 3 authors

import { faker } from "@faker-js/faker";
import { htmlToBlocks } from "@portabletext/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import type { FieldDefinition, SanityDocumentLike } from "sanity";
import { getCliClient } from "sanity/cli";

import { schema } from "./sanity/schemaTypes";

const client = getCliClient();
const POST_COUNT = 10;
const CATEGORY_COUNT = 5;
const AUTHOR_COUNT = 3;
const BATCHES_COUNT = 2;
const args = process.argv.slice(2);
const batchesArg = args
  .find((arg) => arg.startsWith("batches="))
  ?.split("=")[1];
const batches = batchesArg ? parseInt(batchesArg) : BATCHES_COUNT;
const limit = pLimit(1);

const defaultSchema = Schema.compile({ types: schema.types });
const blockContentSchema = defaultSchema
  .get("post")
  .fields.find((field: FieldDefinition) => field.name === "body").type;

// Create 2-5 paragraphs of fake block content
function createFakeBlockContent() {
  const html = Array.from({ length: faker.number.int({ min: 2, max: 5 }) })
    .map(() => `<p>${faker.lorem.paragraph({ min: 2, max: 5 })}</p>`)
    .join("");
  return htmlToBlocks(html, blockContentSchema, {
    parseHtml: (htmlContent: string) => new JSDOM(htmlContent).window.document,
  });
}

async function createData() {
  console.log("Create new data with...");
  console.log(`Project ID: ${client.config().projectId}`);
  console.log(`Dataset: ${client.config().dataset}`);

  console.log("Deleting previously faked posts, categories, and authors...");
  await client.delete({
    query: '*[_type in ["post", "category", "author"] && fake == true]',
  });

  // Create authors
  const authors: SanityDocumentLike[] = [];
  const authorTransaction = client.transaction();

  for (let authorI = 0; authorI < AUTHOR_COUNT; authorI++) {
    const name = faker.person.fullName();
    const imageUrl = faker.image.avatar();
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const imageAsset = await client.assets.upload(
      "image",
      Buffer.from(imageBuffer),
      {
        contentType: imageResponse.headers.get("content-type") || "image/jpeg",
      },
    );

    authors.push({
      _type: "author",
      _id: faker.string.uuid(),
      name,
      title: faker.person.jobTitle(),
      slug: {
        _type: "slug",
        current: faker.helpers.slugify(name).toLowerCase(),
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
      contact: {
        email: faker.internet.email({ firstName: name.split(" ")[0] }),
        website: faker.internet.url(),
        social: {
          twitter: faker.internet.url({ protocol: "https" }),
          linkedin: faker.internet.url({ protocol: "https" }),
          github: faker.internet.url({ protocol: "https" }),
          instagram: faker.internet.url({ protocol: "https" }),
        },
      },
      bio: createFakeBlockContent(),
      fake: true,
    });
  }

  for (const author of authors) {
    authorTransaction.create(author);
  }

  const authorsBatch = limit(async () => {
    return authorTransaction
      .commit()
      .then(() => {
        console.log(`Created ${AUTHOR_COUNT} authors`);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  // Create categories
  const categories: SanityDocumentLike[] = [];
  const categoriesTransaction = client.transaction();

  for (let categoryI = 0; categoryI < CATEGORY_COUNT; categoryI++) {
    categories.push({
      _type: "category",
      _id: faker.string.uuid(),
      title: faker.company.catchPhraseAdjective(),
      description: faker.lorem.sentence(),
      fake: true,
    });
  }

  for (const category of categories) {
    categoriesTransaction.create(category);
  }

  const categoriesBatch = limit(async () => {
    return categoriesTransaction
      .commit()
      .then(() => {
        console.log(`Created ${CATEGORY_COUNT} categories`);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  console.log(`Preparing ${batches} batches of ${POST_COUNT} posts...`);

  const postsBatches = Array.from({ length: batches }).map((_, batchIndex) => {
    limit(async () => {
      const posts: SanityDocumentLike[] = [];

      for (let postI = 0; postI < POST_COUNT; postI++) {
        const imageUrl = faker.image.urlPicsumPhotos({
          width: 800,
          height: 600,
        });
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageAsset = await client.assets.upload(
          "image",
          Buffer.from(imageBuffer),
          {
            contentType:
              imageResponse.headers.get("content-type") || "image/jpeg",
          },
        );

        // Randomly select 1-3 categories for the post
        const postCategories = Array.from(
          { length: faker.number.int({ min: 1, max: 3 }) },
          () => ({
            _type: "reference",
            _ref: categories[Math.floor(Math.random() * CATEGORY_COUNT)]._id,
          }),
        );

        posts.push({
          _type: "post",
          _id: faker.string.uuid(),
          title: faker.company.catchPhrase(),
          slug: {
            _type: "slug",
            current: faker.helpers
              .slugify(faker.company.catchPhrase())
              .toLowerCase(),
          },
          author: {
            _type: "reference",
            _ref: authors[Math.floor(Math.random() * AUTHOR_COUNT)]._id,
          },
          mainImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          },
          categories: postCategories,
          publishedAt: faker.date.past().toISOString(),
          excerpt: faker.lorem.paragraph(),
          body: createFakeBlockContent(),
          fake: true,
        });
      }

      const postTransaction = client.transaction();

      for (const post of posts) {
        postTransaction.create(post);
      }

      return postTransaction
        .commit()
        .then(() => {
          console.log(`Post batch ${batchIndex + 1} Complete`);

          if (limit.pendingCount === 0) {
            console.log("All batches complete!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });

  await Promise.all([authorsBatch, categoriesBatch, ...postsBatches]);
}

createData();
