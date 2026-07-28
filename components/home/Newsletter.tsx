'use client'

import { useState } from 'react'
import styles from './NewsGrid.module.scss'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    // Simulate API call
    setTimeout(() => {
      if (email && email.includes('@')) {
        setStatus('success')
        setMessage('تم الاشتراك بنجاح! ستصلك آخر الأخبار على بريدك الإلكتروني.')
        setEmail('')
        setName('')
      } else {
        setStatus('error')
        setMessage('الرجاء إدخال بريد إلكتروني صحيح.')
      }
    }, 1000)
  }

  return (
    <div className={styles['newsletter-section']}>
      <div className={styles['newsletter-section-container']}>
        <div>
          <h2 className={styles['newsletter-section-title']}>اشترك في نشرتنا الإخبارية</h2>
          <p className={styles['newsletter-section-description']}>
            احصل على آخر الأخبار والتحليلات الحصرية مباشرة على بريدك الإلكتروني
          </p>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              أخبار حصرية وتحليلات
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              بدون إعلانات مزعجة
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              إلغاء الاشتراك في أي وقت
            </li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className={styles['newsletter-section-form']}>
          <div className="input-group">
            <label>الاسم الكامل</label>
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              disabled={status === 'loading'}
            />
          </div>
          
          <div className="input-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
              disabled={status === 'loading'}
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary"
          >
            {status === 'loading' ? 'جاري الاشتراك...' : 'اشترك الآن'}
          </button>
          
          {message && (
            <div className={`text-sm font-medium ${
              status === 'success' ? 'text-green-100' : 'text-red-100'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Newsletter