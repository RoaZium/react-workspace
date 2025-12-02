import DashboardIcon from '@mui/icons-material/Dashboard'
import StorageIcon from '@mui/icons-material/Storage'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import VerifiedIcon from '@mui/icons-material/Verified'
import type { LayoutConfig } from '@workspace/ui/src/layout/types'

/**
 * 데이터 플랫폼 네비게이션 설정 (도메인 중심)
 *
 * 도메인 영역:
 * - Dashboard: 통합 모니터링 및 지표
 * - Data Hub: 데이터소스/카테고리/리소스 계층 관리
 * - Pipeline: 데이터 파이프라인 및 ETL/ELT 관리
 * - Catalog: 데이터 자산 검색 및 메타데이터
 * - Quality: 데이터 품질 검증 및 모니터링
 */
export const layoutConfig: LayoutConfig = {
  appTitle: '데이터 플랫폼',
  topNavItems: [
    { label: '대시보드', path: '/', icon: <DashboardIcon /> },
    { label: '데이터 허브', path: '/datahub', icon: <StorageIcon /> },
    { label: '파이프라인', path: '/pipeline', icon: <AccountTreeIcon /> },
    { label: '카탈로그', path: '/catalog', icon: <LibraryBooksIcon /> },
    { label: '품질관리', path: '/quality', icon: <VerifiedIcon /> },
  ],
  sidebarMenus: {
    dashboard: [
      { label: '대시보드 홈', path: '/', icon: <DashboardIcon /> },
    ],
    datahub: [
      { label: '데이터소스 관리', path: '/datahub', icon: <StorageIcon /> },
    ],
    pipeline: [
      { label: '파이프라인 홈', path: '/pipeline', icon: <AccountTreeIcon /> },
    ],
    catalog: [
      { label: '카탈로그 홈', path: '/catalog', icon: <LibraryBooksIcon /> },
    ],
    quality: [
      { label: '품질관리 홈', path: '/quality', icon: <VerifiedIcon /> },
    ],
  },
}
