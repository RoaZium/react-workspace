import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography, Box } from '@mui/material'
import type { Category } from '../model'

export interface CategoryTableProps {
  data: Category[]
  selectedRow?: Category | null
  onRowClick?: (category: Category) => void
}

export function CategoryTable({ data, selectedRow, onRowClick }: CategoryTableProps) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell width="30%">코드</TableCell>
            <TableCell width="50%">명칭</TableCell>
            <TableCell width="20%">태그</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((cat) => (
            <TableRow
              key={cat.internalId}
              hover
              selected={selectedRow?.internalId === cat.internalId}
              onClick={() => onRowClick?.(cat)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Typography variant="body2" fontWeight={500}>{cat.code}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{cat.name}</Typography>
                {cat.description && (
                  <Typography variant="caption" color="text.secondary" display="block">{cat.description}</Typography>
                )}
              </TableCell>
              <TableCell>
                <Box display="flex" gap={0.5} flexWrap="wrap">
                  {cat.metadata.tags?.slice(0, 2).map((tag) => (
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
