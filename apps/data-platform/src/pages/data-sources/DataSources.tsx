import { useState } from 'react'
import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import { Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, Chip, TextField, Stack, Button } from '@mui/material'
import { FilterBar } from '@/shared/components/FilterBar'
import AddIcon from '@mui/icons-material/Add'

// Mock data
const mockDataSources = [
  { id: 1, code: 'DS001', name: 'IoT Sensor Hub', userId: 'user-001', isActive: true, createdAt: '2025-01-15' },
  { id: 2, code: 'DS002', name: 'ERP System', userId: 'user-002', isActive: true, createdAt: '2025-01-10' },
  { id: 3, code: 'DS003', name: 'CRM Database', userId: 'user-001', isActive: false, createdAt: '2025-01-05' },
  { id: 4, code: 'DS004', name: 'Legacy MQTT Broker', userId: 'user-003', isActive: true, createdAt: '2024-12-20' },
]

export function DataSources() {
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [selectedDataSource, setSelectedDataSource] = useState<typeof mockDataSources[0] | null>(null)

  return (
    <PageLayout>
      <PageHeader
        title="DataSource 관리"
        description="데이터 출처를 관리합니다"
      />
      <PageContent sx={{ p: 0 }}>
        {/* Filter Bar */}
        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="DataSource 검색..."
          filters={[
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
              DataSource 추가
            </Button>
          }
        />

        {/* Master-Detail Layout (3:7) */}
        <Box sx={{ display: 'flex', height: 'calc(100vh - 250px)' }}>
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
                {mockDataSources.map((ds) => (
                  <TableRow
                    key={ds.id}
                    hover
                    selected={selectedDataSource?.id === ds.id}
                    onClick={() => setSelectedDataSource(ds)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{ds.code}</TableCell>
                    <TableCell>{ds.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={ds.isActive ? '활성' : '비활성'}
                        color={ds.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Detail Panel (70%) */}
          <Box sx={{ width: '70%', p: 3, overflow: 'auto' }}>
            {selectedDataSource ? (
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {selectedDataSource.name}
                  </Typography>
                  <Chip
                    label={selectedDataSource.isActive ? '활성' : '비활성'}
                    color={selectedDataSource.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </Box>

                {/* 기본 정보 폼 */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    기본 정보
                  </Typography>
                  <Stack spacing={2}>
                    <TextField label="코드" value={selectedDataSource.code} fullWidth size="small" />
                    <TextField label="이름" value={selectedDataSource.name} fullWidth size="small" />
                    <TextField label="관리자 ID" value={selectedDataSource.userId} fullWidth size="small" />
                    <TextField label="생성일" value={selectedDataSource.createdAt} fullWidth size="small" disabled />
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
                    defaultValue={JSON.stringify({ protocol: 'MQTT', timeout: 5000, host: 'mqtt.example.com', port: 1883 }, null, 2)}
                    sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                  />
                </Paper>

                {/* Metadata 편집 */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Metadata (JSON Editor)
                  </Typography>
                  <TextField
                    multiline
                    rows={6}
                    fullWidth
                    defaultValue={JSON.stringify({ tags: ['production', 'iot'], documentationUrl: 'https://docs.example.com' }, null, 2)}
                    sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                  />
                </Paper>

                {/* 연결된 Categories */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    연결된 Categories
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    이 DataSource에 속한 카테고리 목록이 표시됩니다.
                  </Typography>
                </Paper>
              </Stack>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="body1" color="text.secondary">
                  왼쪽 목록에서 DataSource를 선택하세요
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
