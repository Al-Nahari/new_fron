import { getBreakingNews } from '@/lib/api'
import NewsCard from '@/components/ui/NewsCard'
import styles from './page.module.scss'

export default async function BreakingPage() {
  const breakingNews = await getBreakingNews()

  return (
    <div className={styles['breaking-page']}>
      <div className={styles['breaking-page-container']}>
        <div className={styles['breaking-page-header']}>
          <h1>الأخبار العاجلة</h1>
          <span className={styles['breaking-page-header-badge']}>عاجل</span>
        </div>

        {breakingNews.length === 0 ? (
          <div className={styles['breaking-page-empty']}>
            <h3>لا توجد أخبار عاجلة حالياً</h3>
            <p>ستصلكم الأخبار العاجلة فور حدوثها</p>
          </div>
        ) : (
          <div className={styles['breaking-page-grid']}>
            {breakingNews.map((article) => (
              <NewsCard key={article.id} article={article} size="medium" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}