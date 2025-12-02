import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Toolbar } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { sidebarMenus } from './navigation.config'

const DRAWER_WIDTH = 240

// 공통 ListItemButton 스타일
const menuItemStyles = {
  color: 'var(--text-primary)',
  '&.Mui-selected': {
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    color: 'primary.main',
    borderLeft: '4px solid',
    borderColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.12)',
    },
  },
  '&:hover': {
    backgroundColor: 'var(--button-hover)',
  },
  '& .MuiListItemText-primary': {
    color: 'inherit',
  },
}

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  // 현재 어떤 섹션인지 판단
  const currentSection = location.pathname.split('/')[1] || 'dashboard'
  const currentMenuItems = sidebarMenus[currentSection] || []

  const isActive = (path: string) => {
    if (path === '/' && currentSection === 'dashboard') {
      return location.pathname === '/'
    }
    return location.pathname === path
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname === '/'}
            onClick={() => navigate('/')}
            sx={menuItemStyles}
          >
            <ListItemText primary="홈" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ borderColor: 'var(--border-color)' }} />

      <List sx={{ flex: 1, overflowY: 'auto' }}>
        {currentMenuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => navigate(item.path)}
              sx={menuItemStyles}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
