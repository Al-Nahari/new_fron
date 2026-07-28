# API Documentation - حبر

هذا المستند يشرح كيفية استخدام الـ API مع مشروع حبر.

## مقدمة

المشروع يستخدم Next.js للـ frontend مع ربط كامل بالـ backend (Django/DRF) الذي يعمل على المنفذ 8000.

## إعدادات التشغيل

### 1. تشغيل الـ Backend
```bash
# في مجلد الـ backend
cd backend
python manage.py runserver 8000
```

### 2. تشغيل الـ Frontend
```bash
# في مجلد الـ frontend
cd frontend
npm run dev
```

## الـ Endpoints

### المقالات

#### جميع المقالات
```
GET /api/news/
```

**المعلمات:**
- `category` (اختياري) - تصفية حسب التصنيف
- `tag` (اختياري) - تصفية حسب الوسم
- `author` (اختياري) - تصفية حسب المؤلف
- `search` (اختياري) - بحث في العنوان والوصف والمحتوى
- `is_breaking` (اختياري) - الأخبار العاجلة فقط
- `is_featured` (اختياري) - المقالات المميزة فقط
- `page` (اختياري) - رقم الصفحة
- `limit` (اختياري) - عدد العناصر في الصفحة

**الرد:**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "عنوان المقال",
      "slug": "article-slug",
      "excerpt": "وصف مختصر",
      "content": "المحتوى الكامل",
      "featured_image": "https://example.com/image.jpg",
      "author": {
        "id": 1,
        "name": "اسم المؤلف",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "نبذة عن المؤلف",
        "role": "reporter"
      },
      "category": {
        "id": 1,
        "name": "السياسة",
        "slug": "politics",
        "color": "#3B82F6",
        "icon": "landmark"
      },
      "tags": [
        {
          "id": 1,
          "name": "القمة",
          "slug": "summit"
        }
      ],
      "is_breaking": true,
      "is_featured": true,
      "views": 15420,
      "likes": 1250,
      "comments": 340,
      "reading_time": 4,
      "published_at": "2024-01-15T10:30:00Z",
      "created_at": "2024-01-14T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1,
  "next": null,
  "previous": null
}
```

#### مقال واحد حسب الـ slug
```
GET /api/news/?slug={slug}
```

**الرد:** نفس هيكل المقال أعلاه

#### إنشاء مقال
```
POST /api/news/create/
```

**الطلب:**
```json
{
  "title": "عنوان المقال",
  "slug": "article-slug",
  "excerpt": "وصف مختصر",
  "content": "المحتوى الكامل",
  "featured_image": "https://example.com/image.jpg",
  "author": 1,
  "category": 1,
  "tags": [1, 2],
  "is_breaking": false,
  "is_featured": false,
  "reading_time": 5,
  "published_at": "2024-01-15T10:30:00Z"
}
```

**الرد:**
```json
{
  "success": true,
  "article": {
    "id": 1,
    "title": "عنوان المقال",
    "slug": "article-slug"
  }
}
```

#### تحديث مقال
```
PUT /api/news/{id}/update/
```

**الطلب:** نفس هيكل الإنشاء

#### حذف مقال
```
DELETE /api/news/{id}/delete/
```

**الرد:**
```json
{
  "success": true,
  "message": "Article deleted successfully"
}
```

### المقالات المميزة
```
GET /api/featured/
```

**الرد:** نفس هيكل المقالات أعلاه

### الأخبار العاجلة
```
GET /api/breaking/
```

**الرد:** نفس هيكل المقالات أعلاه

### البحث
```
GET /api/search/?q={query}
```

**الرد:** نفس هيكل المقالات أعلاه

### التصنيفات
```
GET /api/categories/
```

**الرد:**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "السياسة",
      "slug": "politics",
      "color": "#3B82F6",
      "icon": "landmark",
      "article_count": 15
    }
  ]
}
```

### الوسوم
```
GET /api/tags/
```

**الرد:**
```json
{
  "tags": [
    {
      "id": 1,
      "name": "القمة",
      "slug": "summit",
      "article_count": 5
    }
  ]
}
```

### المؤلفين
```
GET /api/authors/
```

**الرد:**
```json
{
  "authors": [
    {
      "id": 1,
      "name": "أحمد محمد",
      "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
      "bio": "مراسل سياسي متخصص في الشؤون الدولية",
      "role": "reporter",
      "article_count": 25
    }
  ]
}
```

### التفاعلات

#### زيادة المشاهدات
```
POST /api/views/increment/
```

**الطلب:**
```json
{
  "article_id": 1
}
```

**الرد:**
```json
{
  "success": true,
  "views": 15421
}
```

#### زيادة الإعجابات
```
POST /api/likes/increment/
```

**الطلب:**
```json
{
  "article_id": 1
}
```

**الرد:**
```json
{
  "success": true,
  "likes": 1251
}
```

### الإحصائيات
```
GET /api/stats/
```

