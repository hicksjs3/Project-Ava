// Common types for the Ava application

export interface Lead {
  id: string
  first_name: string
  company_name: string
  status: 'new' | 'ava_active' | 'booked'
  lead_score: number
}

export interface Call {
  id: string
  leadId: string
  status: 'active' | 'completed' | 'failed'
  duration?: number
  transcript?: string
  startTime: string
}

export interface Metric {
  label: string
  value: number | string
  trend?: 'up' | 'down' | 'neutral'
}

