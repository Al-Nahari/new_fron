# حبر

مشروع مبني باستخدام Next.js 16 و TypeScript، يوفر واجهة مستخدم حديثة وتفاعلية لعرض الأخبار والمقالات مع ربط كامل بالـ API.

## الميزات الرئيسية

- 🏠 **صفحة رئيسية تفاعلية** مع قسم الأخبار المميزة
- 📰 **أقسام الأخبار** المصنفة (سياسة، اقتصاد، رياضة، تقنية، صحة)
- 🔍 **بحث متadvanced** عن المقالات
- 🚨 **أخبار عاجلة** مع شريط تفاعلي
- 📱 **تصميم متجاوب** يدعم جميع الأجهزة
- 🎨 **واجهة مستخدم عربية** كاملة مع دعم RTL
- 🔐 **لوحة تحكم** لإدارة المحتوى
- 📧 **نظام النشرة الإخبارية**
- 🔌 **ربط كامل بالـ API** (REST + GraphQL)
- ⚡ **تحسين الأداء** مع التحميل الكسول

## التقنيات المستخدمة

- **Next.js 16** - إطار عمل React متقدم
- **TypeScript** - TypeScript للكود الموثوق
- **Sass (SCSS)** - CSS Preprocessor مع متغيرات و mixins
- **Noto Sans Arabic** - خط عربي احترافي
- **REST API** - للتواصل مع الـ backend
- **GraphQL** - بديل للـ API المتقدم

## البدء السريع

### المتطلبات المسبقة

- Node.js 18+
- npm أو yarn أو pnpm
- Backend API (Django/DRF) يعمل على المنفذ 8000

### التثبيت

```bash
# تنزيل المشروع
git clone <repository-url>
cd news-frontend

# تثبيت الحزم
npm install

# إعداد ملف البيئة
cp .env.example .env

# تشغيل servidor التطوير
npm run dev
```

### التشغيل

افتح [http://localhost:3000](http://localhost:3000) في متصفحك لرؤية النتيجة.

## هيكل المشروع

```
app/
├── layout.tsx          # التخطيط الرئيسي
├── page.tsx            # الصفحة الرئيسية
├── not-found.tsx       # صفحة 404
├── providers.tsx       # موفرو السياق
├── category/           # صفحات الأقسام
├── article/            # صفحات المقالات
├── search/             # صفحة البحث
├── login/              # صفحة تسجيل الدخول
├── breaking/           # الأخبار العاجلة

components/
├── layout/             # مكونات التخطيط
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── BreakingNews.tsx
├── ui/                 # مكونات واجهة المستخدم
│   ├── NewsCard.tsx
│   └── CategoryBadge.tsx
└── home/               # مكونات الصفحة الرئيسية
    ├── HeroSection.tsx
    ├── NewsGrid.tsx
    ├── MediaSection.tsx
    ├── OpinionSection.tsx
    └── Newsletter.tsx

lib/
├── api.ts              # واجهة برمجة التطبيقات (REST + GraphQL)
├── hooks.ts            # Hooks مخصصة

types/
└── index.ts            # أنواع TypeScript

public/                 # ملفات ثابتة
.env.example           # إعدادات البيئة النموذجية
next.config.ts         # إعدادات Next.js
```

## إعدادات الـ API

### إعدادات البيئة

أنشئ ملف `.env` من `.env.example`:

```bash
cp .env.example .env
```

### المتغيرات المتاحة

```env
# API الأساسي
NEXT_PUBLIC_API_URL=http://localhost:8000

# GraphQL (اختياري)
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql

# التوكن (إذا كان مطلوباً)
NEXT_PUBLIC_API_TOKEN=your-api-token-here
```

## واجهة برمجة التطبيقات (API)

### الـ Endpoints المتاحة

#### المقالات
- `GET /api/news/` - جميع المقالات
- `GET /api/news/?slug={slug}` - مقال حسب الـ slug
- `GET /api/news/?category={category}` - مقالات حسب التصنيف
- `GET /api/featured/` - المقالات المميزة
- `GET /api/breaking/` - الأخبار العاجلة
- `GET /api/search/?q={query}` - بحث في المقالات

#### التصنيفات والوسوم
- `GET /api/categories/` - جميع التصنيفات
- `GET /api/tags/` - جميع الوسوم
- `GET /api/authors/` - جميع المؤلفين

#### التفاعلات
- `POST /api/views/increment/` - زيادة المشاهدات
- `POST /api/likes/increment/` - زيادة الإعجابات

#### الإحصائيات
- `GET /api/stats/` - إحصائيات عامة

#### الـ Admin
- `POST /api/news/create/` - إنشاء مقال
- `PUT /api/news/{id}/update/` - تحديث مقال
- `DELETE /api/news/{id}/delete/` - حذف مقال
- `POST /api/bulk-insert/` - إدخال بيانات تجريبية

### أمثلة الاستخدام

#### جلب المقالات
```typescript
import { getLatestArticles } from '@/lib/api';

const articles = await getLatestArticles();
```

#### جلب مقال حسب الـ slug
```typescript
import { getArticleBySlug } from '@/lib/api';

const article = await getArticleBySlug('international-peace-summit-riyadh');
```

#### البحث
```typescript
import { searchArticles } from '@/lib/api';

const results = await searchArticles('اقتصاد');
```

#### زيادة المشاهدات
```typescript
import { incrementViews } from '@/lib/api';

await incrementViews(articleId);
```

### GraphQL

يمكن استخدام GraphQL كبديل للـ REST:

```typescript
import { graphqlQuery, graphql } from '@/lib/api';

// استخدام الاستعلام الجاهز
const data = await graphqlQuery(graphql.getArticles);

// أو استعلام مخصص
const customQuery = `
  query GetArticles {
    articles {
      id
      title
      excerpt
    }
  }
`;

const result = await graphqlQuery(customQuery);
```

## أوامر مفيدة

```bash
# تشغيل servidor التطوير
npm run dev

# تشغيل مع منفذ محدد
npm run dev:api

# بناء المشروع للإنتاج
npm run build

# تشغيل المشروع في الإنتاج
npm start

# التحقق من الكود
npm run lint

# التحقق من الأنواع TypeScript
npm run type-check

# تنظيف المشروع
npm run clean

# إعادة تثبيت كاملة
npm run dev:clean
```

## ملاحظات التطوير

### دعم RTL
تم تكوين جميع المكونات لدعم الاتجاه من اليمين لليسار بشكل كامل.

### الأداء
- الصور يتم تحميلها بشكل كسول (lazy loading)
- يتم استخدام `priority` للصور الرئيسية
- التصميم محسّن للأجهزة المحمولة
- التخزين المؤقت للبيانات (caching)

### الوصولية
- دعم كامل لقارئات الشاشة
- ألوان تباين عالية
- حجم خط مناسب

### الأخطاء الشائعة

#### مشكلة الاتصال بالـ API
```bash
# تأكد من أن الـ API يعمل على المنفذ 8000
curl http://localhost:8000/api/news/
```

#### مشكلة CORS
- تم تكوين الـ CORS في `next.config.ts`
- يتم توجيه الطلبات عبر الـ proxy

#### مشكلة الصور
- تأكد من إضافة النطاقات إلى `next.config.ts`
- استخدم المسارات النسبية للصور

## الترخيص

هذا المشروع مرخص تحت MIT License.

## الدعم

لأي استفسارات أو مساعدة، يرجى التواصل مع فريق التطوير.
