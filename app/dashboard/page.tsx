'use client'

import { getLatestArticles } from '@/lib/api'
import { Article } from '@/types'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './page.module.scss'

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLatestArticles().then((data: Article[]) => {
      setArticles(data)
      setLoading(false)
    })
  }, [])

  const handleDelete = (id: number | string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      // Delete functionality would be implemented here
      // TODO: Implement delete functionality with API call
    }
  }

  if (loading) {
    return (
      <div className={styles['dashboard-page']}>
        <div className={styles['dashboard-page-container']}>
          <div className={styles['dashboard-page-loading']}>
            <div className="spinner"></div>
            <p>جاري تحميل البيانات...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles['dashboard-page']}>
      <div className={styles['dashboard-page-container']}>
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-600 mt-1">إدارة المقالات والأخبار</p>
          </div>
          <Link
            href="/dashboard/new"
            className="btn btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            مقال جديد
          </Link>
        </div>

        {/* Stats Cards */}
        <div className={styles['dashboard-page-grid']}>
          <div className={styles['dashboard-page-card']}>
            <div className={styles['dashboard-page-card-value']}>{articles.length}</div>
            <div className={styles['dashboard-page-card-label']}>إجمالي المقالات</div>
            <div className={styles['dashboard-page-card-icon']}>📄</div>
          </div>
          <div className={styles['dashboard-page-card']}>
            <div className={styles['dashboard-page-card-value']}>
              {articles.filter(a => a.isFeatured).length}
            </div>
            <div className={styles['dashboard-page-card-label']}>مقالات مميزة</div>
            <div className={styles['dashboard-page-card-icon']}>⭐</div>
          </div>
          <div className={styles['dashboard-page-card']}>
            <div className={styles['dashboard-page-card-value']}>
              {articles.filter(a => a.isBreaking).length}
            </div>
            <div className={styles['dashboard-page-card-label']}>أخبار عاجلة</div>
            <div className={styles['dashboard-page-card-icon']}>🚨</div>
          </div>
          <div className={styles['dashboard-page-card']}>
            <div className={styles['dashboard-page-card-value']}>
              {articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
            </div>
            <div className={styles['dashboard-page-card-label']}>إجمالي المشاهدات</div>
            <div className={styles['dashboard-page-card-icon']}>👁️</div>
          </div>
        </div>

        {/* Articles List */}
        <div className={styles['dashboard-page-section']}>
          <h3>أحدث المقالات</h3>
          
          {articles.length === 0 ? (
            <div className={styles['dashboard-page-empty']}>
              <h3>لا توجد مقالات</h3>
              <p>ابدأ بإضافة مقال جديد للبدء في إدارة المحتوى</p>
              <Link href="/dashboard/new" className="btn btn-primary">
                إضافة مقال جديد
              </Link>
            </div>
          ) : (
            <div className={styles['dashboard-page-list']}>
              {articles.map((article) => (
                <div key={article.id} className={styles['dashboard-page-list-item']}>
                  <div className={styles['dashboard-page-list-item-info']}>
                    <div className={styles['dashboard-page-list-item-title']}>
                      {article.title}
                    </div>
                    <div className={styles['dashboard-page-list-item-meta']}>
                      {article.category.name} • {article.views} مشاهدات • {new Date(article.publishedAt).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                  <div className={styles['dashboard-page-list-item-actions']}>
                    <Link
                      href={`/article/${article.slug}`}
                      className="btn btn-outline"
                    >
                      عرض
                    </Link>
                    <Link
                      href={`/dashboard/edit/${article.id}`}
                      className="btn btn-outline"
                    >
                      تعديل
                    </Link>
                    <button
                      className="btn btn-outline"
                      onClick={() => handleDelete(article.id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={styles['dashboard-page-section']}>
            <h3>إدارة المحتوى</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/categories" className="text-gray-600 hover:text-primary transition-colors">
                  إدارة الأقسام
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tags" className="text-gray-600 hover:text-primary transition-colors">
                  إدارة الوسوم
                </Link>
              </li>
              <li>
                <Link href="/dashboard/media" className="text-gray-600 hover:text-primary transition-colors">
                  الملفات الوسائط
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles['dashboard-page-section']}>
            <h3>إدارة المستخدمين</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/users" className="text-gray-600 hover:text-primary transition-colors">
                  قائمة المستخدمين
                </Link>
              </li>
              <li>
                <Link href="/dashboard/roles" className="text-gray-600 hover:text-primary transition-colors">
                  الصلاحيات والأدوار
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles['dashboard-page-section']}>
            <h3>الإعدادات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/settings" className="text-gray-600 hover:text-primary transition-colors">
                  إعدادات الموقع
                </Link>
              </li>
              <li>
                <Link href="/dashboard/analytics" className="text-gray-600 hover:text-primary transition-colors">
                  التحليلات والإحصائيات
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}