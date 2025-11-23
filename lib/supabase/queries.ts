import { supabase } from '../supabase'

export interface Lead {
  id: string
  first_name: string
  company_name: string
  status: 'new' | 'ava_active' | 'booked'
  lead_score: number
}

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('id, first_name, company_name, status, lead_score')
    .order('lead_score', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    throw error
  }

  return data || []
}

export interface CreateLeadInput {
  first_name: string
  company_name: string
  status?: 'new' | 'ava_active' | 'booked'
  lead_score?: number
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        first_name: input.first_name,
        company_name: input.company_name,
        status: input.status || 'new',
        lead_score: input.lead_score || 0,
      },
    ])
    .select('id, first_name, company_name, status, lead_score')
    .single()

  if (error) {
    console.error('Error creating lead:', error)
    throw error
  }

  return data
}

