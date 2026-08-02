'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/types'
import CategoryBadge from './CategoryBadge'
import styles from './NewsCard.module.scss'

interface NewsCardProps {
  article: Article
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'featured' | 'compact'
}

const NewsCard = ({ article, size = 'medium', variant = 'default' }: NewsCardProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(article.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  // Placeholder image for articles without images
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="16"%3Eصورة الخبر%3C/text%3E%3C/svg%3E'

  const cardClass = [
    styles['news-card'],
    styles[`size-${size}`],
    variant === 'featured' ? styles.featured : '',
    variant === 'compact' ? styles.compact : '',
  ].filter(Boolean).join(' ')

  return (
    <Link href={`/article/${article.slug}`}>
      <div className={cardClass}>
        <div className={styles['news-card-image-wrapper']}>
          <div className={styles['news-card-image-container']}>
            <Image
              src={article.featuredImage || placeholderImage}
              alt={article.title}
              fill
              className={styles['news-card-image']}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={false}
            />
            <div className={styles['news-card-image-overlay']} />
            
            <div className={styles['news-card-badge-wrapper']}>
              <CategoryBadge category={article.category} />
            </div>
            
            {article.isBreaking && (
              <span className={styles['news-card-breaking']}>
                عاجل
              </span>
            )}
          </div>
          
          <div className={styles['news-card-content']}>
            <div className={styles['news-card-header']}>
              <h3 className={styles['news-card-title']}>
                {article.title}
              </h3>
            </div>
            
            <p className={styles['news-card-description']}>
              {article.excerpt}
            </p>
            
            <div className={styles['news-card-footer']}>
              <div className={styles['news-card-stats']}>
                <span className={styles['news-card-stat-item']}>
                  <svg className={styles['news-card-stat-icon']} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readingTime} د
                </span>
                
                <button
                  onClick={handleLike}
                  className={styles['news-card-like-btn']}
                >
                  <svg
                    className={`${styles['news-card-like-icon']} ${isLiked ? styles.liked : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {likes}
                </button>
                
                <span className={styles['news-card-stat-item']}>
                  <svg className={styles['news-card-stat-icon']} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {article.views}
                </span>
              </div>
              
              <span className={styles['news-card-date']}>
                {new Date(article.publishedAt).toLocaleDateString('ar-SA', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            {/* Author */}
            <div className={styles['news-card-author']}>
              <div className={styles['news-card-author-avatar']}>
                <Image
                  src={article.author.avatar || placeholderImage}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className={styles['news-card-author-name']}>
                {article.author.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NewsCard