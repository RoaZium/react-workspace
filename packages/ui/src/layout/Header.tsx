import { useState, MouseEvent } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
  Badge,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { NavItem } from './types'
import { useSidebar } from './SidebarContext'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
  appTitle: string
  topNavItems: NavItem[]
  username?: string
  onLogout?: () => void
}

export function Header({ appTitle, topNavItems, username = '관리자', onLogout }: HeaderProps) {
  const location = useLocation()
  const { toggleSidebar } = useSidebar()
  const { theme, toggleTheme } = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    onLogout?.()
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          edge="start"
          sx={{
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            background:
              theme === 'dark'
                ? 'linear-gradient(45deg, #60a5fa 30%, #38bdf8 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
            mr: 4,
            transition: 'all 0.3s ease',
          }}
        >
          {appTitle}
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 0.5 }}>
          {topNavItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: 'text.primary',
                position: 'relative',
                px: 2,
                py: 1,
                textTransform: 'none',
                fontSize: '0.9375rem',
                fontWeight: isActive(item.path) ? 600 : 500,
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                '&::after': isActive(item.path)
                  ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '70%',
                      height: 3,
                      bgcolor: 'primary.main',
                      borderRadius: '3px 3px 0 0',
                    }
                  : {},
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: 'text.primary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'rotate(180deg)',
                },
              }}
            >
              {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="Account">
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                p: 0.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: 2,
                  borderColor: open ? 'primary.main' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {username.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                  borderRadius: 1,
                  mx: 1,
                  transition: 'all 0.2s ease',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5, mb: 1 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                admin@example.com
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
