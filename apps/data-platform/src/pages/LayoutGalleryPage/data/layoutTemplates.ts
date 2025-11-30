import type { LayoutTemplate } from '../types'
import { BasicLayoutPage } from '@/pages/layouts/BasicLayoutPage'
import { TwoColumnLayoutPage } from '@/pages/layouts/TwoColumnLayoutPage'
import { ThreeColumnLayoutPage } from '@/pages/layouts/ThreeColumnLayoutPage'
import { FourColumnLayoutPage } from '@/pages/layouts/FourColumnLayoutPage'
import { ThreeRowsLayoutPage } from '@/pages/layouts/ThreeRowsLayoutPage'
import { SearchLayoutPage } from '@/pages/layouts/SearchLayoutPage'

export const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'basic-layout',
    name: '기본 레이아웃',
    description: '단순하고 깔끔한 기본 섹션 레이아웃으로, 빠른 프로토타이핑에 적합합니다.',
    category: 'basic',
    thumbnail: '/thumbnails/basic-layout.png',
    component: BasicLayoutPage,
    code: `import { BasicLayout } from '@workspace/ui/layouts'

export function BasicLayoutPage() {
  return (
    <BasicLayout>
      <BasicLayout.Section />
      <BasicLayout.Section />
      <BasicLayout.Section />
    </BasicLayout>
  )
}`,
    features: ['심플한 구조', '빠른 구현', '반응형 지원'],
    useCase: '간단한 페이지, 정보 표시, 프로토타입',
    path: '/layouts/basic',
  },
  {
    id: 'two-column-layout',
    name: '2단 컬럼 레이아웃',
    description: '콘텐츠를 두 개의 컬럼으로 나누어 표시하는 레이아웃입니다.',
    category: 'column',
    thumbnail: '/thumbnails/two-column-layout.png',
    component: TwoColumnLayoutPage,
    code: `import { MultiColumnLayout } from '@workspace/ui/layouts'

export function TwoColumnLayoutPage() {
  return (
    <MultiColumnLayout columns={2}>
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
    </MultiColumnLayout>
  )
}`,
    features: ['2단 구조', '비율 조절 가능', '반응형 자동 변환'],
    useCase: '상세/목록 페이지, 필터/콘텐츠 분리, 비교 화면',
    path: '/layouts/2column',
  },
  {
    id: 'three-column-layout',
    name: '3단 컬럼 레이아웃',
    description: '콘텐츠를 세 개의 컬럼으로 균등하게 분할하여 표시합니다.',
    category: 'column',
    thumbnail: '/thumbnails/three-column-layout.png',
    component: ThreeColumnLayoutPage,
    code: `import { MultiColumnLayout } from '@workspace/ui/layouts'

export function ThreeColumnLayoutPage() {
  return (
    <MultiColumnLayout columns={3}>
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
    </MultiColumnLayout>
  )
}`,
    features: ['3단 균등 분할', '대시보드 최적화', '반응형 스택'],
    useCase: '대시보드 메트릭, 카드 그리드, 통계 표시',
    path: '/layouts/3column',
  },
  {
    id: 'four-column-layout',
    name: '4단 컬럼 레이아웃',
    description: '네 개의 컬럼으로 분할하여 많은 정보를 효율적으로 표시합니다.',
    category: 'column',
    thumbnail: '/thumbnails/four-column-layout.png',
    component: FourColumnLayoutPage,
    code: `import { MultiColumnLayout } from '@workspace/ui/layouts'

export function FourColumnLayoutPage() {
  return (
    <MultiColumnLayout columns={4}>
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
    </MultiColumnLayout>
  )
}`,
    features: ['4단 그리드', '고밀도 정보', '카드 레이아웃'],
    useCase: '제품 그리드, 갤러리, 다중 위젯 대시보드',
    path: '/layouts/4column',
  },
  {
    id: 'three-rows-layout',
    name: '3단 행 레이아웃',
    description: '헤더, 콘텐츠, 푸터로 구성된 전통적인 3단 레이아웃입니다.',
    category: 'row',
    thumbnail: '/thumbnails/three-rows-layout.png',
    component: ThreeRowsLayoutPage,
    code: `import { RowLayout } from '@workspace/ui/layouts'

export function ThreeRowsLayoutPage() {
  return (
    <RowLayout>
      <RowLayout.Header />
      <RowLayout.Content />
      <RowLayout.Footer />
    </RowLayout>
  )
}`,
    features: ['헤더/콘텐츠/푸터', '고정 헤더 지원', 'Sticky 푸터'],
    useCase: '표준 페이지, 랜딩 페이지, 폼 페이지',
    path: '/layouts/3rows',
  },
  {
    id: 'search-layout',
    name: '검색 레이아웃',
    description: '검색 필터와 결과 목록을 효율적으로 배치한 레이아웃입니다.',
    category: 'search',
    thumbnail: '/thumbnails/search-layout.png',
    component: SearchLayoutPage,
    code: `import { SearchLayout } from '@workspace/ui/layouts'

export function SearchLayoutPage() {
  return (
    <SearchLayout>
      <SearchLayout.Filters />
      <SearchLayout.Results />
    </SearchLayout>
  )
}`,
    features: ['필터 사이드바', '검색 결과 영역', '정렬/페이징'],
    useCase: '검색 페이지, 상품 목록, 데이터 탐색',
    path: '/layouts/search',
  },
]

export const categories = [
  { id: 'all' as const, name: '전체', icon: '📋' },
  { id: 'basic' as const, name: '기본', icon: '📄' },
  { id: 'column' as const, name: '컬럼', icon: '📊' },
  { id: 'row' as const, name: '행', icon: '📐' },
  { id: 'search' as const, name: '검색', icon: '🔍' },
]
