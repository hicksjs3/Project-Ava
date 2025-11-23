'use client'

import { Lead } from '@/lib/supabase/queries'
import StatusBadge from '@/components/ui/StatusBadge'
import Card from '@/components/ui/Card'

interface LeadsDataGridProps {
  leads: Lead[]
  onLeadClick?: (leadId: string) => void
}

export default function LeadsDataGrid({ leads, onLeadClick }: LeadsDataGridProps) {
  const formatStatus = (status: string) => {
    switch (status) {
      case 'new':
        return 'New'
      case 'ava_active':
        return 'Ava Active'
      case 'booked':
        return 'Booked'
      default:
        return status
    }
  }

  return (
    <div className="w-full">
      {/* Mobile View: Card Grid (1 column) */}
      <div className="block md:hidden space-y-4">
        {leads.map((lead) => (
          <Card 
            key={lead.id} 
            className="p-4 cursor-pointer hover:border-teal-primary/50 transition-colors"
            onClick={() => onLeadClick?.(lead.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-header font-bold text-white-pure mb-1">
                  {lead.first_name}
                </h3>
                <p className="text-sm text-white-pure/70 font-body">
                  {lead.company_name}
                </p>
              </div>
              <StatusBadge status={lead.status}>
                {formatStatus(lead.status)}
              </StatusBadge>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-teal-primary/20">
              <span className="text-xs text-white-pure/70 font-body">Lead Score</span>
              <span className="data-font text-teal-primary text-2xl">
                {lead.lead_score}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View: Sensor Tech Data Grid */}
      <div className="hidden md:block">
        <Card className="p-0 overflow-hidden">
          {/* Grid Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-teal-primary/20 bg-blue-deep/50">
            <div className="col-span-4">
              <span className="text-xs font-header font-semibold text-white-pure/70 uppercase tracking-wider data-font">
                Lead
              </span>
            </div>
            <div className="col-span-4">
              <span className="text-xs font-header font-semibold text-white-pure/70 uppercase tracking-wider data-font">
                Company
              </span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-xs font-header font-semibold text-white-pure/70 uppercase tracking-wider data-font">
                Status
              </span>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-xs font-header font-semibold text-white-pure/70 uppercase tracking-wider data-font">
                Score
              </span>
            </div>
          </div>

          {/* Grid Rows */}
          <div className="divide-y divide-teal-primary/10">
            {leads.map((lead, index) => (
              <div 
                key={lead.id} 
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-deep/30 transition-colors cursor-pointer"
                onClick={() => onLeadClick?.(lead.id)}
              >
                <div className="col-span-4">
                  <span className="text-base font-header font-semibold text-white-pure">
                    {lead.first_name}
                  </span>
                </div>
                <div className="col-span-4">
                  <span className="text-sm font-body text-white-pure/90">
                    {lead.company_name}
                  </span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <StatusBadge status={lead.status}>
                    {formatStatus(lead.status)}
                  </StatusBadge>
                </div>
                <div className="col-span-2 text-right">
                  <span className="data-font text-teal-primary text-2xl">
                    {lead.lead_score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Empty State */}
      {leads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white-pure/70 font-body">
            No leads found. Ava is ready to hunt.
          </p>
        </div>
      )}
    </div>
  )
}

