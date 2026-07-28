# دليل الإعداد - حبر Frontend

هذا دليل سريع لإعداد وتشغيل مشروع حبر Frontend مع الـ API.

## المتطلبات المسبقة

- Node.js 18 أو أعلى
- npm أو yarn أو pnpm
- Backend API يعمل على المنفذ 8000

## الخطوة 1: التثبيت

```bash
# تنزيل المشروع
git clone <repository-url>
cd news-frontend

# تثبيت الحزم
npm install
```

## الخطوة 2: إعداد البيئة

```bash
# إنشاء ملف البيئة من النموذج
cp .env.example .env
```

### إعدادات الـ API

افتراضياً، المشروع يتوقع أن يعمل الـ backend على `http://localhost:8000`. إذا كنت تستخدم منفذ مختلف، عدّل ملف `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## الخطوة 3: تشغيل الـ Backend

تأكد من تشغيل الـ backend (Django/DRF) على المنفذ 8000:

```bash
# في مجلد الـ backend
cd backend
python manage.py runserver 8000
```

## الخطوة 4: تشغيل الـ Frontend

### في وضع التطوير
```bash
npm run dev
```

يعمل المشروع على `http://localhost:3000`

### في وضع الإنتاج
```bash
# بناء المشروع
npm run build

# تشغيل المشروع
npm start
```

## الخطوة 5: التحقق من العمل

1. افتح المتصفح على `http://localhost:3000`
2. يجب أن ترى الصفحة الرئيسية مع المقالات
3. تحقق من وحدة التحكم لأي أخطاء

## إعدادات متقدمة

### تغيير منفذ Next.js

إذا كان المنفذ 3000 مشغولاً:

```bash
npm run dev -- -p 4000
```

### استخدام Yarn أو pnpm

```bash
# مع Yarn
yarn install
yarn dev

# مع pnpm
pnpm install
pnpm dev
```

### إعدادات TypeScript

```bash
# التحقق من الأنواع
npm run type-check

# التحقق من الكود
npm run lint
```

## مشكلات شائعة

### 1. "Cannot connect to API"

**السبب:** الـ backend لا يعمل أو المنفذ خاطئ

**الحل:**
```bash
# تأكد من تشغيل الـ backend
curl http://localhost:8000/api/news/
```

### 2. "CORS errors"

**الحل:** تم تكوين الـ CORS في `next.config.ts`. إذا استمرت المشكلة، تأكد من:
- تشغيل الـ backend مع دعم CORS
- استخدام الـ proxy في Next.js

### 3. "Module not found"

**الحل:**
```bash
npm install
npm run dev
```

### 4. "TypeScript errors"

**الحل:**
```bash
npm run type-check
# أو
npx tsc --noEmit
```

### 5. الصور لا تظهر

**الحل:** تأكد من إضافة نطاقات الصور إلى `next.config.ts`:

```typescript
images: {
  domains: ['images.unsplash.com', 'randomuser.me'],
}
```

## اختبار الـ API

### اختبار الاتصال

```bash
# اختبار جلب المقالات
curl http://localhost:8000/api/news/

# اختبار الـ GraphQL
curl -X POST http://localhost:8000/graphql/ \
  -H "Content-Type: application/json" \
  -d '{"query": "{ articles { id title } }"}'
```

### اختبار في المتصفح

افتح `http://localhost:3000/api/test` (إذا أضفت route لل тест)

## أوامر مفيدة

```bash
# تشغيل مع تفاصيل الأخطاء
npm run dev -- --verbose

# تنظيف وإعادة تثبيت
npm run dev:clean

# التحقق من جميع الأنواع
npm run type-check

# التحقق من الكود
npm run lint

# بناء للإنتاج
npm run build && npm start
```

## إعدادات الإنتاج

### متغيرات البيئة للإنتاج

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### البناء

```bash
npm run build
```

سيتم إنشاء مجلد `.next` مع الكود المضغوط.

### التشغيل

```bash
npm start
```

## تحسينات الأداء

### التخزين المؤقت

الـ API يدعم التخزين المؤقت تلقائياً عبر:
- `cache: 'no-store'` في fetch requests
- التخزين المؤقت في المتصفح

### التحميل الكسول

الصور يتم تحميلها بشكل كسول:
```tsx
<Image
  src={article.featuredImage}
  alt={article.title}
  fill
  priority={false} // كسول
/>
```

### Sass & CSS

المشروع يستخدم Sass مع:
- **المتغيرات**: للحفاظ على الاتساق في الألوان والقياسات
- **Mixins**: لإعادة استخدام أنماط الشاشات والاستجابة
- **Nested Rules**: لتنظيم أنماط CSS بشكل أفضل

### التحسينات المتقدمة

1. **SWR/React Query**: للتخزين المؤقت
2. **Image Optimization**: للصور
3. **Code Splitting**: للتحميل السريع

## فحص الجودة

### قبل الإنتاج

```bash
# 1. التحقق من الأنواع
npm run type-check

# 2. التحقق من الكود
npm run lint

# 3. بناء الاختبار
npm run build

# 4. تشغيل الاختبارات
npm test
```

## التواصل مع الفريق

لأي استفسارات تقنية:
- فريق التطوير: dev@nabd-news.com
- الوثائق: README.md و API_DOCUMENTATION.md

## الترخيص

MIT License - شكرًا لاستخدامك حبر!