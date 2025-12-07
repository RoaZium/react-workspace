import type { LayoutPreviewCardProps } from '../types'
import './LayoutPreviewCard.css'

export function LayoutPreviewCard({ layout, onClick }: LayoutPreviewCardProps) {
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(layout.code)
    alert('코드가 클립보드에 복사되었습니다!')
  }

  return (
    <div className="layout-card" onClick={onClick}>
      {/* 썸네일 영역 */}
      <div className="layout-card__thumbnail">
        <div className="layout-card__thumbnail-placeholder">
          <span className="layout-card__icon">🎨</span>
          <span className="layout-card__id">{layout.id}</span>
        </div>
        <div className="layout-card__overlay">
          <button className="layout-card__preview-btn">
            👁️ 미리보기
          </button>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="layout-card__info">
        <div className="layout-card__header">
          <span className="layout-card__category">{layout.category}</span>
          <h3 className="layout-card__title">{layout.name}</h3>
        </div>
        <p className="layout-card__description">{layout.description}</p>

        {/* 특징 태그 */}
        <div className="layout-card__features">
          {layout.features.map((feature, index) => (
            <span key={index} className="layout-card__feature-tag">
              {feature}
            </span>
          ))}
        </div>

        {/* 사용 사례 */}
        <div className="layout-card__use-case">
          <span className="layout-card__use-case-label">💡 사용처:</span>
          <span className="layout-card__use-case-text">{layout.useCase}</span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="layout-card__actions">
        <button
          className="layout-card__btn layout-card__btn--secondary"
          onClick={handleCopyCode}
        >
          📋 코드 복사
        </button>
        <button className="layout-card__btn layout-card__btn--primary">
          👁️ 전체보기
        </button>
      </div>
    </div>
  )
}
