import Image from 'next/image'
import { Article } from '@/types'
import CategoryBadge from '@/components/ui/CategoryBadge'
import Link from 'next/link'

interface HeroSectionProps {
  featuredArticle: Article
}

const HeroSection = ({ featuredArticle }: HeroSectionProps) => {
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect width="800" height="500" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="20"%3Eصورة مميزة%3C/text%3E%3C/svg%3E'

  // Calculate time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return `منذ ${diffMinutes} دقيقة`
    } else if (diffHours < 24) {
      return `منذ ${diffHours} ساعة`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return `منذ ${diffDays} يوم`
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Featured Article */}
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
          <div className="relative h-[500px]">
            <Image
              src={featuredArticle.featuredImage || placeholderImage}
              alt={featuredArticle.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 gradient-overlay" />
            
            <div className="absolute bottom-0 right-0 left-0 p-8">
              <div className="flex items-center mb-4 gap-3 flex-wrap">
                {featuredArticle.isBreaking && (
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    عاجل
                  </span>
                )}
                <CategoryBadge category={featuredArticle.category} />
                <span className="text-sm text-white opacity-90">
                  {getTimeAgo(featuredArticle.publishedAt)}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight line-clamp-2">
                {featuredArticle.title}
              </h2>
              
              <p className="text-lg text-gray-200 mb-6 line-clamp-2 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white">
                    <Image
                      src={featuredArticle.author.avatar || placeholderImage}
                      alt={featuredArticle.author.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="mr-4">
                    <p className="font-medium text-white">{featuredArticle.author.name}</p>
                    <p className="text-sm opacity-80 text-gray-200 line-clamp-1">
                      {featuredArticle.author.bio}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-200">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    قراءة {featuredArticle.readingTime} دقائق
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Top News */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold border-r-4 border-primary pr-3">
          أهم الأخبار
        </h3>
        
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Link href="/article/example" key={i}>
              <div
                className="bg-white rounded-xl shadow-card p-4 border-r-4 border-primary hover:border-primary-dark hover:shadow-card-hover transition-all duration-300 cursor-pointer"
              >
                <h4 className="font-bold text-lg mb-2 text-gray-800 hover:text-primary transition-colors line-clamp-2">
                  تقرير: نمو الاقتصاد الوطني بنسبة 4.5% خلال الربع الأول من عام 2024
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  أظهرت بيانات رسمية نمواً إيجابياً في الاقتصاد خلال الأشهر الأولى من العام الجاري، مع تحسن ملحوظ في مؤشرات الإنتاج والاستهلاك.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      منذ 3 ساعات
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSection