import { useState, useMemo } from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Stack,
  Divider,
  LinearProgress,
  Chip,
  Avatar,
  Paper,
} from '@mui/material'
import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import StorageIcon from '@mui/icons-material/Storage'
import CategoryIcon from '@mui/icons-material/Category'
import DescriptionIcon from '@mui/icons-material/Description'
import BusinessIcon from '@mui/icons-material/Business'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useActiveCompanies } from '@/entities/company'
import { useDataSources } from '@/entities/data-source'
import { useCategories } from '@/entities/category'
import { useResources } from '@/entities/resource'
import type { Company } from '@/entities/company'

/**
 * StatCard - Elevated Card with Clear Borders
 */
interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: number
  activeCount: number
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'
}

function StatCard({ icon, title, value, activeCount, color }: StatCardProps) {
  const percentage = value > 0 ? Math.round((activeCount / value) * 100) : 0

  return (
    <Card
      elevation={3}
      sx={{
        height: '100%',
        border: 2,
        borderColor: `${color}.main`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: `${color}.main`,
                width: 48,
                height: 48,
              }}
            >
              {icon}
            </Avatar>
            <Box>
              <Typography variant="overline" color="text.secondary" display="block">
                {title}
              </Typography>
              <Typography variant="h3" component="div" color={`${color}.main`} fontWeight={700}>
                {value.toLocaleString()}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {/* Active Count */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                활성화: {activeCount}개
              </Typography>
              <Typography variant="body2" color={`${color}.main`} fontWeight={700}>
                {percentage}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={percentage}
              color={color}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

/**
 * HierarchyFlow - Distinct Visual Card
 */
interface HierarchyFlowProps {
  dataSourceCount: number
  categoryCount: number
  resourceCount: number
}

function HierarchyFlow({ dataSourceCount, categoryCount, resourceCount }: HierarchyFlowProps) {
  const avgCategoriesPerSource =
    dataSourceCount > 0 ? (categoryCount / dataSourceCount).toFixed(1) : '0'
  const avgResourcesPerCategory =
    categoryCount > 0 ? (resourceCount / categoryCount).toFixed(1) : '0'
  const totalAssets = dataSourceCount + categoryCount + resourceCount

  return (
    <Card
      elevation={4}
      sx={{
        bgcolor: 'grey.50',
        border: 1,
        borderColor: 'grey.300',
      }}
    >
      <CardHeader
        avatar={<TrendingUpIcon color="primary" />}
        title="계층 구조"
        titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 2,
          borderColor: 'primary.main',
        }}
      />
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={4}>
          {/* Flow Visualization */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 3, md: 4 }}
            alignItems="center"
            justifyContent="center"
          >
            {/* Data Source */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                flex: 1,
                bgcolor: 'background.paper',
                border: 2,
                borderColor: 'primary.main',
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  mb: 2,
                  mx: 'auto',
                }}
              >
                <StorageIcon sx={{ fontSize: 44 }} />
              </Avatar>
              <Typography variant="h3" fontWeight={700} color="primary.main">
                {dataSourceCount}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Data Sources
              </Typography>
            </Paper>

            {/* Arrow + Stat */}
            <Stack
              alignItems="center"
              spacing={1}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <ArrowForwardIcon color="action" sx={{ fontSize: 40 }} />
              <Chip
                label={`평균 ${avgCategoriesPerSource}개`}
                size="medium"
                color="secondary"
                sx={{ fontWeight: 600 }}
              />
            </Stack>

            {/* Category */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                flex: 1,
                bgcolor: 'background.paper',
                border: 2,
                borderColor: 'secondary.main',
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'secondary.main',
                  mb: 2,
                  mx: 'auto',
                }}
              >
                <CategoryIcon sx={{ fontSize: 44 }} />
              </Avatar>
              <Typography variant="h3" fontWeight={700} color="secondary.main">
                {categoryCount}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Categories
              </Typography>
            </Paper>

            {/* Arrow + Stat */}
            <Stack
              alignItems="center"
              spacing={1}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <ArrowForwardIcon color="action" sx={{ fontSize: 40 }} />
              <Chip
                label={`평균 ${avgResourcesPerCategory}개`}
                size="medium"
                color="success"
                sx={{ fontWeight: 600 }}
              />
            </Stack>

            {/* Resource */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                flex: 1,
                bgcolor: 'background.paper',
                border: 2,
                borderColor: 'success.main',
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'success.main',
                  mb: 2,
                  mx: 'auto',
                }}
              >
                <DescriptionIcon sx={{ fontSize: 44 }} />
              </Avatar>
              <Typography variant="h3" fontWeight={700} color="success.main">
                {resourceCount}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Resources
              </Typography>
            </Paper>
          </Stack>

          <Divider sx={{ borderWidth: 1 }} />

          {/* Summary */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'info.light',
              border: 1,
              borderColor: 'info.main',
            }}
          >
            <Typography variant="body1" color="info.dark" align="center" fontWeight={600}>
              💡 총 <strong>{totalAssets.toLocaleString()}개</strong>의 데이터 자산이
              관리되고 있습니다
            </Typography>
          </Paper>
        </Stack>
      </CardContent>
    </Card>
  )
}

