import DashboardIcon from '@mui/icons-material/Dashboard'
import StorageIcon from '@mui/icons-material/Storage'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import InsightsIcon from '@mui/icons-material/Insights'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import SearchIcon from '@mui/icons-material/Search'
import BusinessIcon from '@mui/icons-material/Business'
import CloudIcon from '@mui/icons-material/Cloud'
import CategoryIcon from '@mui/icons-material/Category'
import DescriptionIcon from '@mui/icons-material/Description'
import type { LayoutConfig } from '@workspace/ui'

/**
 * 데이터 플랫폼 네비게이션 설정 (도메인 중심)
 *
 * 도메인 영역:
 * - Dashboard: 통합 모니터링 및 지표
 * - Data Hub: 데이터소스/카테고리/리소스 계층 관리
 * - Data Collection: 데이터 수집 및 연동 관리
 * - Data Monitoring: 데이터 관제 및 실시간 모니터링
 * - Dashboard Studio: 대시보드 생성 및 편집
 * - Data Insights: 데이터 분석 및 인사이트
 */
export const layoutConfig: LayoutConfig = {
  appTitle: '데이터 플랫폼',
  topNavItems: [
    { label: '홈', path: '/', icon: <DashboardIcon /> },
    { label: '데이터 허브', path: '/datahub', icon: <StorageIcon /> },
    { label: '데이터 수집', path: '/data-collection', icon: <CloudUploadIcon /> },
    { label: '데이터 관제', path: '/data-monitoring', icon: <MonitorHeartIcon /> },
    { label: '대시보드 스튜디오', path: '/dashboard-studio', icon: <SpaceDashboardIcon /> },
    { label: '데이터 인사이트', path: '/data-insights', icon: <InsightsIcon /> },
    { label: '레이아웃 갤러리', path: '/layouts', icon: <ViewQuiltIcon /> },
  ],
  sidebarMenus: {
    layouts: [
      { label: '기본 레이아웃', path: '/layouts/basic', icon: <ViewQuiltIcon /> },
      { label: '2단 컬럼', path: '/layouts/2column', icon: <ViewColumnIcon /> },
      { label: '3단 컬럼', path: '/layouts/3column', icon: <ViewColumnIcon /> },
      { label: '4단 컬럼', path: '/layouts/4column', icon: <ViewColumnIcon /> },
      { label: '3단 행', path: '/layouts/3rows', icon: <ViewStreamIcon /> },
      { label: '검색 레이아웃', path: '/layouts/search', icon: <SearchIcon /> },
    ],
    datahub: [
      { label: '회사', path: '/datahub/companies', icon: <BusinessIcon /> },
      { label: '데이터 소스', path: '/datahub/datasources', icon: <CloudIcon /> },
      { label: '카테고리', path: '/datahub/categories', icon: <CategoryIcon /> },
      { label: '리소스', path: '/datahub/resources', icon: <DescriptionIcon /> },
    ],
    'data-collection': [],
    'data-monitoring': [],
    'dashboard-studio': [],
    'data-insights': [],
  },
}
