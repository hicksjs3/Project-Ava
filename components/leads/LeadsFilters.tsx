'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'

export type FilterStatus = 'all' | 'new' | 'ava_active' | 'booked'
export type SortOption = 'score_desc' | 'score_asc' | 'name_asc' | 'name_desc' | 'company_asc' | 'company_desc'

interface LeadsFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: FilterStatus
  onStatusFilterChange: (status: FilterStatus) => void
  sortOption: SortOption
  onSortChange: (sort: SortOption) => void
}

export default function LeadsFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortChange,
}: LeadsFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const statusOptions: { value: FilterStatus; label: string; status?: 'new' | 'ava_active' | 'booked' }[] = [
    { value: 'all', label: 'All Leads' },
    { value: 'new', label: 'New', status: 'new' },
    { value: 'ava_active', label: 'Ava Active', status: 'ava_active' },
    { value: 'booked', label: 'Booked', status: 'booked' },
  ]

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'score_desc', label: 'Score: High → Low' },
    { value: 'score_asc', label: 'Score: Low → High' },
    { value: 'name_asc', label: 'Name: A → Z' },
    { value: 'name_desc', label: 'Name: Z → A' },
    { value: 'company_asc', label: 'Company: A → Z' },
    { value: 'company_desc', label: 'Company: Z → A' },
  ]

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search 
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white-pure/50 transition-colors ${
            isSearchFocused ? 'text-teal-primary' : ''
          }`}
        />
        <input
          type="text"
          placeholder="Search leads or companies..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="w-full pl-10 pr-10 py-2.5 bg-blue-deep border border-teal-primary/20 rounded-lg text-white-pure placeholder-white-pure/50 font-body focus:outline-none focus:border-teal-primary transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white-pure/50 hover:text-white-pure transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Status Filter */}
        <div className="flex-1">
          <label className="block text-xs font-header font-semibold text-white-pure/70 uppercase tracking-wider mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const isActive = statusFilter === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => onStatusFilterChange(option.value)}
                  className={`
                    px-4 py-2 rounded-full text-xs font-body font-semibold transition-all
                    ${
                      isActive
                        ? option.status === 'booked'
                          ? 'bg-teal-primary text-white-pure border-0'
                          : option.status === 'ava_active'
                          ? 'border-2 border-teal-primary text-teal-primary bg-transparent animate-pulse-teal'
                          : option.status === 'new'
                          ? 'border-2 border-white-pure text-white-pure bg-transparent'
                          : 'bg-teal-primary text-white-pure'
                        : 'bg-blue-deep border-2 border-teal-primary/20 text-white-pure/70 hover:border-teal-primary/50 hover:text-white-pure'
                    }
                  `}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="md:w-64">
          <label className="block text-xs font-header font-semibold text-white-pure/70 uppercase tracking-wider mb-2">
            Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-2.5 bg-blue-deep border border-teal-primary/20 rounded-lg text-white-pure font-body focus:outline-none focus:border-teal-primary transition-colors"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

