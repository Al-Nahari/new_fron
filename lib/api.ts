import { Article, Author, Category, Tag, Stats } from '@/types'

// Falls back to the deployed backend so the app works even if the env var
// isn't set on Vercel yet. Still, set NEXT_PUBLIC_API_URL explicitly in
// Vercel Project Settings -> Environment Variables to the same value.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://news-ddd.onrender.com'

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      // Add cache control for better performance
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// ---------------------------------------------------------------------------
// Normalization helpers
// The Django REST endpoints return snake_case fields (featured_image,
// is_breaking, published_at, ...) while the rest of this app is typed in
// camelCase (types/index.ts). These mappers translate one to the other so
// every component can keep using article.featuredImage, article.isBreaking,
// etc. without change.
// ---------------------------------------------------------------------------

function mapAuthor(raw: any): Author {
  if (!raw) return raw
  return {
    id: raw.id,
    name: raw.name,
    avatar: raw.avatar || '',
    bio: raw.bio || '',
    role: raw.role || '',
  }
}

function mapCategory(raw: any): Category {
  if (!raw) return raw
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    color: raw.color,
    icon: raw.icon,
    articleCount: raw.article_count ?? raw.articleCount,
  }
}

function mapTag(raw: any): Tag {
  if (!raw) return raw
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
  }
}

function mapArticle(raw: any): Article {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt,
    content: raw.content,
    featuredImage: raw.featured_image ?? raw.featuredImage,
    author: mapAuthor(raw.author),
    category: mapCategory(raw.category),
    tags: Array.isArray(raw.tags) ? raw.tags.map(mapTag) : [],
    isBreaking: raw.is_breaking ?? raw.isBreaking ?? false,
    isFeatured: raw.is_featured ?? raw.isFeatured ?? false,
    views: raw.views ?? 0,
    likes: raw.likes ?? 0,
    comments: raw.comments ?? 0,
    readingTime: raw.reading_time ?? raw.readingTime ?? 1,
    publishedAt: raw.published_at ?? raw.publishedAt,
    createdAt: raw.created_at ?? raw.createdAt,
    updatedAt: raw.updated_at ?? raw.updatedAt,
  } as Article
}

// REST API Functions
export async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const data = await apiRequest('/api/featured/')
    const list = Array.isArray(data.featured_articles) ? data.featured_articles : []
    return list.map(mapArticle)
  } catch (error) {
    console.error('Error fetching featured articles:', error)
    return []
  }
}

