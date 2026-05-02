import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function GlassCard({ children, className = '', id }: GlassCardProps) {
  return (
    <div
      id={id}
      className={`rounded-2xl border transition-all duration-300 group ${className}`}
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement
        target.style.border = '1px solid rgba(255,255,255,0.22)'
        target.style.boxShadow = '0 0 40px rgba(45,212,191,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement
        target.style.border = '1px solid rgba(255,255,255,0.12)'
        target.style.boxShadow = 'none'
      }}
    >
      {children}
    </div>
  )
}
