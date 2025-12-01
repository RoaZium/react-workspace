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
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Datasource', path: '/datasource', icon: <StorageIcon /> },
  { label: 'Pipeline', path: '/pipeline', icon: <AccountTreeIcon /> },
  { label: 'Catalog', path: '/catalog', icon: <LibraryBooksIcon /> },
  { label: 'Quality', path: '/quality', icon: <VerifiedIcon /> },
  { label: 'Layouts', path: '/layouts', icon: <ViewQuiltIcon /> },
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
  ],
  dashboard: [
    { label: 'Dashboard Home', path: '/', icon: <DashboardIcon /> },
  ],
  datasource: [
    { label: 'Datasource Home', path: '/datasource', icon: <StorageIcon /> },
  ],
  pipeline: [
    { label: 'Pipeline Home', path: '/pipeline', icon: <AccountTreeIcon /> },
  ],
  catalog: [
    { label: 'Catalog Home', path: '/catalog', icon: <LibraryBooksIcon /> },
  ],
  quality: [
    { label: 'Quality Home', path: '/quality', icon: <VerifiedIcon /> },
  ],
}

// 홈 아이콘
export const homeIcon = <HomeIcon />
