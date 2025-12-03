import type { ReactNode } from 'react'
import { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'

interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabLayoutProps {
  tabs: TabItem[]
  defaultTab?: string
}

export function TabLayout({ tabs, defaultTab }: TabLayoutProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeContent = tabs.find((t) => t.id === activeTab)?.content

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
        {tabs.map((tab) => (
          <Tab key={tab.id} value={tab.id} label={tab.label} />
        ))}
      </Tabs>
      <Box sx={{ flex: 1, mt: 2, overflow: 'auto' }}>{activeContent}</Box>
    </Box>
  )
}
