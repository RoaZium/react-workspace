import { Card, CardContent, Typography, Chip, Box, Divider, Grid } from '@mui/material'
import type { Resource } from '../model'

export interface ResourceDetailProps {
  resource: Resource
  dataSourceName?: string
  categoryName?: string
}

export function ResourceDetail({ resource, dataSourceName, categoryName }: ResourceDetailProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{resource.name}</Typography>
        <Chip label={resource.code} size="small" sx={{ mb: 2 }} />

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">데이터소스</Typography>
            <Typography variant="body2">{dataSourceName || '-'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">카테고리</Typography>
            <Typography variant="body2">{categoryName || '-'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">리소스 타입</Typography>
            <Typography variant="body2">{resource.attributes.resourceType || '-'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">상태</Typography>
            <Chip label={resource.isActive ? '활성' : '비활성'} size="small" color={resource.isActive ? 'success' : 'default'} />
          </Grid>
        </Grid>

        {resource.attributes.sensor && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>센서 정보</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">센서 타입</Typography>
                <Typography variant="body2">{resource.attributes.sensor.sensorType || '-'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">단위</Typography>
                <Typography variant="body2">{resource.attributes.sensor.unit || '-'}</Typography>
              </Grid>
              {resource.attributes.sensor.range && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">범위</Typography>
                    <Typography variant="body2">
                      {resource.attributes.sensor.range.min} ~ {resource.attributes.sensor.range.max}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </>
        )}

        {resource.attributes.threshold && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>임계값</Typography>
            <Grid container spacing={2}>
              {resource.attributes.threshold.warning && (
                <Grid item xs={12}>
                  <Typography variant="caption" color="warning.main">경고</Typography>
                  <Typography variant="body2">
                    {resource.attributes.threshold.warning.min} ~ {resource.attributes.threshold.warning.max}
                  </Typography>
                </Grid>
              )}
              {resource.attributes.threshold.critical && (
                <Grid item xs={12}>
                  <Typography variant="caption" color="error.main">위험</Typography>
                  <Typography variant="body2">
                    {resource.attributes.threshold.critical.min} ~ {resource.attributes.threshold.critical.max}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </>
        )}

        {resource.metadata.tags && resource.metadata.tags.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>태그</Typography>
            <Box display="flex" gap={0.5} flexWrap="wrap">
              {resource.metadata.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
