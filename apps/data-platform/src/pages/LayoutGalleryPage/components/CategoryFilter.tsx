import type { CategoryFilterProps } from '../types'
import { categories } from '../data/layoutTemplates'
import './CategoryFilter.css'

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <div className="category-filter__label">카테고리:</div>
      <div className="category-filter__buttons">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-filter__btn ${selected === category.id ? 'active' : ''}`}
            onClick={() => onChange(category.id)}
          >
            <span className="category-filter__icon">{category.icon}</span>
            <span className="category-filter__name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
