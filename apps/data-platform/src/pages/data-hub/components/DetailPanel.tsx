/**
 * DetailPanel Component
 *
 * 선택된 항목(DataSource, Category, Resource)의 상세 정보 표시
 * - 기본 정보
 * - Attributes (기술 정보)
 * - Metadata (관리 정보)
 * - 타임스탬프
 */

import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import BusinessIcon from '@mui/icons-material/Business'
import ScheduleIcon from '@mui/icons-material/Schedule'
import type { DataSource } from '@/entities/data-source'
import type { Category } from '@/entities/category'
import type { Resource } from '@/entities/resource'

export interface DetailPanelProps {
  type: 'dataSource' | 'category' | 'resource' | null
  data: DataSource | Category | Resource | null
}

export function DetailPanel({ type, data }: DetailPanelProps) {
  if (!type || !data) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box textAlign="center" p={4}>
          <InfoIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            항목을 선택하세요
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            좌측 트리에서 DataSource, Category 또는 Resource를 선택하면
            <br />
            상세 정보가 여기에 표시됩니다
          </Typography>
        </Box>
      </Paper>
    )
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ko-KR')
  }

  const renderJSON = (obj: any) => {
    if (!obj || Object.keys(obj).length === 0) {
      return <Typography variant="body2" color="text.secondary">데이터 없음</Typography>
    }
    return (
      <pre
        style={{
          margin: 0,
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px',
          lineHeight: '1.5',
        }}
      >
        {JSON.stringify(obj, null, 2)}
      </pre>
    )
  }

  const getTypeLabel = () => {
    switch (type) {
      case 'dataSource':
        return 'Data Source'
      case 'category':
        return 'Category'
      case 'resource':
        return 'Resource'
      default:
        return ''
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case 'dataSource':
        return 'primary'
      case 'category':
        return 'secondary'
      case 'resource':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* 헤더 */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Chip label={getTypeLabel()} size="small" color={getTypeColor()} />
          <Chip label={data.code} size="small" variant="outlined" />
          {data.isActive ? (
            <Chip icon={<CheckCircleIcon />} label="활성" size="small" color="success" variant="outlined" />
          ) : (
            <Chip icon={<CancelIcon />} label="비활성" size="small" color="default" variant="outlined" />
          )}
        </Stack>
        <Typography variant="h6" fontWeight={600}>
          {data.name}
        </Typography>
        {(data as any).description && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {(data as any).description}
          </Typography>
        )}
      </Box>

      {/* 본문 */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Stack spacing={2}>
          {/* 기본 정보 */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" gap={1}>
                <InfoIcon fontSize="small" color="action" />
                <Typography fontWeight={600}>기본 정보</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>Internal ID</TableCell>
                    <TableCell>{data.internalId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Public ID</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {data.publicId}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                    <TableCell>{data.code}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell>{data.name}</TableCell>
                  </TableRow>
                  {type === 'dataSource' && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>User ID</TableCell>
                      <TableCell>{(data as DataSource).userId}</TableCell>
                    </TableRow>
                  )}
                  {type === 'category' && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Data Source ID</TableCell>
                      <TableCell>{(data as Category).dataSourceInternalId}</TableCell>
                    </TableRow>
                  )}
                  {type === 'resource' && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Category ID</TableCell>
                      <TableCell>{(data as Resource).categoryInternalId}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell>
                      {data.isActive ? (
                        <Chip label="활성" size="small" color="success" />
                      ) : (
                        <Chip label="비활성" size="small" color="default" />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>

          {/* Attributes (운영 속성) */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" gap={1}>
                <SettingsIcon fontSize="small" color="action" />
                <Typography fontWeight={600}>Attributes (운영 속성)</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>{renderJSON(data.attributes)}</AccordionDetails>
          </Accordion>

          {/* Metadata (관리 속성) */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" gap={1}>
                <BusinessIcon fontSize="small" color="action" />
                <Typography fontWeight={600}>Metadata (관리 속성)</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {data.metadata.tags && data.metadata.tags.length > 0 && (
                <Box mb={2}>
                  <Typography variant="caption" color="text.secondary" mb={1} display="block">
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                    {data.metadata.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Box>
              )}
              {renderJSON(data.metadata)}
            </AccordionDetails>
          </Accordion>

          {/* 타임스탬프 */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" gap={1}>
                <ScheduleIcon fontSize="small" color="action" />
                <Typography fontWeight={600}>타임스탬프</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>생성일시</TableCell>
                    <TableCell>{formatDate(data.createdAt)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>수정일시</TableCell>
                    <TableCell>{formatDate(data.updatedAt)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
    </Paper>
  )
}
