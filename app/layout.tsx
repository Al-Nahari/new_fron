import type { Metadata } from 'next'
// @ts-ignore: CSS module declaration missing for side-effect import
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from './providers'


export const metadata: Metadata = {
  title: 'حبر',
  description: 'أحدث الأخبار المحلية والعالمية بموضوعية ومهنية، مع التحليلات والتقارير المتعمقة',
  keywords: ['أخبار', 'سياسة', 'اقتصاد', 'رياضة', 'تقنية', 'ثقافة', 'صحافة', 'نشر'],
  authors: [{ name: 'فريق حبر' }],
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'حبر',
    title: 'حبر',
    description: 'أحدث الأخبار المحلية والعالمية بموضوعية ومهنية',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nabdnews',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <body className="app-body">
        <Providers>
          <Header />
          <main className="app-main">
            <div className="container">
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
