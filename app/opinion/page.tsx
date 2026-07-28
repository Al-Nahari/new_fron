import { getLatestArticles } from '@/lib/api'
import NewsCard from '@/components/ui/NewsCard'
import styles from './page.module.scss'

export default async function OpinionPage() {
  const articles = await getLatestArticles()

  return (
    <div className={styles['opinion-page']}>
      <div className={styles['opinion-page-container']}>
        <div className={styles['opinion-page-header']}>
          <h1>الرأي والتحليل</h1>
          <span className={styles['opinion-page-header-badge']}>رأي</span>
        </div>

        {articles.length === 0 ? (
          <div className={styles['opinion-page-empty']}>
            <h3>لا توجد مقالات حالياً</h3>
            <p>سيتم إضافة مقالات الرأي والتحليل قريباً</p>
          </div>
        ) : (
          <div className={styles['opinion-page-grid']}>
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} size="medium" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}