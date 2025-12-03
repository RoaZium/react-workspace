import type { ReactNode } from 'react'
import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SidebarProvider } from './SidebarContext'
import type { LayoutConfig } from './types'

interface AppShellProps {
  config: LayoutConfig
  username?: string
  children?: ReactNode
}

/**
 * AppShell - Application Shell Pattern
 *
 * 앱 전체를 감싸는 최상위 레이아웃 컴포넌트
 * Header, Sidebar, Main Content 영역을 제공
 *
 * @example
 * ```tsx
 * <AppShell config={layoutConfig}>
 *   <Outlet />
 * </AppShell>
 * ```
 */
export function AppShell({ config, username, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: 'var(--bg-primary)' }}>
        <Header appTitle={config.appTitle} topNavItems={config.topNavItems} username={username} />
        <Sidebar sidebarMenus={config.sidebarMenus} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'var(--bg-primary)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Toolbar />
          <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            {children || <Outlet />}
          </Box>
        </Box>
      </Box>
    </SidebarProvider>
  )
}
