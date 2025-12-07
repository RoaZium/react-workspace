import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LayoutCategory, LayoutTemplate } from './types'
import { layoutTemplates } from './data/layoutTemplates'
import { CategoryFilter } from './components/CategoryFilter'
import { LayoutPreviewCard } from './components/LayoutPreviewCard'
import './LayoutGalleryPage.css'

export function LayoutGalleryPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<LayoutCategory>('all')

  const filteredLayouts =
    selectedCategory === 'all'
      ? layoutTemplates
      : layoutTemplates.filter((layout) => layout.category === selectedCategory)

  const handleLayoutClick = (layout: LayoutTemplate) => {
    // 개별 레이아웃 페이지로 이동
    navigate(layout.path)
  }

  return (
    <div className="layout-gallery">
      {/* 헤더 */}
      <header className="layout-gallery__header">
        <div className="layout-gallery__header-content">
          <h1 className="layout-gallery__title">
            🎨 레이아웃 템플릿 갤러리
          </h1>
          <p className="layout-gallery__subtitle">
            디자인 시스템 기반으로 만들어진 레이아웃 템플릿을 선택하고 바로 사용하세요.
            <br />
            각 레이아웃은 반응형으로 구현되어 있으며, 코드를 복사하여 즉시 적용할 수 있습니다.
          </p>
        </div>

        <div className="layout-gallery__stats">
          <div className="layout-gallery__stat">
            <div className="layout-gallery__stat-value">{layoutTemplates.length}</div>
            <div className="layout-gallery__stat-label">총 템플릿</div>
          </div>
          <div className="layout-gallery__stat">
            <div className="layout-gallery__stat-value">{filteredLayouts.length}</div>
            <div className="layout-gallery__stat-label">선택된 템플릿</div>
          </div>
        </div>
      </header>

      {/* 카테고리 필터 */}
      <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />

      {/* 레이아웃 그리드 */}
      <div className="layout-gallery__grid">
        {filteredLayouts.length > 0 ? (
          filteredLayouts.map((layout) => (
            <LayoutPreviewCard
              key={layout.id}
              layout={layout}
              onClick={() => handleLayoutClick(layout)}
            />
          ))
        ) : (
          <div className="layout-gallery__empty">
            <div className="layout-gallery__empty-icon">🔍</div>
            <h3 className="layout-gallery__empty-title">선택한 카테고리에 템플릿이 없습니다</h3>
            <p className="layout-gallery__empty-description">
              다른 카테고리를 선택해주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
