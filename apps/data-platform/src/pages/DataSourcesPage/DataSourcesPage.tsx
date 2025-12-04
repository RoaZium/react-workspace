import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import { Box, Typography } from '@mui/material'

export function DataSourcesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="데이터 소스 관리"
        description="데이터 소스를 관리합니다"
      />
      <PageContent>
        <Box>
          <Typography variant="body1">데이터 소스 관리 페이지입니다.</Typography>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
