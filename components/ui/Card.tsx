import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated'
  onClick?: () => void
}

export default function Card({ children, className = '', variant = 'default', onClick }: CardProps) {
  const baseStyles = 'bg-blue-deep rounded-lg border border-teal-primary/20'
  const variants = {
    default: '',
    elevated: 'shadow-lg shadow-teal-primary/10',
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

