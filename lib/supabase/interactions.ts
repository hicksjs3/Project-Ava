import { supabase } from '../supabase'

export interface Interaction {
  id: string
  lead_id: string
  recording_url?: string | null
  transcript?: string | null
  created_at: string
  // Join with leads table for prospect name
  leads?: {
    first_name: string
    company_name: string
  }
}

export interface InteractionWithLead extends Interaction {
  prospect_name: string
  company_name: string
}

export async function getInteraction(id: string): Promise<InteractionWithLead | null> {
  const { data, error } = await supabase
    .from('interactions')
    .select(`
      id,
      lead_id,
      recording_url,
      transcript,
      created_at,
      leads:lead_id (
        first_name,
        company_name
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching interaction:', error)
    throw error
  }

  if (!data) return null

  // Transform the nested leads data
  // Supabase returns joined relations as objects when using .single()
  const leadData = Array.isArray(data.leads) 
    ? (data.leads[0] as { first_name: string; company_name: string } | undefined)
    : (data.leads as { first_name: string; company_name: string } | null | undefined)
  
  // Build the return object with explicit typing
  const result: InteractionWithLead = {
    id: data.id,
    lead_id: data.lead_id,
    recording_url: data.recording_url,
    transcript: data.transcript,
    created_at: data.created_at,
    prospect_name: leadData?.first_name || 'Unknown',
    company_name: leadData?.company_name || 'Unknown',
  }
  
  return result
}

export async function getInteractionsByLead(leadId: string): Promise<Interaction[]> {
  const { data, error } = await supabase
    .from('interactions')
    .select('id, lead_id, recording_url, transcript, created_at')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching interactions:', error)
    throw error
  }

  return data || []
}


