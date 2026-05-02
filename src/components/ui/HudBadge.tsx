interface HudBadgeProps {
  label: string
  variant?: 'default' | 'amber' | 'green' | 'violet'
}

export function HudBadge({ label, variant = 'default' }: HudBadgeProps) {
  const variants = {
    default: {
      background: 'rgba(45,212,191,0.12)',
      border: '1px solid rgba(45,212,191,0.3)',
      color: '#2dd4bf',
    },
    amber: {
      background: 'rgba(251,191,36,0.12)',
      border: '1px solid rgba(251,191,36,0.3)',
      color: '#fbbf24',
    },
    green: {
      background: 'rgba(74,222,128,0.12)',
      border: '1px solid rgba(74,222,128,0.3)',
      color: '#4ade80',
    },
    violet: {
      background: 'rgba(167,139,250,0.12)',
      border: '1px solid rgba(167,139,250,0.3)',
      color: '#a78bfa',
    },
  }

  const style = variants[variant]

  return (
    <span
      className="font-mono text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-lg inline-block"
      style={{ ...style }}
    >
      [ {label} ]
    </span>
  )
}
