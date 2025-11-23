'use client'

import { useEffect, useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { getInteraction, InteractionWithLead } from '@/lib/supabase/interactions'
import AudioPlayer from './AudioPlayer'
import AcousticSignature from './AcousticSignature'
import Transcript from './Transcript'
import Card from '@/components/ui/Card'

interface InteractionDrawerProps {
  interactionId: string | null
  isOpen: boolean
  onClose: () => void
}

export default function InteractionDrawer({
  interactionId,
  isOpen,
  onClose,
}: InteractionDrawerProps) {
  const [interaction, setInteraction] = useState<InteractionWithLead | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && interactionId) {
      setLoading(true)
      setError(null)
      getInteraction(interactionId)
        .then((data) => {
          setInteraction(data)
          setError(null)
        })
        .catch((err) => {
          setError('Failed to load interaction')
          console.error(err)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setInteraction(null)
    }
  }, [interactionId, isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-dark/80 z-40 md:z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full z-50
          w-full md:w-[40%]
          bg-navy-dark border-l border-teal-primary/20
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          shadow-2xl
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-teal-primary/20 bg-blue-deep/30">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-header font-bold text-white-pure mb-1">
                {interaction?.prospect_name || 'Loading...'}
              </h2>
              {interaction?.company_name && (
                <p className="text-sm text-white-pure/70 font-body">
                  {interaction.company_name}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white-pure/70 hover:text-white-pure transition-colors p-2 hover:bg-blue-deep rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Acoustic Signature */}
          <div>
            <p className="text-xs font-header font-semibold text-white-pure/70 uppercase tracking-wider mb-2">
              Acoustic Signature
            </p>
            <AcousticSignature />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-dark p-6 space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-teal-primary animate-spin" />
                <p className="text-white-pure/70 font-body">Loading interaction...</p>
              </div>
            </div>
          )}

          {error && (
            <Card className="p-6 border-red-alert/50">
              <p className="text-red-alert font-body">{error}</p>
            </Card>
          )}

          {!loading && !error && interaction && (
            <>
              {/* Audio Player */}
              {interaction.recording_url && (
                <Card className="p-6">
                  <h3 className="text-lg font-header font-semibold text-white-pure mb-4">
                    Recording
                  </h3>
                  <AudioPlayer src={interaction.recording_url} />
                </Card>
              )}

              {/* Transcript */}
              {interaction.transcript && (
                <Card className="p-6">
                  <h3 className="text-lg font-header font-semibold text-white-pure mb-4">
                    Transcript
                  </h3>
                  <Transcript transcript={interaction.transcript} />
                </Card>
              )}

              {!interaction.recording_url && !interaction.transcript && (
                <div className="text-center py-12">
                  <p className="text-white-pure/70 font-body">
                    No recording or transcript available for this interaction.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}


