import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: 'var(--bg-primary)' }}>
      <Header />
      <Sidebar />
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
  )
}
