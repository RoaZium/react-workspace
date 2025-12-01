import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Toolbar, Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { sidebarMenus } from './navigation.config'

const DRAWER_WIDTH = 240

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
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={location.pathname === '/'}
              onClick={() => navigate('/')}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          {currentMenuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={isActive(item.path)}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
