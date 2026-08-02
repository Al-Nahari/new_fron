import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full mx-auto space-y-8 text-center">
        <div className="space-y-4">
          <div className="text-6xl font-bold text-primary">404</div>
          <h2 className="text-3xl font-bold text-gray-900">الصفحة غير موجودة</h2>
          <p className="text-gray-600 text-lg">
            عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn btn-primary"
          >
            العودة للرئيسية
          </Link>
          
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 text-sm text-blue-800">
          <p>هل تحتاج مساعدة؟ تواصل معنا عبر:</p>
          <p className="font-semibold mt-1">info@nabd-news.com</p>
        </div>
      </div>
    </div>
  )
}