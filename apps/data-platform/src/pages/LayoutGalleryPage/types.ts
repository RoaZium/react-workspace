import type { ReactNode } from 'react'

export type LayoutCategory = 'all' | 'basic' | 'column' | 'row' | 'search'

export interface LayoutTemplate {
  id: string
  name: string
  description: string
  category: LayoutCategory
  thumbnail: string
  component?: React.ComponentType
  code: string
  features: string[]
  useCase: string
  path: string
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile'

export interface LayoutPreviewCardProps {
  layout: LayoutTemplate
  onClick: () => void
}

export interface LayoutDetailModalProps {
  layout: LayoutTemplate
  isOpen: boolean
  onClose: () => void
}

export interface CategoryFilterProps {
  selected: LayoutCategory
  onChange: (category: LayoutCategory) => void
}
