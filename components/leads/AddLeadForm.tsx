'use client'

import { useState } from 'react'
import { createLead, CreateLeadInput } from '@/lib/supabase/queries'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { X, Plus } from 'lucide-react'

interface AddLeadFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function AddLeadForm({ onSuccess, onCancel }: AddLeadFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<CreateLeadInput>({
    first_name: '',
    company_name: '',
    status: 'new',
    lead_score: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createLead(formData)
      // Reset form
      setFormData({
        first_name: '',
        company_name: '',
        status: 'new',
        lead_score: 0,
      })
      setIsOpen(false)
      onSuccess?.()
    } catch (err) {
      setError('Failed to create lead. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      first_name: '',
      company_name: '',
      status: 'new',
      lead_score: 0,
    })
    setError(null)
    setIsOpen(false)
    onCancel?.()
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        icon={Plus}
        className="w-full md:w-auto"
      >
        Add Lead
      </Button>
    )
  }

  return (
    <Card className="p-6 border-teal-primary/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-header font-bold text-white-pure">
          Add New Lead
        </h3>
        <button
          onClick={handleCancel}
          className="text-white-pure/70 hover:text-white-pure transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-alert/20 border border-red-alert/50 rounded-lg">
            <p className="text-sm text-red-alert font-body">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-header font-semibold text-white-pure/90 mb-2">
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-navy-dark border border-teal-primary/20 rounded-lg text-white-pure placeholder-white-pure/50 font-body focus:outline-none focus:border-teal-primary transition-colors"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm font-header font-semibold text-white-pure/90 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.company_name}
            onChange={(e) =>
              setFormData({ ...formData, company_name: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-navy-dark border border-teal-primary/20 rounded-lg text-white-pure placeholder-white-pure/50 font-body focus:outline-none focus:border-teal-primary transition-colors"
            placeholder="Acme Corp"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-header font-semibold text-white-pure/90 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'new' | 'ava_active' | 'booked',
                })
              }
              className="w-full px-4 py-2.5 bg-navy-dark border border-teal-primary/20 rounded-lg text-white-pure font-body focus:outline-none focus:border-teal-primary transition-colors"
            >
              <option value="new">New</option>
              <option value="ava_active">Ava Active</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-header font-semibold text-white-pure/90 mb-2">
              Lead Score
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.lead_score}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lead_score: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-2.5 bg-navy-dark border border-teal-primary/20 rounded-lg text-white-pure placeholder-white-pure/50 font-body focus:outline-none focus:border-teal-primary transition-colors data-font"
              placeholder="0-100"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            className="w-full md:w-auto"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="w-full md:w-auto md:ml-auto"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Lead'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

