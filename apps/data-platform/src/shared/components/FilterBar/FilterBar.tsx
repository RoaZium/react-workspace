import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import type { ReactNode } from 'react'

export interface FilterOption {
  id: string
  label: string
  value: string | boolean
  type: 'select' | 'boolean' | 'multiselect'
  options?: { value: string; label: string }[]
}

export interface FilterBarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  filters?: FilterOption[]
  onFilterChange?: (filterId: string, value: any) => void
  activeFilters?: Record<string, any>
  rightAction?: ReactNode
}

/**
 * 공통 Filter Bar 컴포넌트
 *
 * 모든 관리 페이지에서 사용하는 통일된 검색/필터 영역
 * - 검색창 (좌측)
 * - 필터 옵션들 (중앙)
 * - 우측 액션 영역 (우측)
 */
export function FilterBar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = '검색...',
  filters = [],
  onFilterChange,
  activeFilters = {},
  rightAction,
}: FilterBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* 검색창 */}
      <TextField
        size="small"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        sx={{ minWidth: 300 }}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />

      {/* 필터 옵션들 */}
      <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
        {filters.map((filter) => {
          if (filter.type === 'select' && filter.options) {
            return (
              <FormControl key={filter.id} size="small" sx={{ minWidth: 150 }}>
                <InputLabel>{filter.label}</InputLabel>
                <Select
                  value={activeFilters[filter.id] || ''}
                  onChange={(e) => onFilterChange?.(filter.id, e.target.value)}
                  label={filter.label}
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  {filter.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          }

          if (filter.type === 'boolean') {
            return (
              <FormControl key={filter.id} size="small" sx={{ minWidth: 120 }}>
                <InputLabel>{filter.label}</InputLabel>
                <Select
                  value={activeFilters[filter.id] ?? ''}
                  onChange={(e) => onFilterChange?.(filter.id, e.target.value)}
                  label={filter.label}
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  <MenuItem value="true">활성</MenuItem>
                  <MenuItem value="false">비활성</MenuItem>
                </Select>
              </FormControl>
            )
          }

          return null
        })}
      </Stack>

      {/* 우측 액션 영역 */}
      {rightAction && <Box>{rightAction}</Box>}
    </Box>
  )
}
