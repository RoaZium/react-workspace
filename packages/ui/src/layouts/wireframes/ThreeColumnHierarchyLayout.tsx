import { ReactNode } from 'react'
import '../../styles/theme.css'
import './ThreeColumnHierarchyLayout.css'

interface ThreeColumnHierarchyLayoutProps {
  children: ReactNode
  gap?: 'small' | 'medium' | 'large'
}

/**
 * ThreeColumnHierarchy 와이어프레임 레이아웃
 * 가로 3단 컬럼 계층 구조로 데이터를 표시하는 레이아웃
 * 데이터소스 > 카테고리 > 리소스(리스트+상세)와 같은 3단 계층 구조에 적합
 */
export function ThreeColumnHierarchyLayout({ children, gap = 'medium' }: ThreeColumnHierarchyLayoutProps) {
  return (
    <div className={`wireframe-three-column-hierarchy wireframe-three-column-hierarchy--gap-${gap}`}>
      {children}
    </div>
  )
}

interface ThreeColumnHierarchyColumnProps {
  children?: ReactNode
  width?: string
  className?: string
}

/**
 * 계층 컬럼 (대, 중 단계)
 */
export function ThreeColumnHierarchyColumn({
  children,
  width,
  className = ''
}: ThreeColumnHierarchyColumnProps) {
  return (
    <div
      className={`wireframe-three-column-hierarchy-column ${className}`}
      style={{ width }}
    >
      {children}
    </div>
  )
}

interface ThreeColumnHierarchyDetailProps {
  children?: ReactNode
  className?: string
}

/**
 * 계층 상세 영역 (소 단계 - 리스트와 상세로 분할)
 */
export function ThreeColumnHierarchyDetail({ children, className = '' }: ThreeColumnHierarchyDetailProps) {
  return (
    <div className={`wireframe-three-column-hierarchy-detail ${className}`}>
      {children}
    </div>
  )
}

interface ThreeColumnHierarchyListProps {
  children?: ReactNode
  className?: string
}

/**
 * 리스트 영역
 */
export function ThreeColumnHierarchyList({ children, className = '' }: ThreeColumnHierarchyListProps) {
  return (
    <div className={`wireframe-three-column-hierarchy-list ${className}`}>
      {children}
    </div>
  )
}

interface ThreeColumnHierarchyContentProps {
  children?: ReactNode
  className?: string
}

/**
 * 상세 콘텐츠 영역
 */
export function ThreeColumnHierarchyContent({ children, className = '' }: ThreeColumnHierarchyContentProps) {
  return (
    <div className={`wireframe-three-column-hierarchy-content ${className}`}>
      {children}
    </div>
  )
}

ThreeColumnHierarchyLayout.Column = ThreeColumnHierarchyColumn
ThreeColumnHierarchyLayout.Detail = ThreeColumnHierarchyDetail
ThreeColumnHierarchyLayout.List = ThreeColumnHierarchyList
ThreeColumnHierarchyLayout.Content = ThreeColumnHierarchyContent
