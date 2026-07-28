import { Category } from '@/types'
import styles from './CategoryBadge.module.scss'

interface CategoryBadgeProps {
  category: Category
  className?: string
  size?: 'small' | 'large'
}

const CategoryBadge = ({ category, className = '', size = 'small' }: CategoryBadgeProps) => {
  // Determine badge class based on category type
  const getBadgeClass = () => {
    const baseClass = size === 'large' ? styles['category-badge-large'] : styles['category-badge-small']
    
    // Check for special categories
    if (category.slug === 'breaking' || category.name.includes('عاجل')) {
      return `${baseClass} ${styles['category-badge-breaking']}`
    }
    if (category.slug === 'opinion' || category.name.includes('رأي')) {
      return `${baseClass} ${styles['category-badge-opinion']}`
    }
    
    return baseClass
  }

  return (
    <span className={`${styles['category-badge']} ${getBadgeClass()} ${className}`}>
      {category.name}
    </span>
  )
}

export default CategoryBadge