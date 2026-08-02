import HeroSection from '@/components/home/HeroSection'
import NewsGrid from '@/components/home/NewsGrid'
import MediaSection from '@/components/home/MediaSection'
import OpinionSection from '@/components/home/OpinionSection'
import Newsletter from '@/components/home/Newsletter'
import { getFeaturedArticles, getLatestArticles } from '@/lib/api'
import styles from './page.module.scss'

export default async function Home() {
  try {
    const [featuredArticle, latestArticles] = await Promise.all([
      getFeaturedArticles(),
      getLatestArticles(),
    ])

    // Limit latest articles to 12 for better performance
    const limitedLatestArticles = latestArticles.slice(0, 12)

    return (
      <div className={styles['home-page']}>
        {/* Hero Section with Featured Article */}
        {featuredArticle && featuredArticle.length > 0 && (
          <div className={styles['home-hero']}>
            <HeroSection featuredArticle={featuredArticle[0]} />
          </div>
        )}
        
        {/* Latest News Grid - Limited to 12 articles initially */}
        {limitedLatestArticles && limitedLatestArticles.length > 0 && (
          <NewsGrid 
            articles={limitedLatestArticles} 
            title="أحدث الأخبار" 
            initialLimit={6}
          />
        )}
        
        {/* Media Section */}
        <MediaSection />
        
        {/* Opinion & Analysis */}
        <OpinionSection />
        
        {/* Newsletter */}
        <Newsletter />
      </div>
    )
  } catch (error) {
    console.error('Error loading home page data:', error)
    return (
      <div className={styles['home-page']}>
        <div className={styles['home-page-error']}>
          <h3>حدث خطأ في تحميل البيانات</h3>
          <p>يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }
}