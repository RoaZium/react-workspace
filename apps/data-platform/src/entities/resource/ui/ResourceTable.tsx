import { List, ListItem, ListItemButton, ListItemText, Typography, Chip, Box, Paper } from '@mui/material'
import type { Resource } from '../model'

export interface ResourceTableProps {
  data: Resource[]
  selectedRow?: Resource | null
  onRowClick?: (resource: Resource) => void
}

export function ResourceTable({ data, selectedRow, onRowClick }: ResourceTableProps) {
  return (
    <Paper sx={{ maxHeight: '100%', overflow: 'auto' }}>
      <List dense>
        {data.map((resource) => (
          <ListItem key={resource.internalId} disablePadding>
            <ListItemButton
              selected={selectedRow?.internalId === resource.internalId}
              onClick={() => onRowClick?.(resource)}
            >
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2" fontWeight={500}>{resource.name}</Typography>
                    <Chip label={resource.code} size="small" variant="outlined" />
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {resource.attributes.resourceType || 'N/A'} • {resource.attributes.sensor?.unit || ''}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
