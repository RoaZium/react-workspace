// Theme
export { ThemeProvider, useTheme } from './contexts/ThemeContext'
export type { Theme } from './contexts/ThemeContext'

// Providers (optional)
export { MuiThemeProvider } from './providers'

// App Layout (Navigation & Sidebar)
export { AppLayout, Header, Sidebar, SidebarProvider, useSidebar, type NavItem, type SidebarSection, type LayoutConfig } from './layout'

// Page Layouts
export { PageLayout, PageHeader, PageContent } from './layouts/PageLayout'
export { GridLayout } from './layouts/GridLayout'
export { SplitLayout } from './layouts/SplitLayout'
export { TabLayout } from './layouts/TabLayout'

// Wireframe Layouts
export { BasicLayout } from './layouts/wireframes/BasicLayout'
export { MultiColumnLayout } from './layouts/wireframes/MultiColumnLayout'
export { RowsLayout } from './layouts/wireframes/RowsLayout'
export { SearchLayout } from './layouts/wireframes/SearchLayout'
export { ThreeColumnHierarchyLayout } from './layouts/wireframes/ThreeColumnHierarchyLayout'

// Components
export { Card, StatCard } from './components/Card'
export { Button } from './components/Button'
export { Table } from './components/Table'
export { ThemeToggle } from './components/ThemeToggle'
