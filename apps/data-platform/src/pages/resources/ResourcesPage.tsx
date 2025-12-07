import { useState } from 'react'
import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import { Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, Stack, Chip, TextField, Button, Breadcrumbs, Link, Divider, Tab, Tabs, Grid } from '@mui/material'
import { FilterBar } from '@/shared/components/FilterBar'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

// Mock data
const mockResources = [
  {
    id: 1,
    code: 'RES001',
    name: '온도센서-101',
    categoryName: '환경 센서',
    dataSourceName: 'IoT Sensor Hub',
    resourceType: 'sensor',
    isActive: true,
    description: '건물 A동 1층 로비 온도 센서',
    thresholds: {
      minLow: -40,
      minHigh: -30,
      maxLow: 70,
      maxHigh: 80,
    },
    decimalPlaces: 2,
    unit: '°C',
    attributes: {
      sensorType: 'temperature',
      protocol: 'MQTT',
      topic: 'sensor/temperature/101',
      qos: 1,
    },
    metadata: {
      owner: { name: '홍길동', team: '시설관리팀' },
      location: { building: 'A동', floor: '1층', room: '로비' },
      maintenance: { status: 'normal', lastCheckAt: '2025-01-15' },
    },
  },
  {
    id: 2,
    code: 'RES002',
    name: '습도센서-102',
    categoryName: '환경 센서',
    dataSourceName: 'IoT Sensor Hub',
    resourceType: 'sensor',
    isActive: true,
    description: '건물 A동 1층 로비 습도 센서',
    thresholds: {
      minLow: 0,
      minHigh: 10,
      maxLow: 90,
      maxHigh: 100,
    },
    decimalPlaces: 1,
    unit: '%',
    attributes: {
      sensorType: 'humidity',
      protocol: 'MQTT',
      topic: 'sensor/humidity/102',
      qos: 1,
    },
    metadata: {
      owner: { name: '홍길동', team: '시설관리팀' },
      location: { building: 'A동', floor: '1층', room: '로비' },
      maintenance: { status: 'normal', lastCheckAt: '2025-01-15' },
    },
  },
  {
    id: 3,
    code: 'RES003',
    name: '전력계측기-201',
    categoryName: '전력 센서',
    dataSourceName: 'IoT Sensor Hub',
    resourceType: 'meter',
    isActive: true,
    description: '건물 B동 전력 소비량 계측',
    thresholds: {
      minLow: 0,
      minHigh: 100,
      maxLow: 9000,
      maxHigh: 10000,
    },
    decimalPlaces: 0,
    unit: 'kW',
    attributes: {
      meterType: 'power',
      protocol: 'Modbus',
      slaveId: 201,
    },
    metadata: {
      owner: { name: '김철수', team: '전기팀' },
      location: { building: 'B동', floor: '지하1층', room: '전기실' },
      maintenance: { status: 'normal', lastCheckAt: '2025-01-10' },
    },
  },
  {
    id: 4,
    code: 'RES004',
    name: '압력센서-103',
    categoryName: '환경 센서',
    dataSourceName: 'IoT Sensor Hub',
    resourceType: 'sensor',
    isActive: false,
    description: '건물 A동 공조 시스템 압력 센서',
    thresholds: {
      minLow: 0,
      minHigh: 0.5,
      maxLow: 5,
      maxHigh: 6,
    },
    decimalPlaces: 2,
    unit: 'bar',
    attributes: {
      sensorType: 'pressure',
      protocol: 'MQTT',
      topic: 'sensor/pressure/103',
      qos: 1,
    },
    metadata: {
      owner: { name: '박영희', team: '공조팀' },
      location: { building: 'A동', floor: '옥상', room: '공조실' },
      maintenance: { status: 'maintenance', lastCheckAt: '2025-01-01' },
    },
  },
]

