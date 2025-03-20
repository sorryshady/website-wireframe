import { Image as ImageIcon } from "lucide-react";
import { defineType } from "sanity";

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
        { title: "Code Block", value: "code" },
        { title: "Callout", value: "callout" },
        { title: "Divider", value: "hr" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
          {
            title: "Highlight",
            value: "highlight",
            icon: () => <span style={{ fontWeight: "bold" }}>H</span>,
            component: (props) => (
              <span style={{ backgroundColor: "yellow", color: "black" }}>
                {props.children}
              </span>
            ),
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: "link",
            type: "object",
            title: "External link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
              {
                title: "Open in new tab",
                name: "blank",
                description: "Read https://css-tricks.com/use-target_blank/",
                type: "boolean",
              },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [
                  { type: "post" },
                  // other types you may want to link to
                ],
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: "image",
      options: { hotspot: true },
      icon: () => (
        <span style={{ fontWeight: "bold" }}>
          <ImageIcon size={14} />
        </span>
      ),
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Important for SEO and accessibility.",
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional caption for the image.",
        },
      ],
    },
    {
      type: "object",
      name: "callout",
      title: "Callout",
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Warning", value: "warning" },
              { title: "Success", value: "success" },
              { title: "Error", value: "error" },
            ],
          },
        },
        {
          name: "content",
          title: "Content",
          type: "text",
        },
      ],
    },
    {
      type: "object",
      name: "tabs",
      title: "Tabs",
      fields: [
        {
          name: "tabs",
          title: "Tabs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Tab Title",
                  type: "string",
                },
                {
                  name: "content",
                  title: "Tab Content",
                  type: "array",
                  of: [{ type: "block" }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "embed",
      title: "Embed",
      fields: [
        {
          name: "url",
          title: "URL",
          type: "url",
        },
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "YouTube", value: "youtube" },
              { title: "Twitter", value: "twitter" },
              { title: "GitHub", value: "github" },
              { title: "CodePen", value: "codepen" },
            ],
          },
        },
      ],
    },
    {
      type: "object",
      name: "code",
      title: "Code Block",
      fields: [
        {
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Python", value: "python" },
              { title: "Java", value: "java" },
              { title: "C++", value: "cpp" },
              { title: "Ruby", value: "ruby" },
              { title: "PHP", value: "php" },
              { title: "Go", value: "go" },
              { title: "Rust", value: "rust" },
              { title: "Swift", value: "swift" },
              { title: "Kotlin", value: "kotlin" },
              { title: "Shell", value: "shell" },
            ],
          },
        },
        {
          name: "code",
          title: "Code",
          type: "text",
        },
        {
          name: "filename",
          title: "Filename",
          type: "string",
        },
      ],
    },
  ],
});
