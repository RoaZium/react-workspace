import { useState } from 'react'
import type { LayoutDetailModalProps, DeviceType } from '../types'
import './LayoutDetailModal.css'

export function LayoutDetailModal({ layout, isOpen, onClose }: LayoutDetailModalProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  if (!isOpen) return null

  const handleCopyCode = () => {
    navigator.clipboard.writeText(layout.code)
    alert('코드가 클립보드에 복사되었습니다!')
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="layout-modal" onClick={handleBackdropClick}>
      <div className="layout-modal__container">
        {/* 헤더 */}
        <div className="layout-modal__header">
          <div className="layout-modal__header-info">
            <h2 className="layout-modal__title">{layout.name}</h2>
            <p className="layout-modal__description">{layout.description}</p>
          </div>

          {/* 뷰 모드 전환 */}
          <div className="layout-modal__view-toggle">
            <button
              className={`layout-modal__view-btn ${viewMode === 'preview' ? 'active' : ''}`}
              onClick={() => setViewMode('preview')}
            >
              👁️ 미리보기
            </button>
            <button
              className={`layout-modal__view-btn ${viewMode === 'code' ? 'active' : ''}`}
              onClick={() => setViewMode('code')}
            >
              💻 코드 보기
            </button>
          </div>

          {/* 닫기 버튼 */}
          <button className="layout-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* 툴바 */}
        {viewMode === 'preview' && (
          <div className="layout-modal__toolbar">
            <div className="layout-modal__device-toggle">
              <button
                className={`layout-modal__device-btn ${deviceType === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceType('desktop')}
                title="데스크톱"
              >
                🖥️
              </button>
              <button
                className={`layout-modal__device-btn ${deviceType === 'tablet' ? 'active' : ''}`}
                onClick={() => setDeviceType('tablet')}
                title="태블릿"
              >
                📱
              </button>
              <button
                className={`layout-modal__device-btn ${deviceType === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceType('mobile')}
                title="모바일"
              >
                📱
              </button>
            </div>

            <div className="layout-modal__info-tags">
              {layout.features.map((feature, index) => (
                <span key={index} className="layout-modal__feature-tag">
                  ✨ {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 본문 */}
        <div className="layout-modal__body">
          {viewMode === 'preview' ? (
            <div className={`layout-modal__preview layout-modal__preview--${deviceType}`}>
              <div className="layout-modal__preview-frame">
                <layout.component />
              </div>
            </div>
          ) : (
            <div className="layout-modal__code">
              <div className="layout-modal__code-header">
                <span className="layout-modal__code-language">TypeScript</span>
                <button className="layout-modal__copy-btn" onClick={handleCopyCode}>
                  📋 복사
                </button>
              </div>
              <pre className="layout-modal__code-block">
                <code>{layout.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="layout-modal__footer">
          <div className="layout-modal__footer-info">
            <div className="layout-modal__use-case">
              <strong>💡 사용처:</strong> {layout.useCase}
            </div>
          </div>
          <div className="layout-modal__footer-actions">
            <button className="layout-modal__footer-btn" onClick={handleCopyCode}>
              📋 코드 복사
            </button>
            <button className="layout-modal__footer-btn layout-modal__footer-btn--primary" onClick={onClose}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