**الرد:**
```json
{
  "stats": {
    "total_articles": 150,
    "total_authors": 12,
    "total_categories": 6,
    "total_tags": 25,
    "breaking_news": 8,
    "featured_articles": 5,
    "total_views": 125000,
    "total_likes": 8500,
    "top_articles": [
      {
        "id": 1,
        "title": "أعلى مقال مشاهدة",
        "views": 15420
      }
    ],
    "articles_by_category": [
      {
        "slug": "politics",
        "name": "السياسة",
        "article_count": 45
      }
    ]
  }
}
```

### البيانات التجريبية
```
POST /api/bulk-insert/
```

**الرد:**
```json
{
  "success": true,
  "message": "Mock data inserted successfully"
}
```

## GraphQL API

### النقطة
```
POST /graphql/
```

### الاستعلامات الجاهزة

#### جميع المقالات
```graphql
query {
  articles {
    id
    title
    slug
    excerpt
    featuredImage
    category {
      name
      color
    }
    author {
      name
      avatar
    }
    views
    likes
    isBreaking
    isFeatured
    readingTime
    publishedAt
  }
}
```

#### مقال حسب الـ slug
```graphql
query GetArticleBySlug($slug: String!) {
  article(slug: $slug) {
    id
    title
    slug
    excerpt
    content
    featuredImage
    author {
      id
      name
      avatar
      bio
      role
    }
    category {
      id
      name
      slug
      color
      icon
    }
    tags {
      id
      name
      slug
    }
    isBreaking
    isFeatured
    views
    likes
    comments
    readingTime
    publishedAt
    createdAt
    updatedAt
  }
}
```

#### الأخبار العاجلة
```graphql
query {
  breakingNews {
    id
    title
    slug
    excerpt
    featuredImage
    category {
      name
      color
    }
    author {
      name
    }
    views
    likes
    publishedAt
  }
}
```

#### البحث
```graphql
query SearchArticles($query: String!) {
  searchArticles(query: $query) {
    id
    title
    slug
    excerpt
    featuredImage
    category {
      name
      color
    }
    author {
      name
    }
    views
    likes
    publishedAt
  }
}
```

#### التصنيفات مع عدد المقالات
```graphql
query {
  categories {
    id
    name
    slug
    color
    icon
    articleCount
  }
}
```

#### الإحصائيات
```graphql
query {
  stats {
    totalArticles
    totalAuthors
    totalCategories
    totalTags
    breakingNews
    featuredArticles
    totalViews
    totalLikes
    topArticles {
      id
      title
      views
    }
    articlesByCategory {
      slug
      name
      articleCount
    }
  }
}
```

### التعديلات (Mutations)

#### زيادة المشاهدات
```graphql
mutation IncrementViews($articleId: Int!) {
  incrementViews(articleId: $articleId) {
    success
    views
  }
}
```

#### زيادة الإعجابات
```graphql
mutation IncrementLikes($articleId: Int!) {
  incrementLikes(articleId: $articleId) {
    success
    likes
  }
}
```

#### إنشاء مقال
```graphql
mutation CreateArticle($input: ArticleInput!) {
  createArticle(input: $input) {
    success
    article {
      id
      title
      slug
    }
  }
}
```

## استخدام الـ API في Next.js

### مثال: جلب المقالات في صفحة رئيسية
```typescript
// app/page.tsx
import { getLatestArticles } from '@/lib/api';

export default async function Home() {
  const articles = await getLatestArticles();
  
  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

### مثال: جلب مقال واحد
```typescript
// app/article/[slug]/page.tsx
import { getArticleBySlug, incrementViews } from '@/lib/api';

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);
  
  // زيادة المشاهدات
  if (article) {
    await incrementViews(article.id);
  }
  
  return (
    <div>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}
```

### مثال: استخدام GraphQL
```typescript
import { graphqlQuery, graphql } from '@/lib/api';

export default async function Page() {
  const data = await graphqlQuery(graphql.getArticles);
  
  return (
    <div>
      {data.articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
        </div>
      ))}
    </div>
  );
}
```

## أخطاء شائعة

### 1. الـ API لا يعمل
**الحل:** تأكد من تشغيل `python manage.py runserver 8000`

### 2. CORS errors
**الحل:** تم تكوين الـ CORS في `next.config.ts`، يتم توجيه الطلبات عبر الـ proxy

### 3. الصور لا تظهر
**الحل:** أضف النطاقات إلى `next.config.ts` في قسم `images.domains`

### 4. مشكلة TypeScript
**الحل:** استخدم الأنواع الصحيحة من `types/index.ts`

## نصائح للأمان

1. **لا تخزن التوكن في الكود**: استخدم متغيرات البيئة
2. **استخدم HTTPS في الإنتاج**: لا تستخدم HTTP
3. **تحقق من صحة البيانات**: استخدم TypeScript validation
4. **معالجة الأخطاء**: استخدم try-catch دائماً

## التوسع المستقبلي

- إضافة نظام تعليقات
- إضافة نظام تقييم المقالات
- إضافة إشعارات Push
- إضافة تحليلات متقدمة
- دعم لغات متعددة

## التواصل

لأي استفسارات تقنية، يرجى التواصل مع فريق التطوير.