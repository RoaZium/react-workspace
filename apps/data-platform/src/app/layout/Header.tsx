import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import StorageIcon from '@mui/icons-material/Storage'
import { ThemeToggle } from '@workspace/ui'
import { topNavItems } from './navigation.config'

export function Header() {
  const location = useLocation()

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
        bgcolor: 'primary.main'
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            mr: 4,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <StorageIcon />
          데이터 플랫폼
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {topNavItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: 'white',
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                textTransform: 'none',
                fontWeight: isActive(item.path) ? 600 : 400,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ThemeToggle />
          <Typography variant="body2" sx={{ color: 'white' }}>
            관리자
          </Typography>
          <IconButton sx={{ p: 0 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>관</Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
