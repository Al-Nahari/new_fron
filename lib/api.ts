import { Article, Author, Category, Tag } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

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
      cache: 'no-store'
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

// REST API Functions
export async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const data = await apiRequest('/api/featured/')
    // Ensure we return an array even if data structure is different
    return Array.isArray(data.articles) ? data.articles : (data || [])
  } catch (error) {
    console.error('Error fetching featured articles:', error)
    // Return empty array - no mock data
    return []
  }
}

export async function getLatestArticles(): Promise<Article[]> {
  try {
    const data = await apiRequest('/api/news/')
    // Ensure we return an array even if data structure is different
    return Array.isArray(data.articles) ? data.articles : (data || [])
  } catch (error) {
    console.error('Error fetching latest articles:', error)
    // Return empty array - no mock data
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await apiRequest(`/api/news/?slug=${slug}`)
    return data.articles?.[0] || null
  } catch (error) {
    console.error('Error fetching article by slug:', error)
    return null
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    const data = await apiRequest(`/api/news/?category=${categorySlug}`)
    return Array.isArray(data.articles) ? data.articles : (data || [])
  } catch (error) {
    console.error('Error fetching articles by category:', error)
    // Return empty array - no mock data
    return []
  }
}

export async function getBreakingNews(): Promise<Article[]> {
  try {
    const data = await apiRequest('/api/breaking/')
    return Array.isArray(data.breaking_news) ? data.breaking_news : (data || [])
  } catch (error) {
    console.error('Error fetching breaking news:', error)
    // Return empty array - no mock data
    return []
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const data = await apiRequest(`/api/search/?q=${encodeURIComponent(query)}`)
    return Array.isArray(data.articles) ? data.articles : (data || [])
  } catch (error) {
    console.error('Error searching articles:', error)
    // Return empty array - no mock data
    return []
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiRequest('/api/categories/')
    return Array.isArray(data.categories) ? data.categories : (data || [])
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Return empty array - no mock data
    return []
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const data = await apiRequest('/api/authors/')
    return data.authors || []
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const data = await apiRequest('/api/tags/')
    return data.tags || []
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

// Statistics and Analytics
export async function getStats() {
  try {
    const data = await apiRequest('/api/stats/')
    return data.stats || {}
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {}
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
    return data.article || null
  } catch (error) {
    console.error('Error creating article:', error)
    return null
  }
}

export async function updateArticle(id: number, articleData: Partial<Article>): Promise<Article | null> {
  try {
    const data = await apiRequest(`/api/news/${id}/update/`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    })
    return data.article || null
  } catch (error) {
    console.error('Error updating article:', error)
    return null
  }
}

export async function deleteArticle(id: number): Promise<boolean> {
  try {
    await apiRequest(`/api/news/${id}/delete/`, {
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

// Example GraphQL queries
export const graphql = {
  // Get all articles with minimal data
  getArticles: `
    query GetArticles {
      articles {
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

  // Get article by slug with full details
  getArticleBySlug: `
    query GetArticleBySlug($slug: String!) {
      article(slug: $slug) {
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

  // Get breaking news
  getBreakingNews: `
    query GetBreakingNews {
      breakingNews {
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

  // Search articles
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

  // Get categories with article counts
  getCategories: `
    query GetCategories {
      categories {
        id
        name
        slug
        color
        icon
        articleCount
      }
    }
  `,

  // Get stats
  getStats: `
    query GetStats {
      stats {
        totalArticles
        totalAuthors
        totalCategories
        totalTags
        breakingNews
        featuredArticles
        totalViews
        totalLikes
        topArticles {
          id
          title
          views
        }
        articlesByCategory {
          slug
          name
          articleCount
        }
      }
    }
  `,

  // Increment views mutation
  incrementViews: `
    mutation IncrementViews($articleId: Int!) {
      incrementViews(articleId: $articleId) {
        success
        views
      }
    }
  `,

  // Increment likes mutation
  incrementLikes: `
    mutation IncrementLikes($articleId: Int!) {
      incrementLikes(articleId: $articleId) {
        success
        likes
      }
    }
  `,

  // Create article mutation
  createArticle: `
    mutation CreateArticle($input: ArticleInput!) {
      createArticle(input: $input) {
        success
        article {
          id
          title
          slug
        }
      }
    }
  `,
}
