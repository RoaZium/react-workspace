import { ReactNode } from 'react'
import './RowsLayout.css'

interface RowsLayoutProps {
  children: ReactNode
  gap?: 'small' | 'medium' | 'large'
}

/**
 * Rows 와이어프레임 레이아웃
 * 행 기반 레이아웃 (각 행은 내부에서 컬럼을 가질 수 있음)
 */
export function RowsLayout({ children, gap = 'medium' }: RowsLayoutProps) {
  return (
    <div className={`wireframe-rows wireframe-rows--gap-${gap}`}>{children}</div>
  )
}

interface RowProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

/**
 * 단일 행 컴포넌트
 * columns prop으로 내부 컬럼 수 지정 가능
 */
export function Row({ children, columns = 1, className = '' }: RowProps) {
  return (
    <div
      className={`wireframe-row wireframe-row--columns-${columns} ${className}`}
    >
      {children}
    </div>
  )
}

interface RowItemProps {
  children: ReactNode
  span?: number
  className?: string
}

/**
 * 행 내부의 아이템 (컬럼이 여러 개일 때 사용)
 */
export function RowItem({ children, span = 1, className = '' }: RowItemProps) {
  return (
    <div
      className={`wireframe-row-item ${className}`}
      style={{ gridColumn: span > 1 ? `span ${span}` : undefined }}
    >
      {children}
    </div>
  )
}

RowsLayout.Row = Row
RowsLayout.Item = RowItem
