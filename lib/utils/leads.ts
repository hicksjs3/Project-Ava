import { Lead } from '@/lib/supabase/queries'
import { FilterStatus, SortOption } from '@/components/leads/LeadsFilters'

export function filterLeads(leads: Lead[], searchQuery: string, statusFilter: FilterStatus): Lead[] {
  let filtered = leads

  // Filter by status
  if (statusFilter !== 'all') {
    filtered = filtered.filter(lead => lead.status === statusFilter)
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim()
    filtered = filtered.filter(lead => 
      lead.first_name.toLowerCase().includes(query) ||
      lead.company_name.toLowerCase().includes(query)
    )
  }

  return filtered
}

export function sortLeads(leads: Lead[], sortOption: SortOption): Lead[] {
  const sorted = [...leads]

  switch (sortOption) {
    case 'score_desc':
      return sorted.sort((a, b) => b.lead_score - a.lead_score)
    case 'score_asc':
      return sorted.sort((a, b) => a.lead_score - b.lead_score)
    case 'name_asc':
      return sorted.sort((a, b) => a.first_name.localeCompare(b.first_name))
    case 'name_desc':
      return sorted.sort((a, b) => b.first_name.localeCompare(a.first_name))
    case 'company_asc':
      return sorted.sort((a, b) => a.company_name.localeCompare(b.company_name))
    case 'company_desc':
      return sorted.sort((a, b) => b.company_name.localeCompare(a.company_name))
    default:
      return sorted
  }
}

