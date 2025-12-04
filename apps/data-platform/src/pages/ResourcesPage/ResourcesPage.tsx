import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import { Box, Typography } from '@mui/material'

export function ResourcesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="리소스 관리"
        description="리소스를 관리합니다"
      />
      <PageContent>
        <Box>
          <Typography variant="body1">리소스 관리 페이지입니다.</Typography>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
