import { ReactNode } from 'react'
import '../../styles/theme.css'
import './SearchLayout.css'

interface SearchLayoutProps {
  children: ReactNode
  gap?: 'small' | 'medium' | 'large'
}

/**
 * Search 와이어프레임 레이아웃
 * 조건 조회 영역과 조회 결과 영역으로 구성된 레이아웃
 */
export function SearchLayout({ children, gap = 'medium' }: SearchLayoutProps) {
  return (
    <div className={`wireframe-search wireframe-search--gap-${gap}`}>
      {children}
    </div>
  )
}

interface SearchConditionProps {
  children: ReactNode
  className?: string
}

/**
 * 조건 조회 영역
 */
export function SearchCondition({
  children,
  className = ''
}: SearchConditionProps) {
  return (
    <div className={`wireframe-search-condition ${className}`}>{children}</div>
  )
}

interface SearchResultProps {
  children: ReactNode
  className?: string
}

/**
 * 조회 결과 영역
 */
export function SearchResult({ children, className = '' }: SearchResultProps) {
  return (
    <div className={`wireframe-search-result ${className}`}>{children}</div>
  )
}

SearchLayout.Condition = SearchCondition
SearchLayout.Result = SearchResult
