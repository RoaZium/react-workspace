/**
 * @workspace/ui - UI Component Library
 *
 * Feature-Sliced Design (FSD) 아키텍처 기반
 */

// ============================================
// Layouts
// ============================================

export {
  // App Shell
  AppShell,
  Header,
  Sidebar,
  SidebarProvider,
  useSidebar,
  // Page
  Page,
  PageHeader,
  PageContent,
  // Split
  MasterDetail,
  ThreeColumn,
  TwoColumnPlusSplitLayout,
  MasterDetailLayout,
  // Grid
  Grid,
  // Stack
  Stack,
  // Special
  TabLayout,
  SearchLayout,
} from './layouts'

export type { LayoutConfig, NavItem, SidebarSection } from './layouts'

// ============================================
// New Layout Architecture
// ============================================

// Section Templates (2nd layer)
export {
  MasterDetailSection,
  GridSection,
  ThreeColumnSection,
  SingleColumnSection,
} from './layouts/sections'

// Page Templates (1st layer)
// (to be added as needed)

// ============================================
// Components
// ============================================

export { Card, StatCard } from './components/Card'
export { Button } from './components/Button'
export { Table } from './components/Table'
export { ThemeToggle } from './components/ThemeToggle'

// ============================================
// Theme & Providers
// ============================================

export { ThemeProvider, useTheme } from './contexts/ThemeContext'
export type { Theme } from './contexts/ThemeContext'
export { MuiThemeProvider } from './providers'

// ============================================
// Legacy Aliases - 하위 호환성
// ============================================

// @deprecated - Use AppShell
export { AppShell as AppLayout } from './layouts'

// @deprecated - Use Page
export { Page as PageLayout, Page as PageTemplate } from './layouts'
// PageHeader and PageContent are already exported above

// @deprecated - Use Grid
export { Grid as GridLayout } from './layouts'

// @deprecated - Use ThreeColumn
export { ThreeColumn as ThreeColumnLayout } from './layouts'

// @deprecated - Use Stack or Grid
export { Stack as SingleColumnLayout } from './layouts'
