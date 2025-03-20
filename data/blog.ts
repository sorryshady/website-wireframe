export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  position: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  categories: string[];
  author: Author;
  readTime: string;
  image: string;
}

export const authors: Author[] = [
  {
    id: "1",
    name: "John Doe",
    position: "Lead Designer",
    image: "/blog/authors/john-doe.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Senior Developer",
    image: "/blog/authors/jane-smith.jpg",
  },
  {
    id: "3",
    name: "Mike Johnson",
    position: "UI/UX Designer",
    image: "/blog/authors/mike-johnson.jpg",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    position: "Tech Lead",
    image: "/blog/authors/sarah-wilson.jpg",
  },
];

export const categories: Category[] = [
  {
    id: "all",
    name: "All",
    description: "All articles",
  },
  {
    id: "design",
    name: "Design",
    description: "Articles about UI/UX and web design",
  },
  {
    id: "development",
    name: "Development",
    description: "Articles about web development and programming",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Design: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the future of web design, from AI integration to immersive experiences.",
    content: "Full content here...",
    date: "2024-03-15",
    categories: ["Design", "Development"],
    author: authors[0],
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    title: "Building Performant React Applications",
    excerpt:
      "Learn the best practices and techniques for creating high-performance React applications.",
    content: "Full content here...",
    date: "2024-03-10",
    categories: ["Development"],
    author: authors[1],
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    title: "The Art of Minimalist UI Design",
    excerpt:
      "Discover how minimalist design principles can create powerful and effective user interfaces.",
    content: "Full content here...",
    date: "2024-03-05",
    categories: ["Design"],
    author: authors[2],
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    title: "TypeScript Best Practices for 2024",
    excerpt:
      "A comprehensive guide to writing better TypeScript code with modern best practices.",
    content: "Full content here...",
    date: "2024-03-01",
    categories: ["Development"],
    author: authors[3],
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
