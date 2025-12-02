import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SidebarProvider } from './SidebarContext'
import { LayoutConfig } from './types'

interface AppLayoutProps {
  config: LayoutConfig
  username?: string
}

export function AppLayout({ config, username }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: 'var(--bg-primary)' }}>
        <Header
          appTitle={config.appTitle}
          topNavItems={config.topNavItems}
          username={username}
        />
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
            <Outlet />
          </Box>
        </Box>
      </Box>
    </SidebarProvider>
  )
}
