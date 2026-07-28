'use client'

import { useState, useEffect } from 'react'
import NewsCard from '../ui/NewsCard'
import { Article } from '@/types'
import styles from './NewsGrid.module.scss'

interface NewsGridProps {
  articles: Article[]
  title?: string
  showCategoryFilter?: boolean
  initialLimit?: number
}

const NewsGrid = ({ 
  articles, 
  title = "أحدث الأخبار", 
  showCategoryFilter = true,
  initialLimit = 6 
}: NewsGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([])
  
  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'politics', name: 'السياسة' },
    { id: 'economy', name: 'الاقتصاد' },
    { id: 'sports', name: 'الرياضة' },
    { id: 'technology', name: 'التقنية' },
  ]

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category.slug === selectedCategory)

  // Update displayed articles when filters or showAll change
  useEffect(() => {
    if (showAll) {
      setDisplayedArticles(filteredArticles)
    } else {
      setDisplayedArticles(filteredArticles.slice(0, initialLimit))
    }
  }, [filteredArticles, showAll, initialLimit, selectedCategory])

  // Check if there are more articles to show
  const hasMoreArticles = filteredArticles.length > initialLimit
  const canShowMore = hasMoreArticles && !showAll

  const handleToggleShowMore = () => {
    setShowAll(prev => !prev)
  }

  return (
    <div className={styles['news-grid']}>
      <div className={styles['news-grid-container']}>
        <div className={styles['news-grid-header']}>
          <h2>{title}</h2>
          
          {showCategoryFilter && (
            <div className={styles['news-grid-header-actions']}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setShowAll(false)
                  }}
                  className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {displayedArticles.length === 0 ? (
          <div className={styles['news-grid-empty']}>
            <h3>لا توجد أخبار في هذه الفئة</h3>
            <p>لم يتم العثور على أي مقالات تطابق معايير البحث</p>
          </div>
        ) : (
          <>
            <div className={styles['news-grid-content']}>
              {displayedArticles.map((article) => (
                <NewsCard key={article.id} article={article} size="medium" />
              ))}
            </div>
            
            {/* Show More/Less Buttons */}
            {hasMoreArticles && (
              <div className="text-center mt-8">
                {canShowMore ? (
                  <button
                    onClick={handleToggleShowMore}
                    className="btn btn-primary"
                  >
                    عرض المزيد من الأخبار ({filteredArticles.length - initialLimit})
                  </button>
                ) : (
                  <button
                    onClick={handleToggleShowMore}
                    className="btn btn-outline"
                  >
                    عرض أقل
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NewsGrid
