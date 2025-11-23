import { supabase } from '../supabase'
import { Lead } from './queries'
import { RealtimeChannel } from '@supabase/supabase-js'

export type { RealtimeChannel }

export type RealtimeCallback = (payload: {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new?: Lead
  old?: Lead
}) => void

export function subscribeToLeads(callback: RealtimeCallback): RealtimeChannel {
  const channel = supabase
    .channel('leads-changes', {
      config: {
        broadcast: { self: true },
      },
    })
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'leads',
      },
      (payload) => {
        callback({
          eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
          new: payload.new as Lead | undefined,
          old: payload.old as Lead | undefined,
        })
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Real-time subscription active')
      } else if (status === 'CHANNEL_ERROR') {
        console.warn('Real-time subscription error - updates will not be live')
      }
    })

  return channel
}

export function unsubscribeFromLeads(channel: RealtimeChannel) {
  supabase.removeChannel(channel)
}

