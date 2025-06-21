
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  readTime: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