export async function getLatestArticles(): Promise<Article[]> {
  try {
    const data = await apiRequest('/api/news/')
    const list = Array.isArray(data.articles) ? data.articles : []
    return list.map(mapArticle)
  } catch (error) {
    console.error('Error fetching latest articles:', error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await apiRequest(`/api/news/?slug=${encodeURIComponent(slug)}`)
    const list = Array.isArray(data.articles) ? data.articles : []
    return list[0] ? mapArticle(list[0]) : null
  } catch (error) {
    console.error('Error fetching article by slug:', error)
    return null
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    const data = await apiRequest(`/api/news/?category=${encodeURIComponent(categorySlug)}`)
    const list = Array.isArray(data.articles) ? data.articles : []
    return list.map(mapArticle)
  } catch (error) {
    console.error('Error fetching articles by category:', error)
    return []
  }
}

export async function getBreakingNews(): Promise<Article[]> {
  try {
    const data = await apiRequest('/api/breaking/')
    const list = Array.isArray(data.breaking_news) ? data.breaking_news : []
    return list.map(mapArticle)
  } catch (error) {
    console.error('Error fetching breaking news:', error)
    return []
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const data = await apiRequest(`/api/news/?q=${encodeURIComponent(query)}`)
    const list = Array.isArray(data.articles) ? data.articles : []
    return list.map(mapArticle)
  } catch (error) {
    console.error('Error searching articles:', error)
    return []
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiRequest('/api/categories/')
    const list = Array.isArray(data.categories) ? data.categories : []
    return list.map(mapCategory)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const data = await apiRequest('/api/authors/')
    const list = Array.isArray(data.authors) ? data.authors : []
    return list.map(mapAuthor)
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const data = await apiRequest('/api/tags/')
    const list = Array.isArray(data.tags) ? data.tags : []
    return list.map(mapTag)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

// Statistics and Analytics
const emptyStats: Stats = {
  totalArticles: 0,
  totalAuthors: 0,
  totalCategories: 0,
  totalTags: 0,
  breakingNews: 0,
  featuredArticles: 0,
  totalViews: 0,
  totalLikes: 0,
  topArticles: [],
  articlesByCategory: [],
}

export async function getStats(): Promise<Stats> {
  try {
    const data = await apiRequest('/api/stats/')
    const s = data.stats || {}
    return {
      totalArticles: s.total_articles ?? 0,
      totalAuthors: s.total_users ?? 0,
      totalCategories: s.total_categories ?? 0,
      totalTags: s.total_tags ?? 0,
      breakingNews: s.breaking_news ?? 0,
      featuredArticles: s.featured_articles ?? 0,
      totalViews: s.total_views ?? 0,
      totalLikes: s.total_likes ?? 0,
      topArticles: Array.isArray(s.top_articles) ? s.top_articles : [],
      articlesByCategory: Array.isArray(s.articles_by_category)
        ? s.articles_by_category.map((c: any) => ({
            slug: c.slug,
            name: c.name,
            articleCount: c.article_count,
          }))
        : [],
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return emptyStats
  }
}

// Interaction functions
export async function incrementViews(articleId: number): Promise<void> {
  try {
    await apiRequest('/api/views/increment/', {
      method: 'POST',
      body: JSON.stringify({ article_id: articleId }),
    })
  } catch (error) {
    console.error('Error incrementing views:', error)
  }
}

export async function incrementLikes(articleId: number): Promise<number> {
  try {
    const data = await apiRequest('/api/likes/increment/', {
      method: 'POST',
      body: JSON.stringify({ article_id: articleId }),
    })
    return data.likes || 0
  } catch (error) {
    console.error('Error incrementing likes:', error)
    return 0
  }
}


export async function createArticle(articleData: Partial<Article>): Promise<Article | null> {
  try {
    const data = await apiRequest('/api/news/create/', {
      method: 'POST',
      body: JSON.stringify(articleData),
    })
    return data.article ? mapArticle(data.article) : null
  } catch (error) {
    console.error('Error creating article:', error)
    return null
  }
}

export async function updateArticle(id: number, articleData: Partial<Article>): Promise<Article | null> {
  try {
    const data = await apiRequest(`/api/news/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    })
    return data.article ? mapArticle(data.article) : null
  } catch (error) {
    console.error('Error updating article:', error)
    return null
  }
}

export async function deleteArticle(id: number): Promise<boolean> {
  try {
    await apiRequest(`/api/news/${id}/`, {
      method: 'DELETE',
    })
    return true
  } catch (error) {
    console.error('Error deleting article:', error)
    return false
  }
}

// Bulk operations
export async function bulkInsertMockData(): Promise<boolean> {
  try {
    await apiRequest('/api/bulk-insert/', {
      method: 'POST',
    })
    return true
  } catch (error) {
    console.error('Error bulk inserting data:', error)
    return false
  }
}


export async function graphqlQuery(query: string, variables?: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/graphql/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const { data, errors } = await response.json()

    if (errors) {
      throw new Error(errors[0].message)
    }

    return data
  } catch (error) {
    console.error('GraphQL query failed:', error)
    throw error
  }
}

// Example GraphQL queries — field names match the actual backend schema
// (news/graphql/schema.py), which graphene auto-camelCases from Python's
// snake_case resolver names (e.g. all_articles -> allArticles).
export const graphql = {
  getArticles: `
    query GetArticles {
      allArticles {
        id
        title
        slug
        excerpt
        featuredImage
        category {
          name
          color
        }
        author {
          name
          avatar
        }
        views
        likes
        isBreaking
        isFeatured
        readingTime
        publishedAt
      }
    }
  `,

  getArticleBySlug: `
    query GetArticleBySlug($slug: String!) {
      articleBySlug(slug: $slug) {
        id
        title
        slug
        excerpt
        content
        featuredImage
        author {
          id
          name
          avatar
          bio
          role
        }
        category {
          id
          name
          slug
          color
          icon
        }
        tags {
          id
          name
          slug
        }
        isBreaking
        isFeatured
        views
        likes
        comments
        readingTime
        publishedAt
        createdAt
        updatedAt
      }
    }
  `,

  getBreakingNews: `
    query GetBreakingNews {
      breakingArticles {
        id
        title
        slug
        excerpt
        featuredImage
        category {
          name
          color
        }
        author {
          name
        }
        views
        likes
        publishedAt
      }
    }
  `,

  searchArticles: `
    query SearchArticles($query: String!) {
      searchArticles(query: $query) {
        id
        title
        slug
        excerpt
        featuredImage
        category {
          name
          color
        }
        author {
          name
        }
        views
        likes
        publishedAt
      }
    }
  `,

  getCategories: `
    query GetCategories {
      allCategories {
        id
        name
        slug
        color
        icon
      }
    }
  `,

  incrementViews: `
    mutation IncrementViews($articleId: Int!) {
      incrementViews(articleId: $articleId) {
        success
        message
      }
    }
  `,

  incrementLikes: `
    mutation IncrementLikes($articleId: Int!) {
      incrementLikes(articleId: $articleId) {
        success
        message
      }
    }
  `,
}