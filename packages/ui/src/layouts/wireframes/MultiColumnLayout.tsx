import { ReactNode } from 'react'
import './MultiColumnLayout.css'

interface MultiColumnLayoutProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
}

/**
 * MultiColumn 와이어프레임 레이아웃
 * 2, 3, 4 컬럼 그리드 구조
 */
export function MultiColumnLayout({
  children,
  columns = 3,
  gap = 'medium'
}: MultiColumnLayoutProps) {
  return (
    <div
      className={`wireframe-multicolumn wireframe-multicolumn--${columns} wireframe-multicolumn--gap-${gap}`}
    >
      {children}
    </div>
  )
}

interface ColumnProps {
  children?: ReactNode
  span?: number
  className?: string
}

export function Column({ children, span = 1, className = '' }: ColumnProps) {
  return (
    <div
      className={`wireframe-column ${className}`}
      style={{ gridColumn: span > 1 ? `span ${span}` : undefined }}
    >
      {children}
    </div>
  )
}

MultiColumnLayout.Column = Column
