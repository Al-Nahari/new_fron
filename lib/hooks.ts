'use client'

import { useState, useEffect } from 'react';
import { 
  getLatestArticles, 
  getArticleBySlug, 
  getCategories, 
  searchArticles,
  incrementViews,
  incrementLikes,
  getBreakingNews,
  getFeaturedArticles,
  getStats,
  getArticlesByCategory
} from './api';
import { Article, Category, Stats } from '@/types';

// Hook لجلب المقالات
export function useArticles(filters?: any) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, [JSON.stringify(filters)]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLatestArticles();
      setArticles(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load articles');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  return { articles, loading, error, refetch: loadArticles };
}

// Hook لجلب مقال واحد
export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticleBySlug(slug);
      if (data) {
        setArticle(data);
        // زيادة المشاهدات تلقائياً
        await incrementViews(data.id);
      } else {
        setError('Article not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load article');
      console.error('Error loading article:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (article?.id) {
      try {
        const newLikes = await incrementLikes(article.id);
        setArticle(prev => prev ? { ...prev, likes: newLikes } : null);
      } catch (err) {
        console.error('Error incrementing likes:', err);
      }
    }
  };

  return { article, loading, error, handleLike, refetch: loadArticle };
}

// Hook لجلب التصنيفات
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load categories');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: loadCategories };
}

// Hook للبحث
export function useSearch(query: string) {
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setError(null);
    }
  }, [query]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchArticles(query);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, refetch: performSearch };
}

// Hook لجلب الأخبار العاجلة
export function useBreakingNews() {
  const [breaking, setBreaking] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBreakingNews();
  }, []);

  const loadBreakingNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBreakingNews();
      setBreaking(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load breaking news');
      console.error('Error loading breaking news:', err);
    } finally {
      setLoading(false);
    }
  };

  return { breaking, loading, error, refetch: loadBreakingNews };
}

// Hook لجلب المقالات المميزة
export function useFeaturedArticles() {
  const [featured, setFeatured] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeaturedArticles();
  }, []);

  const loadFeaturedArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFeaturedArticles();
      setFeatured(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load featured articles');
      console.error('Error loading featured articles:', err);
    } finally {
      setLoading(false);
    }
  };

  return { featured, loading, error, refetch: loadFeaturedArticles };
}

// Hook لجلب الإحصائيات
export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load stats');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch: loadStats };
}

// Hook لجلب المقالات حسب التصنيف
export function useArticlesByCategory(categorySlug: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (categorySlug) {
      loadArticlesByCategory();
    }
  }, [categorySlug]);

  const loadArticlesByCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticlesByCategory(categorySlug);
      setArticles(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load articles');
      console.error('Error loading articles by category:', err);
    } finally {
      setLoading(false);
    }
  };

  return { articles, loading, error, refetch: loadArticlesByCategory };
}

// Hook for optimistic updates
export function useOptimisticArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await getLatestArticles();
      setArticles(data);
    } finally {
      setLoading(false);
    }
  };

  const optimisticUpdate = (updater: (prev: Article[]) => Article[]) => {
    setArticles(prev => updater(prev));
  };

  return { articles, loading, optimisticUpdate, refetch: loadArticles };
}

// Hook for real-time updates simulation
export function useLiveUpdates(interval = 30000) {
  const [data, setData] = useState<Article[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getLatestArticles();
        setData(articles);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Live update failed:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Interval updates
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return { data, lastUpdate, forceUpdate: () => setLastUpdate(new Date()) };
}