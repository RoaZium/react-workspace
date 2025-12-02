import { Button } from '@workspace/ui'
import type { Resource } from '../model'

interface ResourceDetailProps {
  resource: Resource
  dataSourceName?: string
  categoryName?: string
}

/**
 * 리소스 상세 정보 (재사용 가능한 UI 컴포넌트)
 */
export function ResourceDetail({ resource, dataSourceName, categoryName }: ResourceDetailProps) {
  return (
    <div className="resource-detail">
      <h2 className="detail-title">{resource.name}</h2>

      <div className="detail-section">
        <h3 className="detail-section-title">기본 정보</h3>
        <div className="detail-row">
          <span className="detail-label">리소스명:</span>
          <span className="detail-value">{resource.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">코드:</span>
          <span className="detail-value">{resource.code}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">상태:</span>
          <span className={`status-badge status-${resource.isActive ? 'active' : 'inactive'}`}>
            {resource.isActive ? '활성' : '비활성'}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">생성일:</span>
          <span className="detail-value">{new Date(resource.createdAt).toLocaleString('ko-KR')}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">수정일:</span>
          <span className="detail-value">{new Date(resource.updatedAt).toLocaleString('ko-KR')}</span>
        </div>
      </div>

      {resource.attributes && (
        <div className="detail-section">
          <h3 className="detail-section-title">운영 속성</h3>
          {resource.attributes.mqttCode && (
            <div className="detail-row">
              <span className="detail-label">MQTT 코드:</span>
              <span className="detail-value">{resource.attributes.mqttCode}</span>
            </div>
          )}
          {resource.attributes.unit && (
            <div className="detail-row">
              <span className="detail-label">단위:</span>
              <span className="detail-value">{resource.attributes.unit}</span>
            </div>
          )}
          {resource.attributes.dataType && (
            <div className="detail-row">
              <span className="detail-label">데이터 타입:</span>
              <span className="detail-value">{resource.attributes.dataType}</span>
            </div>
          )}
        </div>
      )}

      <div className="detail-section">
        <h3 className="detail-section-title">위치 정보</h3>
        <div className="detail-row">
          <span className="detail-label">데이터소스:</span>
          <span className="detail-value">{dataSourceName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">카테고리:</span>
          <span className="detail-value">{categoryName}</span>
        </div>
      </div>

      <div className="detail-actions">
        <Button variant="primary">쿼리 실행</Button>
        <Button variant="secondary">스키마 보기</Button>
        <Button variant="secondary">메타데이터 편집</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </div>
  )
}
