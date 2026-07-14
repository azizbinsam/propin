import { Check } from 'lucide-react'

const BADGE_STYLES = {
  success: 'bg-green-50 text-green-700',
  warning: 'bg-gold-100 text-gold-800',
  neutral: 'bg-neutral-100 text-neutral-600',
  gold: 'bg-gold-50 text-gold-700',
}

export default function Badge({
  children,
  variant = 'neutral',
  withCheck = false,
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1
        rounded-full px-3 py-1 text-xs font-semibold
        ${BADGE_STYLES[variant]}
        ${className}
      `}
    >
      {withCheck && <Check size={12} strokeWidth={3} />}
      {children}
    </span>
  )
}