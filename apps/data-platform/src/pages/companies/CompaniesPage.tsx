import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import { Box, Typography } from '@mui/material'

export function CompaniesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="회사 관리"
        description="회사 정보를 관리합니다"
      />
      <PageContent>
        <Box>
          <Typography variant="body1">회사 관리 페이지입니다.</Typography>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
