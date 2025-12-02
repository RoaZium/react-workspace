import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Toolbar, Tooltip } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavItem } from './types'
import { useSidebar } from './SidebarContext'

const DRAWER_WIDTH = 240
const DRAWER_WIDTH_COLLAPSED = 0

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

interface SidebarProps {
  sidebarMenus: Record<string, NavItem[]>
}

export function Sidebar({ sidebarMenus }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isOpen } = useSidebar()

  const currentSection = location.pathname.split('/')[1] || 'dashboard'
  const currentMenuItems = sidebarMenus[currentSection] || []

  const isActive = (path: string) => {
    if (path === '/' && currentSection === 'dashboard') {
      return location.pathname === '/'
    }
    return location.pathname === path
  }

  const drawerWidth = isOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          bgcolor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <Tooltip title={isOpen ? '' : '홈'} placement="right">
            <ListItemButton
              selected={location.pathname === '/'}
              onClick={() => navigate('/')}
              sx={{
                ...menuItemStyles,
                justifyContent: isOpen ? 'initial' : 'center',
                px: isOpen ? 2 : 1.5,
              }}
            >
              <ListItemText
                primary="홈"
                sx={{
                  opacity: isOpen ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>

      <Divider sx={{ borderColor: 'var(--border-color)' }} />

      <List sx={{ flex: 1, overflowY: 'auto' }}>
        {currentMenuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <Tooltip title={isOpen ? '' : item.label} placement="right">
              <ListItemButton
                selected={isActive(item.path)}
                onClick={() => navigate(item.path)}
                sx={{
                  ...menuItemStyles,
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: isOpen ? 2 : 1.5,
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
