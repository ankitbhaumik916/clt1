import { motion } from 'framer-motion'
import { HudBadge } from '../ui/HudBadge'
import { TerminalText } from '../ui/TerminalText'
import { DnaHelixCanvas } from '../canvas/DnaHelix'
import { Suspense } from 'react'

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center section-block">
      <div className="section-shell w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <HudBadge label="BIOTECH_ENGINEER.EXE" />

            <h1
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(42px, 5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: 'white',
              }}
            >
              Dithhi Dasgupta
            </h1>

            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '16px',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.6,
              }}
            >
              <TerminalText text="Biotechnology Engineer & Research Enthusiast" delay={1200} />
            </p>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              📍 Chennai, Tamil Nadu
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                style={{
                  padding: '12px 28px',
                  borderRadius: '999px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                  color: '#2dd4bf',
                  background: 'rgba(45,212,191,0.1)',
                  border: '1px solid rgba(45,212,191,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '0.05em',
                }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(45,212,191,0.35)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {'>'} view_projects()
              </button>

              <button
                type="button"
                style={{
                  padding: '12px 28px',
                  borderRadius: '999px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                  color: 'white',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '0.05em',
                }}
                onClick={() => window.open('https://www.linkedin.com/in/dithhi-dasgupta-21b16834a?utm_source=share_via&utm_content=profile&utm_medium=member_android', '_blank')}
              >
                {'>'} open_linkedin()
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Suspense fallback={<div className="w-full h-[480px] rounded-2xl border border-white/10 bg-white/5" />}>
              <DnaHelixCanvas />
            </Suspense>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="text-teal-bright">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
