import { ReactNode } from 'react'

interface StatusBadgeProps {
  status: 'new' | 'ava_active' | 'booked'
  children: ReactNode
  className?: string
}

export default function StatusBadge({ status, children, className = '' }: StatusBadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-semibold transition-all'
  
  const variants = {
    new: 'border-2 border-white-pure text-white-pure bg-transparent',
    ava_active: 'border-2 border-teal-primary text-teal-primary bg-transparent animate-pulse-teal',
    booked: 'bg-teal-primary text-white-pure border-0',
  }

  return (
    <span className={`${baseStyles} ${variants[status]} ${className}`}>
      {children}
    </span>
  )
}

