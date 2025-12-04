/**
 * Section Templates - 섹션 템플릿 (Main Content 내부 구조)
 *
 * 모든 섹션 템플릿은 다음 구조를 따릅니다:
 * 1. SectionTitle (공통): 섹션 타이틀 및 메타 정보
 * 2. 용도별 슬롯: 각 템플릿의 특성에 맞는 슬롯 (MasterPanel, NavigationPanel 등)
 *
 * 디자인 원칙:
 * - 패딩: 12px (1.5 MUI spacing)
 * - 간격: 12px (1.5 MUI spacing)
 * - 타이틀 폰트: 15px (0.9375rem), semibold
 * - 보조 텍스트: 13px (0.8125rem)
 * - border: 1px solid divider
 * - elevation: 0 (flat design)
 */

export { MasterDetailSection } from './MasterDetailSection'
export { ThreeColumnSection } from './ThreeColumnSection'
export { GridSection } from './GridSection'
export { SingleColumnSection } from './SingleColumnSection'
