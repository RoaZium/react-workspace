import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import { Box, Typography } from '@mui/material'

export function CategoriesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="카테고리 관리"
        description="카테고리를 관리합니다"
      />
      <PageContent>
        <Box>
          <Typography variant="body1">카테고리 관리 페이지입니다.</Typography>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
