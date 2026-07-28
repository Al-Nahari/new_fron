'use client'
import { useState, useEffect } from 'react'
import { getLatestArticles } from '@/lib/api'
import { Article } from '@/types'
import styles from './NewsGrid.module.scss'

const OpinionSection = () => {
  const [showAll, setShowAll] = useState(false)
  const [opinions, setOpinions] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const articles = await getLatestArticles()
        // Use articles as opinion pieces
        const opinionArticles = articles.slice(0, 6)
        setOpinions(opinionArticles)
      } catch (error) {
        console.error('Error fetching opinion articles:', error)
        setOpinions([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchOpinions()
  }, [])

  const displayedOpinions = showAll ? opinions : opinions.slice(0, 3)

  if (loading) {
    return (
      <div className={styles['opinion-section']}>
        <div className={styles['opinion-section-container']}>
          <div className={styles['section-loading']}>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    )
  }

  if (opinions.length === 0) {
    return null
  }

  return (
    <div className={styles['opinion-section']}>
      <div className={styles['opinion-section-container']}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={styles['opinion-section-title']}>الرأي والتحليل</h2>
          
          {opinions.length > 3 && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline"
            >
              {showAll ? 'عرض أقل ←' : 'عرض الكل →'}
            </button>
          )}
        </div>
        
        <div className={styles['opinion-section-content']}>
          {displayedOpinions.map((opinion) => (
            <div key={opinion.id} className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-all duration-300 border-l-4 border-primary">
              <h3 className="font-bold text-lg mb-3 text-gray-800 hover:text-primary transition-colors line-clamp-2">
                {opinion.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {opinion.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{opinion.author.name}</div>
                  <div className="text-xs text-gray-500">{opinion.author.bio}</div>
                </div>
                
                <div className="text-xs text-gray-400">
                  {new Date(opinion.publishedAt).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OpinionSection