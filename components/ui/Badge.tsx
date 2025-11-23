import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'alert' | 'warning'
  className?: string
}

export default function Badge({ 
  children, 
  variant = 'default',
  className = '' 
}: BadgeProps) {
  const variants = {
    default: 'bg-blue-deep text-white-pure border-teal-primary/30',
    success: 'bg-teal-primary/20 text-teal-primary border-teal-primary/50',
    alert: 'bg-red-alert/20 text-red-alert border-red-alert/50',
    warning: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
  }

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-semibold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