export function ResourcesPage() {
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [selectedResource, setSelectedResource] = useState<typeof mockResources[0] | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <PageLayout>
      <PageHeader
        title="📄 Resource 관리"
        description="데이터 리소스를 관리합니다"
      />
      <PageContent sx={{ p: 0 }}>
        {/* Filter Bar */}
        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Resource 검색..."
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
              id: 'category',
              label: 'Category',
              value: '',
              type: 'select',
              options: [
                { value: 'cat-1', label: '환경 센서' },
                { value: 'cat-2', label: '전력 센서' },
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
              Resource 추가
            </Button>
          }
        />

        {/* Master-Detail Layout (30:70) */}
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
                {mockResources.map((resource) => (
                  <TableRow
                    key={resource.id}
                    hover
                    selected={selectedResource?.id === resource.id}
                    onClick={() => setSelectedResource(resource)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{resource.code}</TableCell>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={resource.isActive ? '활성' : '비활성'}
                        color={resource.isActive ? 'success' : 'default'}
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
            {selectedResource ? (
              <Stack spacing={3}>
                {/* 헤더 */}
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {selectedResource.name}
                  </Typography>
                  <Chip
                    label={selectedResource.isActive ? '활성' : '비활성'}
                    color={selectedResource.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </Box>

                {/* 브레드크럼 */}
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                  <Link underline="hover" color="inherit" href="#">
                    {selectedResource.dataSourceName}
                  </Link>
                  <Link underline="hover" color="inherit" href="#">
                    {selectedResource.categoryName}
                  </Link>
                  <Typography color="text.primary">{selectedResource.name}</Typography>
                </Breadcrumbs>

                <Divider />

                {/* Tabs */}
                <Box>
                  <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                    <Tab label="기본 정보" />
                    <Tab label="임계점 설정" />
                    <Tab label="Attributes" />
                    <Tab label="고급 (JSON)" />
                  </Tabs>

                  {/* Tab 0: 기본 정보 */}
                  {activeTab === 0 && (
                    <Paper sx={{ p: 2, mt: 2 }}>
                      <Stack spacing={2}>
                        <TextField label="코드" value={selectedResource.code} fullWidth size="small" />
                        <TextField label="이름" value={selectedResource.name} fullWidth size="small" />
                        <TextField label="리소스 타입" value={selectedResource.resourceType} fullWidth size="small" />
                        <TextField
                          label="설명"
                          value={selectedResource.description}
                          multiline
                          rows={3}
                          fullWidth
                          size="small"
                        />
                        <TextField label="카테고리" value={selectedResource.categoryName} fullWidth size="small" disabled />
                        <TextField label="데이터 소스" value={selectedResource.dataSourceName} fullWidth size="small" disabled />
                      </Stack>
                    </Paper>
                  )}

                  {/* Tab 1: 임계점 설정 */}
                  {activeTab === 1 && (
                    <Paper sx={{ p: 2, mt: 2 }}>
                      <Stack spacing={3}>
                        <Box>
                          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                            최소값 임계점
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                label="하한 (Min Low)"
                                type="number"
                                value={selectedResource.thresholds.minLow}
                                fullWidth
                                size="small"
                                InputProps={{ endAdornment: selectedResource.unit }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                label="상한 (Min High)"
                                type="number"
                                value={selectedResource.thresholds.minHigh}
                                fullWidth
                                size="small"
                                InputProps={{ endAdornment: selectedResource.unit }}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Box>
                          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                            최대값 임계점
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                label="하한 (Max Low)"
                                type="number"
                                value={selectedResource.thresholds.maxLow}
                                fullWidth
                                size="small"
                                InputProps={{ endAdornment: selectedResource.unit }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                label="상한 (Max High)"
                                type="number"
                                value={selectedResource.thresholds.maxHigh}
                                fullWidth
                                size="small"
                                InputProps={{ endAdornment: selectedResource.unit }}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Divider />

                        <Box>
                          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                            기타 설정
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                label="소수점 자릿수"
                                type="number"
                                value={selectedResource.decimalPlaces}
                                fullWidth
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                label="단위"
                                value={selectedResource.unit}
                                fullWidth
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Stack>
                    </Paper>
                  )}

                  {/* Tab 2: Attributes (구조화된 폼) */}
                  {activeTab === 2 && (
                    <Paper sx={{ p: 2, mt: 2 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          센서/계측기 설정
                        </Typography>
                        {selectedResource.attributes.sensorType && (
                          <TextField
                            label="센서 타입"
                            value={selectedResource.attributes.sensorType}
                            fullWidth
                            size="small"
                          />
                        )}
                        {selectedResource.attributes.meterType && (
                          <TextField
                            label="계측기 타입"
                            value={selectedResource.attributes.meterType}
                            fullWidth
                            size="small"
                          />
                        )}

                        <Divider />

                        <Typography variant="subtitle1" fontWeight={600}>
                          통신 설정
                        </Typography>
                        <TextField
                          label="프로토콜"
                          value={selectedResource.attributes.protocol}
                          fullWidth
                          size="small"
                        />
                        {selectedResource.attributes.topic && (
                          <>
                            <TextField
                              label="MQTT Topic"
                              value={selectedResource.attributes.topic}
                              fullWidth
                              size="small"
                            />
                            <TextField
                              label="QoS"
                              type="number"
                              value={selectedResource.attributes.qos}
                              fullWidth
                              size="small"
                            />
                          </>
                        )}
                        {selectedResource.attributes.slaveId && (
                          <TextField
                            label="Modbus Slave ID"
                            type="number"
                            value={selectedResource.attributes.slaveId}
                            fullWidth
                            size="small"
                          />
                        )}

                        <Divider />

                        <Typography variant="subtitle1" fontWeight={600}>
                          메타데이터
                        </Typography>
                        <TextField
                          label="담당자"
                          value={selectedResource.metadata.owner.name}
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="담당팀"
                          value={selectedResource.metadata.owner.team}
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="위치 (건물)"
                          value={selectedResource.metadata.location.building}
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="위치 (층)"
                          value={selectedResource.metadata.location.floor}
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="위치 (방)"
                          value={selectedResource.metadata.location.room}
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="유지보수 상태"
                          value={selectedResource.metadata.maintenance.status}
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="마지막 점검일"
                          value={selectedResource.metadata.maintenance.lastCheckAt}
                          fullWidth
                          size="small"
                          disabled
                        />
                      </Stack>
                    </Paper>
                  )}

                  {/* Tab 3: 고급 (JSON) */}
                  {activeTab === 3 && (
                    <Paper sx={{ p: 2, mt: 2 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Attributes (JSON)
                        </Typography>
                        <TextField
                          multiline
                          rows={8}
                          fullWidth
                          defaultValue={JSON.stringify(selectedResource.attributes, null, 2)}
                          sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                        />

                        <Divider />

                        <Typography variant="subtitle1" fontWeight={600}>
                          Metadata (JSON)
                        </Typography>
                        <TextField
                          multiline
                          rows={8}
                          fullWidth
                          defaultValue={JSON.stringify(selectedResource.metadata, null, 2)}
                          sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                        />
                      </Stack>
                    </Paper>
                  )}
                </Box>

                {/* 액션 버튼 */}
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" startIcon={<EditIcon />} fullWidth>
                    편집
                  </Button>
                  <Button variant="outlined" startIcon={<StarBorderIcon />} fullWidth>
                    즐겨찾기
                  </Button>
                  <Button variant="outlined" color="error" startIcon={<DeleteIcon />} fullWidth>
                    삭제
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="body1" color="text.secondary">
                  왼쪽 목록에서 Resource를 선택하세요
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
