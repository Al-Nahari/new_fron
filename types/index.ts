export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: Author;
  category: Category;
  tags: Tag[];
  isBreaking: boolean;
  isFeatured: boolean;
  views: number;
  likes: number;
  comments: number;
  readingTime: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon: string;
  articleCount?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface BreakingNews {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: Category;
  author: Author;
  views: number;
  likes: number;
  publishedAt: string;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  preferences?: string[];
}

export interface Stats {
  totalArticles: number;
  totalAuthors: number;
  totalCategories: number;
  totalTags: number;
  breakingNews: number;
  featuredArticles: number;
  totalViews: number;
  totalLikes: number;
  topArticles: Array<{
    id: number;
    title: string;
    views: number;
  }>;
  articlesByCategory: Array<{
    slug: string;
    name: string;
    articleCount: number;
  }>;
}

export interface ApiResponse<T> {
  data?: T;
  articles?: T[];
  message?: string;
  error?: string;
  success?: boolean;
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export interface ArticleInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: number;
  category: number;
  tags: number[];
  isBreaking: boolean;
  isFeatured: boolean;
  readingTime: number;
  publishedAt: string;
}

export interface SearchFilters {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface InteractionResponse {
  success: boolean;
  views?: number;
  likes?: number;
  message?: string;
}