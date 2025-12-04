/**
 * DataHubTree Component
 *
 * Data Hub 계층 구조를 트리 형태로 표시
 * - DataSource > Category > Resource 3단계 계층
 * - 확장/축소 가능
 * - 선택된 항목 하이라이트
 * - 검색 및 필터링 지원
 */

import { useState } from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Chip,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import StorageIcon from '@mui/icons-material/Storage'
import CategoryIcon from '@mui/icons-material/Category'
import DeviceHubIcon from '@mui/icons-material/DeviceHub'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import type { DataSource } from '@/entities/data-source'
import type { Category } from '@/entities/category'
import type { Resource } from '@/entities/resource'

export interface DataHubTreeProps {
  dataSources: DataSource[]
  categories: Category[]
  resources: Resource[]
  selectedDataSource?: DataSource | null
  selectedCategory?: Category | null
  selectedResource?: Resource | null
  onSelectDataSource?: (ds: DataSource) => void
  onSelectCategory?: (cat: Category) => void
  onSelectResource?: (res: Resource) => void
}

interface TreeState {
  expandedDataSources: Set<number>
  expandedCategories: Set<number>
}

export function DataHubTree({
  dataSources,
  categories,
  resources,
  selectedDataSource,
  selectedCategory,
  selectedResource,
  onSelectDataSource,
  onSelectCategory,
  onSelectResource,
}: DataHubTreeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [treeState, setTreeState] = useState<TreeState>({
    expandedDataSources: new Set<number>(),
    expandedCategories: new Set<number>(),
  })

  // 검색 필터링
  const filterBySearch = (text: string) => {
    if (!searchQuery) return true
    return text.toLowerCase().includes(searchQuery.toLowerCase())
  }

  const filteredDataSources = dataSources.filter(
    (ds) => filterBySearch(ds.name) || filterBySearch(ds.code)
  )

  // DataSource 확장/축소 토글
  const toggleDataSource = (dsId: number) => {
    setTreeState((prev) => {
      const newExpanded = new Set(prev.expandedDataSources)
      if (newExpanded.has(dsId)) {
        newExpanded.delete(dsId)
      } else {
        newExpanded.add(dsId)
      }
      return { ...prev, expandedDataSources: newExpanded }
    })
  }

  // Category 확장/축소 토글
  const toggleCategory = (catId: number) => {
    setTreeState((prev) => {
      const newExpanded = new Set(prev.expandedCategories)
      if (newExpanded.has(catId)) {
        newExpanded.delete(catId)
      } else {
        newExpanded.add(catId)
      }
      return { ...prev, expandedCategories: newExpanded }
    })
  }

  // 카테고리 필터링 (DataSource에 속한 것만)
  const getCategoriesForDataSource = (dsId: number) => {
    return categories.filter(
      (cat) =>
        cat.dataSourceInternalId === dsId &&
        (filterBySearch(cat.name) || filterBySearch(cat.code))
    )
  }

  // 리소스 필터링 (Category에 속한 것만)
  const getResourcesForCategory = (catId: number) => {
    return resources.filter(
      (res) =>
        res.categoryInternalId === catId &&
        (filterBySearch(res.name) || filterBySearch(res.code))
    )
  }

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* 검색 바 */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="검색... (이름, 코드)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchQuery('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* 트리 뷰 */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List dense disablePadding>
          {filteredDataSources.map((dataSource) => {
            const isExpanded = treeState.expandedDataSources.has(dataSource.internalId)
            const isSelected = selectedDataSource?.internalId === dataSource.internalId
            const dsCategories = getCategoriesForDataSource(dataSource.internalId)

            return (
              <Box key={dataSource.internalId}>
                {/* DataSource 항목 */}
                <ListItemButton
                  selected={isSelected}
                  onClick={() => {
                    onSelectDataSource?.(dataSource)
                    if (dsCategories.length > 0) {
                      toggleDataSource(dataSource.internalId)
                    }
                  }}
                  sx={{
                    pl: 1,
                    borderLeft: isSelected ? 3 : 0,
                    borderColor: 'primary.main',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {dsCategories.length > 0 ? (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDataSource(dataSource.internalId)
                        }}
                      >
                        {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                      </IconButton>
                    ) : (
                      <StorageIcon fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <StorageIcon color={isSelected ? 'primary' : 'action'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" fontWeight={isSelected ? 600 : 400}>
                          {dataSource.name}
                        </Typography>
                        <Chip label={dataSource.code} size="small" variant="outlined" />
                        {!dataSource.isActive && (
                          <Tooltip title="비활성">
                            <CancelIcon fontSize="small" color="disabled" />
                          </Tooltip>
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {dataSource.attributes.protocol} • {dataSource.metadata.organization?.department}
                      </Typography>
                    }
                  />
                  <Chip label={dsCategories.length} size="small" color="default" />
                </ListItemButton>

                {/* Category 목록 (확장 시) */}
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List dense disablePadding>
                    {dsCategories.map((category) => {
                      const isCatExpanded = treeState.expandedCategories.has(category.internalId)
                      const isCatSelected = selectedCategory?.internalId === category.internalId
                      const catResources = getResourcesForCategory(category.internalId)

                      return (
                        <Box key={category.internalId}>
                          {/* Category 항목 */}
                          <ListItemButton
                            selected={isCatSelected}
                            onClick={() => {
                              onSelectCategory?.(category)
                              if (catResources.length > 0) {
                                toggleCategory(category.internalId)
                              }
                            }}
                            sx={{
                              pl: 8,
                              borderLeft: isCatSelected ? 3 : 0,
                              borderColor: 'secondary.main',
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              {catResources.length > 0 ? (
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleCategory(category.internalId)
                                  }}
                                >
                                  {isCatExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                                </IconButton>
                              ) : (
                                <CategoryIcon fontSize="small" />
                              )}
                            </ListItemIcon>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CategoryIcon color={isCatSelected ? 'secondary' : 'action'} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Typography variant="body2" fontWeight={isCatSelected ? 600 : 400}>
                                    {category.name}
                                  </Typography>
                                  <Chip label={category.code} size="small" variant="outlined" />
                                </Box>
                              }
                              secondary={
                                <Typography variant="caption" color="text.secondary" noWrap>
                                  {category.description}
                                </Typography>
                              }
                            />
                            <Chip label={catResources.length} size="small" color="default" />
                          </ListItemButton>

                          {/* Resource 목록 (확장 시) */}
                          <Collapse in={isCatExpanded} timeout="auto" unmountOnExit>
                            <List dense disablePadding>
                              {catResources.map((resource) => {
                                const isResSelected = selectedResource?.internalId === resource.internalId

                                return (
                                  <ListItemButton
                                    key={resource.internalId}
                                    selected={isResSelected}
                                    onClick={() => onSelectResource?.(resource)}
                                    sx={{
                                      pl: 15,
                                      borderLeft: isResSelected ? 3 : 0,
                                      borderColor: 'success.main',
                                    }}
                                  >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                      <DeviceHubIcon
                                        color={isResSelected ? 'success' : 'action'}
                                        fontSize="small"
                                      />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Box display="flex" alignItems="center" gap={0.5}>
                                          <Typography variant="body2" fontWeight={isResSelected ? 600 : 400}>
                                            {resource.name}
                                          </Typography>
                                          <Chip label={resource.code} size="small" variant="outlined" />
                                          {resource.isActive ? (
                                            <CheckCircleIcon fontSize="small" color="success" />
                                          ) : (
                                            <CancelIcon fontSize="small" color="disabled" />
                                          )}
                                        </Box>
                                      }
                                      secondary={
                                        <Typography variant="caption" color="text.secondary" noWrap>
                                          {resource.attributes.resourceType || 'N/A'}
                                        </Typography>
                                      }
                                    />
                                  </ListItemButton>
                                )
                              })}
                            </List>
                          </Collapse>
                        </Box>
                      )
                    })}
                  </List>
                </Collapse>
              </Box>
            )
          })}
        </List>

        {filteredDataSources.length === 0 && (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Typography color="text.secondary">
              {searchQuery ? '검색 결과가 없습니다' : '데이터가 없습니다'}
            </Typography>
          </Box>
        )}
      </Box>

      {/* 통계 정보 */}
      <Box
        sx={{
          p: 1.5,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
          display: 'flex',
          gap: 2,
          justifyContent: 'space-around',
        }}
      >
        <Box textAlign="center">
          <Typography variant="caption" color="text.secondary">
            Data Source
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {dataSources.length}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="caption" color="text.secondary">
            Category
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {categories.length}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="caption" color="text.secondary">
            Resource
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {resources.length}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
