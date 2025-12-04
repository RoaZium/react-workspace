import { ReactElement } from 'react'

export interface NavItem {
  label: string
  path: string
  icon: ReactElement
}

export interface SidebarSection {
  section: string
  items: NavItem[]
}

export interface LayoutConfig {
  appTitle: string
  topNavItems: NavItem[]
  sidebarMenus: Record<string, NavItem[]>
}
