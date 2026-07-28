'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { searchArticles } from '@/lib/api'
import { Article } from '@/types'
import NewsCard from '@/components/ui/NewsCard'
import styles from './page.module.scss'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')
      
      try {
        const searchResults = await searchArticles(query)
        setResults(searchResults)
      } catch (err) {
        setError('حدث خطأ أثناء البحث. الرجاء المحاولة مرة أخرى.')
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query])

  return (
    <div className={styles['search-page']}>
      <div className={styles['search-page-container']}>
        {/* Search Header */}
        <div className={styles['search-page-header']}>
          <h1>نتائج البحث</h1>
          <p>
            {query ? `عنوان البحث: "${query}"` : 'الرجاء إدخال مصطلح بحث'}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles['search-page-loading']}>
            <div className="spinner"></div>
            <p>جاري البحث...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className={styles['search-page-error']}>
            <h3>حدث خطأ</h3>
            <p>{error}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && results.length === 0 && query && (
          <div className={styles['search-page-empty']}>
            <h3>لم يتم العثور على نتائج</h3>
            <p>لم يتم العثور على مقالات تطابق بحثك. حاول استخدام كلمات مختلفة.</p>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && results.length > 0 && (
          <div>
            <div className={styles['search-page-header']}>
              <p>
                تم العثور على <span>{results.length}</span> نتيجة
              </p>
            </div>
            
            <div className={styles['search-page-grid']}>
              {results.map((article) => (
                <NewsCard key={article.id} article={article} size="medium" />
              ))}
            </div>
          </div>
        )}

        {/* Empty Search */}
        {!loading && !error && !query && (
          <div className={styles['search-page-empty']}>
            <h3>ابحث عن الأخبار</h3>
            <p>استخدم مربع البحث في أعلى الصفحة للبحث عن المقالات بالعنوان أو المحتوى.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className={styles['search-page']}><div className={styles['search-page-loading']}><div className="spinner"></div><p>جاري التحميل...</p></div></div>}>
      <SearchContent />
    </Suspense>
  )
}