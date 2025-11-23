import { ButtonHTMLAttributes, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'alert'
  icon?: LucideIcon
  children: ReactNode
}

export default function Button({ 
  variant = 'primary', 
  icon: Icon,
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-body font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-teal-primary text-white-pure hover:bg-teal-primary/90 active:bg-teal-primary/80',
    secondary: 'bg-blue-deep text-white-pure border border-teal-primary/30 hover:border-teal-primary/50',
    alert: 'bg-red-alert text-white-pure hover:bg-red-alert/90 active:bg-red-alert/80',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  )
}

