'use client'

import Link from 'next/link'
import { useCategories } from '@/lib/hooks'
import styles from './Footer.module.scss'

const Footer = () => {
  const { categories, loading } = useCategories()

  const links = [
    { name: 'عن حبر', href: '/about' },
    { name: 'اتصل بنا', href: '/contact' },
    { name: 'فريق العمل', href: '/team' },
    { name: 'الإعلانات', href: '/ads' },
    { name: 'الشروط والأحكام', href: '/terms' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
  ]

  const socialLinks = [
    { name: 'تويتر', href: 'https://twitter.com/hbrnews', icon: '𝕏' },
    { name: 'فيسبوك', href: 'https://facebook.com/hbrnews', icon: 'f' },
    { name: 'انستغرام', href: 'https://instagram.com/hbrnews', icon: '📷' },
    { name: 'يوتيوب', href: 'https://youtube.com/hbrnews', icon: '▶' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={`${styles['footer-container']} container`}>
        {/* Main Footer Content */}
        <div className={styles['footer-grid']}>
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">ح</span>
              </div>
              <h3 className="text-2xl font-bold">حبر</h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              يقدم آخر الأخبار المحلية والعالمية بموضوعية ومهنية، 
              مع التحليلات والتقارير المتعمقة.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors text-sm"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className={styles['footer-section-title']}>
              الأقسام
            </h4>
            <ul className="space-y-2">
              {loading ? (
                <li className="text-gray-400 text-sm">جاري التحميل...</li>
              ) : (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className={styles['footer-section-title']}>
              روابط مهمة
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles['footer-section-title']}>
              اتصل بنا
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-primary">📍</span>
                <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">📞</span>
                <span className="text-gray-400">+966 55 771 735 416</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✉️</span>
                <span className="text-gray-400">nahari771735416@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Quick Form */}
        <div className={styles['footer-newsletter']}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="text-lg font-bold mb-1">اشترك في نشرتنا</h4>
              <p className="text-gray-400 text-sm">احصل على آخر الأخبار مباشرة</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary flex-1 md:w-64"
              />
              <button className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-lg font-medium transition-colors">
                اشتراك
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles['footer-bottom']}>
          <p className="text-gray-500 mb-2">
            جميع الحقوق محفوظة © {new Date().getFullYear()} موقع حبر الإخباري
          </p>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer