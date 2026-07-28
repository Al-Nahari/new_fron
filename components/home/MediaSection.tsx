'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getLatestArticles } from '@/lib/api'
import { Article } from '@/types'
import styles from './NewsGrid.module.scss'

const MediaSection = () => {
  const [showAll, setShowAll] = useState(false)
  const [mediaItems, setMediaItems] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchMediaArticles = async () => {
      try {
        const articles = await getLatestArticles()
        // Filter articles that might have media content
        const mediaArticles = articles.slice(0, 6)
        setMediaItems(mediaArticles)
      } catch (error) {
        console.error('Error fetching media articles:', error)
        setMediaItems([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchMediaArticles()
  }, [])

  const displayedItems = showAll ? mediaItems : mediaItems.slice(0, 3)

  if (loading) {
    return (
      <div className={styles['media-section']}>
        <div className={styles['media-section-container']}>
          <div className={styles['section-loading']}>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    )
  }

  if (mediaItems.length === 0) {
    return null
  }

  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250"%3E%3Crect width="400" height="250" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="14"%3Eصورة%3C/text%3E%3C/svg%3E'

  return (
    <div className={styles['media-section']}>
      <div className={styles['media-section-container']}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">الوسائط المرئية</h2>
          
          {mediaItems.length > 3 && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline"
            >
              {showAll ? 'عرض أقل ←' : 'عرض الكل →'}
            </button>
          )}
        </div>
        
        <div className={styles['media-section-grid']}>
          {displayedItems.map((item) => (
            <div key={item.id} className={styles['media-section-item']}>
              <div className={styles['media-section-item-image']}>
                <Image
                  src={item.featuredImage || placeholderImage}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded text-xs font-bold bg-red-600 text-white">
                    فيديو
                  </span>
                </div>
                
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {item.readingTime} دقيقة
                </div>
              </div>
              
              <div className={styles['media-section-item-content']}>
                <h3 className={styles['media-section-item-title']}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MediaSection