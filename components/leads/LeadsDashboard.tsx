'use client'

import { useEffect, useState, useMemo } from 'react'
import { Lead, getLeads } from '@/lib/supabase/queries'
import { subscribeToLeads, unsubscribeFromLeads, RealtimeChannel } from '@/lib/supabase/realtime'
import LeadsDataGrid from './LeadsDataGrid'
import LeadsFilters, { FilterStatus, SortOption } from './LeadsFilters'
import AddLeadForm from './AddLeadForm'
import InteractionDrawer from '@/components/interactions/InteractionDrawer'
import { filterLeads, sortLeads } from '@/lib/utils/leads'
import Card from '@/components/ui/Card'
import DataDisplay from '@/components/ui/DataDisplay'
import { Loader2 } from 'lucide-react'
import { getInteractionsByLead } from '@/lib/supabase/interactions'

export default function LeadsDashboard() {
  const [allLeads, setAllLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')
  const [sortOption, setSortOption] = useState<SortOption>('score_desc')
  const [realtimeChannel, setRealtimeChannel] = useState<RealtimeChannel | null>(null)
  const [selectedInteractionId, setSelectedInteractionId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Fetch initial leads and set up real-time subscription
  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true)
        const data = await getLeads()
        setAllLeads(data)
        setError(null)
      } catch (err) {
        setError('Failed to load leads')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()

    // Set up real-time subscription
    const channel = subscribeToLeads((payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        // Add new lead
        setAllLeads(prev => [payload.new!, ...prev])
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        // Update existing lead
        setAllLeads(prev => 
          prev.map(lead => lead.id === payload.new!.id ? payload.new! : lead)
        )
      } else if (payload.eventType === 'DELETE' && payload.old) {
        // Remove deleted lead
        setAllLeads(prev => prev.filter(lead => lead.id !== payload.old!.id))
      }
    })

    setRealtimeChannel(channel)

    // Cleanup on unmount
    return () => {
      if (channel) {
        unsubscribeFromLeads(channel)
      }
    }
  }, [])

  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    const filtered = filterLeads(allLeads, searchQuery, statusFilter)
    return sortLeads(filtered, sortOption)
  }, [allLeads, searchQuery, statusFilter, sortOption])

  // Calculate metrics (from all leads, not filtered)
  const totalLeads = allLeads.length
  const activeLeads = allLeads.filter(l => l.status === 'ava_active').length
  const avgScore = totalLeads > 0 
    ? Math.round(allLeads.reduce((sum, lead) => sum + lead.lead_score, 0) / totalLeads)
    : 0

  // Filtered metrics
  const filteredCount = filteredAndSortedLeads.length

  // Handle lead click - get most recent interaction
  const handleLeadClick = async (leadId: string) => {
    try {
      const interactions = await getInteractionsByLead(leadId)
      if (interactions.length > 0) {
        setSelectedInteractionId(interactions[0].id)
        setIsDrawerOpen(true)
      } else {
        // Show message if no interactions
        alert('No interactions found for this lead.')
      }
    } catch (err) {
      console.error('Error fetching interactions:', err)
      alert('Failed to load interactions.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-teal-primary animate-spin" />
          <p className="text-white-pure/70 font-body">Loading leads...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-6 border-red-alert/50">
          <p className="text-red-alert font-body">{error}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-header font-bold mb-2">
            Mission Control
          </h1>
          <p className="text-white-pure/70 font-body">
            Monitor Ava&apos;s targets and their status
          </p>
        </div>
        {/* Real-time indicator */}
        {realtimeChannel && (
          <div className="flex items-center gap-2 text-xs text-teal-primary font-body">
            <div className="w-2 h-2 bg-teal-primary rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="p-6">
          <DataDisplay 
            label="Total Leads" 
            value={totalLeads} 
            variant="default"
          />
        </Card>
        <Card className="p-6">
          <DataDisplay 
            label="Ava Active" 
            value={activeLeads} 
            variant="default"
          />
        </Card>
        <Card className="p-6">
          <DataDisplay 
            label="Avg Score" 
            value={avgScore} 
            variant="default"
          />
        </Card>
      </div>

      {/* Add Lead Form */}
      <AddLeadForm
        onSuccess={() => {
          // Refetch leads to ensure we have the latest data
          getLeads().then(setAllLeads).catch(console.error)
        }}
      />

      {/* Filters */}
      <LeadsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* Results count */}
      {(searchQuery || statusFilter !== 'all') && (
        <div className="text-sm text-white-pure/70 font-body">
          Showing {filteredCount} of {totalLeads} leads
        </div>
      )}

      {/* Leads Data Grid */}
      <div>
        <h2 className="text-xl font-header font-semibold mb-4">
          Active Targets
        </h2>
        <LeadsDataGrid 
          leads={filteredAndSortedLeads} 
          onLeadClick={handleLeadClick}
        />
      </div>

      {/* Interaction Drawer */}
      <InteractionDrawer
        interactionId={selectedInteractionId}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
          setSelectedInteractionId(null)
        }}
      />
    </div>
  )
}