/**
 * DataHubOverview Page - Clear Visual Hierarchy
 */
export function DataHubOverview() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  // 데이터 로딩
  const { data: companies = [], isLoading: isLoadingCompanies } = useActiveCompanies()
  const { data: allDataSources = [], isLoading: isLoadingDS } = useDataSources()
  const { data: allCategories = [], isLoading: isLoadingCat } = useCategories()
  const { data: allResources = [], isLoading: isLoadingRes } = useResources()

  // 선택된 회사에 따른 필터링된 통계
  const statistics = useMemo(() => {
    // TODO: 회사별 필터링 로직
    return {
      dataSourceCount: allDataSources.length,
      categoryCount: allCategories.length,
      resourceCount: allResources.length,
      activeDataSourceCount: allDataSources.filter((ds) => ds.isActive).length,
      activeCategoryCount: allCategories.filter((cat) => cat.isActive).length,
      activeResourceCount: allResources.filter((res) => res.isActive).length,
    }
  }, [selectedCompany, allDataSources, allCategories, allResources])

  const isLoading = isLoadingCompanies || isLoadingDS || isLoadingCat || isLoadingRes

  return (
    <PageLayout>
      <PageHeader
        title="Data Hub Overview"
        description="데이터 허브 전체 현황을 한눈에 확인하세요"
        icon={<BusinessIcon />}
      />

      <PageContent>
        <Stack spacing={4}>
          {/* Company Selector - Distinguished Section */}
          <Card
            elevation={3}
            sx={{
              bgcolor: 'primary.light',
              border: 2,
              borderColor: 'primary.main',
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <BusinessIcon />
                </Avatar>
              }
              title="회사 선택"
              titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
              sx={{
                bgcolor: 'background.paper',
                borderBottom: 2,
                borderColor: 'primary.main',
              }}
            />
            <CardContent sx={{ bgcolor: 'background.paper', p: 3 }}>
              <Autocomplete
                options={companies}
                value={selectedCompany}
                onChange={(_, newValue) => setSelectedCompany(newValue)}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Stack direction="row" alignItems="center" spacing={1.5} width="100%">
                      <Chip
                        label={option.code}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography fontWeight={500}>{option.name}</Typography>
                      {!option.isActive && (
                        <Chip label="비활성" size="small" sx={{ ml: 'auto' }} />
                      )}
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="회사를 선택하세요 (미선택 시 전체 통계 표시)"
                    helperText={
                      selectedCompany
                        ? `${selectedCompany.name}의 통계를 표시합니다`
                        : '전체 통계를 표시합니다'
                    }
                  />
                )}
                loading={isLoadingCompanies}
                disabled={isLoading}
                fullWidth
              />
            </CardContent>
          </Card>

          {/* Statistics Cards - Clear Section */}
          <Box>
            <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
              📊 통계 현황
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <StatCard
                  icon={<StorageIcon />}
                  title="Data Sources"
                  value={statistics.dataSourceCount}
                  activeCount={statistics.activeDataSourceCount}
                  color="primary"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <StatCard
                  icon={<CategoryIcon />}
                  title="Categories"
                  value={statistics.categoryCount}
                  activeCount={statistics.activeCategoryCount}
                  color="secondary"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <StatCard
                  icon={<DescriptionIcon />}
                  title="Resources"
                  value={statistics.resourceCount}
                  activeCount={statistics.activeResourceCount}
                  color="success"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Hierarchy Flow - Distinct Section */}
          <Box>
            <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
              🔗 데이터 흐름
            </Typography>
            <HierarchyFlow
              dataSourceCount={statistics.dataSourceCount}
              categoryCount={statistics.categoryCount}
              resourceCount={statistics.resourceCount}
            />
          </Box>
        </Stack>
      </PageContent>
    </PageLayout>
  )
}
