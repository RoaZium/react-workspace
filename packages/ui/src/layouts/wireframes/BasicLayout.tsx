import { ReactNode } from 'react'
import './BasicLayout.css'

interface BasicLayoutProps {
  children: ReactNode
}

/**
 * Basic 와이어프레임 레이아웃
 * 단순한 단일 컨텐츠 영역 구조
 */
export function BasicLayout({ children }: BasicLayoutProps) {
  return <div className="wireframe-basic">{children}</div>
}

interface BasicSectionProps {
  children?: ReactNode
  className?: string
}

export function BasicSection({ children, className = '' }: BasicSectionProps) {
  return <div className={`wireframe-basic-section ${className}`}>{children}</div>
}

BasicLayout.Section = BasicSection
