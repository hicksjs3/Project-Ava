import { ReactNode } from 'react'

interface DataDisplayProps {
  label: string
  value: ReactNode
  variant?: 'default' | 'large' | 'small'
  className?: string
}

export default function DataDisplay({ 
  label, 
  value, 
  variant = 'default',
  className = '' 
}: DataDisplayProps) {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-3xl',
    large: 'text-4xl md:text-5xl',
  }

  return (
    <div className={`${className}`}>
      <div className="text-sm md:text-base text-white-pure/70 font-body mb-2">
        {label}
      </div>
      <div className={`data-font text-teal-primary ${sizeClasses[variant]}`}>
        {value}
      </div>
    </div>
  )
}

