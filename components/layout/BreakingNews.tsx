'use client'
import { useState, useEffect } from 'react'
import { getBreakingNews } from '@/lib/api'
import Link from 'next/link'
import styles from './BreakingNews.module.scss'

type NewsArticle = {
  id: string | number
  title: string
  slug: string
  [key: string]: any
}

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        setLoading(true)
        const articles = await getBreakingNews()
        // Limit to 5 articles for better performance
        setBreakingNews(articles.slice(0, 5))
        setError(null)
      } catch (err) {
        setError('Failed to load breaking news')
        console.error('Error fetching breaking news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBreakingNews()
  }, [])

  useEffect(() => {
    if (breakingNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % breakingNews.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [breakingNews.length])

  if (loading) {
    return (
      <div className={styles['breaking-news']}>
        <div className={styles['breaking-news-container']}>
          <div className={styles['breaking-news-loading']}>
            <div className="spinner"></div>
            <span className={styles['breaking-news-label']}>جاري تحميل الأخبار العاجلة...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles['breaking-news']}>
        <div className={styles['breaking-news-container']}>
          <div className={styles['breaking-news-error']}>
            <span>حدث خطأ في تحميل الأخبار العاجلة</span>
          </div>
        </div>
      </div>
    )
  }

  if (breakingNews.length === 0) {
    return null
  }

  const currentNews = breakingNews[currentSlide]

  return (
    <div className={styles['breaking-news']}>
      <div className={styles['breaking-news-container']}>
        <div className={styles['breaking-news-label']}>
          <div className="spinner"></div>
          <span>عاجل</span>
        </div>
        
        <div className={styles['breaking-news-ticker']}>
          <div
            className={styles['breaking-news-content']}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {breakingNews.map((news) => (
              <div key={news.id} className={styles['breaking-news-item']}>
                <Link 
                  href={`/article/${news.slug}`}
                >
                  {news.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {breakingNews.length > 1 && (
          <div className="flex items-center gap-1 shrink-0">
            {breakingNews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BreakingNews