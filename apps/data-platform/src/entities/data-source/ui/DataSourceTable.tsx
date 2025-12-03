/**
 * DataSourceTable Component
 *
 * 데이터 출처 목록 테이블 컴포넌트
 */

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import type { DataSource } from '../model'

export interface DataSourceTableProps {
  data: DataSource[]
  isLoading?: boolean
  selectedId?: number
  onRowClick?: (dataSource: DataSource) => void
}

export function DataSourceTable({ data, isLoading, selectedId, onRowClick }: DataSourceTableProps) {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="text.secondary">데이터 출처가 없습니다</Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '100%', overflow: 'auto' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell width="15%">코드</TableCell>
            <TableCell width="25%">명칭</TableCell>
            <TableCell width="15%">프로토콜</TableCell>
            <TableCell width="20%">담당 부서</TableCell>
            <TableCell width="10%">상태</TableCell>
            <TableCell width="15%">태그</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((source) => (
            <TableRow
              key={source.internalId}
              hover
              selected={selectedId === source.internalId}
              onClick={() => onRowClick?.(source)}
              sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {source.code}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{source.name}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={source.attributes.protocol || 'N/A'}
                  size="small"
                  color={source.attributes.protocol === 'MQTT' ? 'primary' : 'default'}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {source.metadata.organization?.department || '-'}
                </Typography>
              </TableCell>
              <TableCell>
                {source.isActive ? (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="활성"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    icon={<CancelIcon />}
                    label="비활성"
                    size="small"
                    color="default"
                    variant="outlined"
                  />
                )}
              </TableCell>
              <TableCell>
                <Box display="flex" gap={0.5} flexWrap="wrap">
                  {source.metadata.tags?.slice(0, 2).map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
