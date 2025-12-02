import DashboardIcon from '@mui/icons-material/Dashboard'
import StorageIcon from '@mui/icons-material/Storage'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import VerifiedIcon from '@mui/icons-material/Verified'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import HomeIcon from '@mui/icons-material/Home'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import SearchIcon from '@mui/icons-material/Search'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'

export interface NavItem {
  label: string
  path: string
  icon: React.ReactElement
}

export interface SidebarSection {
  section: string
  items: NavItem[]
}

// 상단 네비게이션 메뉴 항목
export const topNavItems: NavItem[] = [
  { label: '대시보드', path: '/', icon: <DashboardIcon /> },
  { label: '데이터 허브', path: '/datahub', icon: <StorageIcon /> },
  { label: '파이프라인', path: '/pipeline', icon: <AccountTreeIcon /> },
  { label: '카탈로그', path: '/catalog', icon: <LibraryBooksIcon /> },
  { label: '품질관리', path: '/quality', icon: <VerifiedIcon /> },
  { label: '레이아웃', path: '/layouts', icon: <ViewQuiltIcon /> },
]

// 사이드바 메뉴 항목 (섹션별)
export const sidebarMenus: Record<string, NavItem[]> = {
  layouts: [
    { label: '레이아웃 홈', path: '/layouts', icon: <ViewQuiltIcon /> },
    { label: '기본 레이아웃', path: '/layouts/basic', icon: <ViewQuiltIcon /> },
    { label: '2단 컬럼', path: '/layouts/2column', icon: <ViewColumnIcon /> },
    { label: '3단 컬럼', path: '/layouts/3column', icon: <ViewColumnIcon /> },
    { label: '4단 컬럼', path: '/layouts/4column', icon: <ViewColumnIcon /> },
    { label: '3단 행', path: '/layouts/3rows', icon: <ViewStreamIcon /> },
    { label: '검색 레이아웃', path: '/layouts/search', icon: <SearchIcon /> },
    { label: '3단 컬럼 계층', path: '/layouts/hierarchy', icon: <AccountTreeOutlinedIcon /> },
  ],
  dashboard: [
    { label: '대시보드 홈', path: '/', icon: <DashboardIcon /> },
  ],
  datahub: [
    { label: '데이터 허브 홈', path: '/datahub', icon: <StorageIcon /> },
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
}

// 홈 아이콘
export const homeIcon = <HomeIcon />
