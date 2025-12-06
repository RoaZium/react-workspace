import { useState } from 'react'
import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemText, Collapse, Chip, TextField, Stack, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material'
import { FilterBar } from '@/shared/components/FilterBar'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FolderIcon from '@mui/icons-material/Folder'
import CategoryIcon from '@mui/icons-material/Category'
import AddIcon from '@mui/icons-material/Add'

// Mock data
const mockDataSourceTree = [
  {
    id: 'ds-1',
    name: 'IoT Sensor Hub',
    categories: [
      { id: 'cat-1', name: '환경 센서', code: 'CAT001' },
      { id: 'cat-2', name: '전력 센서', code: 'CAT002' },
    ],
  },
  {
    id: 'ds-2',
    name: 'ERP System',
    categories: [
      { id: 'cat-3', name: '재무 데이터', code: 'CAT003' },
      { id: 'cat-4', name: '인사 데이터', code: 'CAT004' },
    ],
  },
]

const mockCategories = [
  { id: 'cat-1', code: 'CAT001', name: '환경 센서', dsId: 'ds-1', dsName: 'IoT Sensor Hub', isActive: true, resourceCount: 24 },
  { id: 'cat-2', code: 'CAT002', name: '전력 센서', dsId: 'ds-1', dsName: 'IoT Sensor Hub', isActive: true, resourceCount: 12 },
]

export function CategoriesPage() {
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [selectedCategory, setSelectedCategory] = useState<typeof mockCategories[0] | null>(null)
  const [expandedDs, setExpandedDs] = useState<string[]>(['ds-1', 'ds-2'])

  return (
    <PageLayout>
      <PageHeader
        title="📁 Category 관리"
        description="데이터 카테고리를 관리합니다"
      />
      <PageContent sx={{ p: 0 }}>
        {/* Filter Bar */}
        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Category 검색..."
          filters={[
            {
              id: 'dataSource',
              label: 'DataSource',
              value: '',
              type: 'select',
              options: [
                { value: 'ds-1', label: 'IoT Sensor Hub' },
                { value: 'ds-2', label: 'ERP System' },
              ],
            },
            {
              id: 'isActive',
              label: '상태',
              value: '',
              type: 'boolean',
            },
          ]}
          onFilterChange={(id, value) => setFilters({ ...filters, [id]: value })}
          activeFilters={filters}
          rightAction={
            <Button variant="contained" startIcon={<AddIcon />}>
              Category 추가
            </Button>
          }
        />

        {/* Three Column Layout (2:3:5) */}
        <Box sx={{ display: 'flex', height: 'calc(100vh - 250px)' }}>
          {/* Tree Panel (20%) */}
          <Box sx={{ width: '20%', borderRight: '1px solid', borderColor: 'divider', overflow: 'auto', p: 2 }}>
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              DataSource / Category
            </Typography>
            <List dense sx={{ mt: 1 }}>
              {mockDataSourceTree.map((ds) => (
                <Box key={ds.id}>
                  <ListItemButton
                    onClick={() => {
                      setExpandedDs((prev) =>
                        prev.includes(ds.id) ? prev.filter((id) => id !== ds.id) : [...prev, ds.id]
                      )
                    }}
                  >
                    {expandedDs.includes(ds.id) ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                    <FolderIcon fontSize="small" color="primary" sx={{ ml: 1, mr: 1 }} />
                    <ListItemText primary={ds.name} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItemButton>
                  <Collapse in={expandedDs.includes(ds.id)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {ds.categories.map((cat) => (
                        <ListItemButton key={cat.id} sx={{ pl: 4 }}>
                          <CategoryIcon fontSize="small" color="secondary" sx={{ mr: 1 }} />
                          <ListItemText primary={cat.name} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
          </Box>

          {/* Master Panel (30%) */}
          <Box sx={{ width: '30%', borderRight: '1px solid', borderColor: 'divider', overflow: 'auto' }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>코드</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockCategories.map((cat) => (
                  <TableRow
                    key={cat.id}
                    hover
                    selected={selectedCategory?.id === cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{cat.code}</TableCell>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={cat.isActive ? '활성' : '비활성'}
                        color={cat.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Detail Panel (50%) */}
          <Box sx={{ width: '50%', p: 3, overflow: 'auto' }}>
            {selectedCategory ? (
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {selectedCategory.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCategory.dsName} &gt; {selectedCategory.name}
                  </Typography>
                  <Chip
                    label={selectedCategory.isActive ? '활성' : '비활성'}
                    color={selectedCategory.isActive ? 'success' : 'default'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>

                {/* Category 정보 폼 */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Category 정보
                  </Typography>
                  <Stack spacing={2}>
                    <TextField label="코드" value={selectedCategory.code} fullWidth size="small" />
                    <TextField label="이름" value={selectedCategory.name} fullWidth size="small" />
                    <TextField
                      label="설명"
                      multiline
                      rows={3}
                      defaultValue="이 카테고리는 환경 관련 센서 데이터를 수집합니다."
                      fullWidth
                      size="small"
                    />
                  </Stack>
                </Paper>

                {/* Attributes 편집 */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Attributes (JSON Editor)
                  </Typography>
                  <TextField
                    multiline
                    rows={6}
                    fullWidth
                    defaultValue={JSON.stringify(
                      {
                        validation: { required: true, dataType: 'number' },
                        retention: { enabled: true, period: 365 },
                      },
                      null,
                      2
                    )}
                    sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                  />
                </Paper>

                {/* 하위 Resources */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    하위 Resources ({selectedCategory.resourceCount}개)
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="온도센서-101" secondary="sensor" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="습도센서-102" secondary="sensor" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="압력센서-103" secondary="sensor" />
                    </ListItem>
                  </List>
                </Paper>
              </Stack>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="body1" color="text.secondary">
                  중앙 목록에서 Category를 선택하세요
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
