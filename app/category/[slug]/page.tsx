import { notFound } from 'next/navigation'
import { getArticlesByCategory, getCategories } from '@/lib/api'
import NewsCard from '@/components/ui/NewsCard'
import styles from './page.module.scss'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(c => c.slug === slug)
  
  if (!category) {
    return {
      title: 'الفئة غير موجودة'
    }
  }

  return {
    title: `${category.name} - أخبار`,
    description: `أحدث الأخبار في قسم ${category.name}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(c => c.slug === slug)
  
  if (!category) {
    notFound()
  }

  const articles = await getArticlesByCategory(slug)

  return (
    <div className={styles['category-page']}>
      <div className={styles['category-page-container']}>
        {/* Category Header */}
        <div className={styles['category-page-header']}>
          <div className="flex items-center gap-3 mb-2">
            <span 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color }}
            ></span>
            <h1>
              {category.name}
            </h1>
          </div>
          <p>
            أحدث الأخبار والتحليلات في قسم {category.name}
          </p>
        </div>

        {/* Articles List */}
        {articles.length === 0 ? (
          <div className={styles['category-page-empty']}>
            <h3>لا توجد أخبار في هذه الفئة</h3>
            <p>سيتم نشر المقالات قريبًا في قسم {category.name}</p>
          </div>
        ) : (
          <div className={styles['category-page-grid']}>
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} size="medium" />
            ))}
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">تصفح الأقسام الأخرى</h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter(c => c.slug !== slug)
              .map((cat) => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  {cat.name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}