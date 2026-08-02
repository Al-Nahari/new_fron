'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BreakingNews from './BreakingNews'
import { useCategories } from '@/lib/hooks'
import styles from './Header.module.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { categories, loading, error } = useCategories()

  const navItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الأخبار العاجلة', href: '/breaking' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <nav className={styles.header}>
        <div className={`${styles['header-container']} container`}>
          <div className={styles['header-inner']}>
            {/* Logo */}
            <div className={styles['header-logo-section']}>
              <Link href="/" className={styles['header-logo-link']}>
                <div className={styles['header-logo-icon']}>
                  <span>ح</span>
                </div>
                <div>
                  <h1 className={styles['header-logo-text']}>حبر</h1>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className={styles['header-nav-desktop']}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={styles['header-nav-link']}
                >
                  {item.name}
                </Link>
              ))}
              {/* Dynamic Categories - Show loading state */}
              {loading && (
                <span className={styles['header-loading']}>جاري تحميل التصنيفات...</span>
              )}
              {!loading && !error && categories.slice(0, 3).map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={styles['header-nav-link']}
                >
                  {category.name}
                </Link>
              ))}
              {error && (
                <span className={styles['header-error']}>❌</span>
              )}
            </div>
            
            {/* Search and Mobile Menu */}
            <div className={styles['header-actions']}>
              {/* Desktop Search */}
              <div className={styles['header-search-desktop']}>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="ابحث عن خبر..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles['header-search-input']}
                  />
                  <button
                    type="submit"
                    className={styles['header-search-btn']}
                    title="بحث"
                    aria-label="بحث"
                  >
                    <svg className={styles['header-search-icon']} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>
              
              {/* Auth Buttons */}
              <div className={styles['header-auth']}>
                <Link 
                  href="/login"
                  className={styles['header-login-btn']}
                >
                  تسجيل الدخول
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className={styles['header-mobile-toggle']}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title="القائمة"
                aria-label="Toggle menu"
              >
                <svg className={styles['header-mobile-icon']} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles['header-mobile-menu']}>
            <div className={styles['header-mobile-content']}>
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className={styles['header-mobile-search']}>
                <input
                  type="text"
                  placeholder="ابحث عن خبر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles['header-mobile-search-input']}
                />
              </form>
              
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={styles['header-mobile-link']}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Categories */}
              {loading && (
                <span className={styles['header-mobile-loading']}>جاري تحميل التصنيفات...</span>
              )}
              {!loading && !error && categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={styles['header-mobile-link']}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              {error && (
                <span className={styles['header-mobile-error']}>❌ حدث خطأ في تحميل التصنيفات</span>
              )}
              
              <div className={styles['header-mobile-auth']}>
                <Link 
                  href="/login"
                  className={styles['header-mobile-login']}
                  onClick={() => setIsMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <BreakingNews />
    </>
  )
}

export default Header