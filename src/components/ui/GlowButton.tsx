import React from 'react'

interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function GlowButton({ children, onClick, className = '' }: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3.5 rounded-full font-mono text-sm tracking-wider text-white transition-all duration-300 cursor-pointer ${className}`}
      style={{
        background: 'rgba(45,212,191,0.15)',
        border: '1px solid rgba(45,212,191,0.4)',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement
        target.style.boxShadow = '0 0 25px rgba(45,212,191,0.4)'
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement
        target.style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}
