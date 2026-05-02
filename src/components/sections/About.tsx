import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HudBadge } from '../ui/HudBadge'
import { GlassCard } from '../ui/GlassCard'

gsap.registerPlugin(ScrollTrigger)

interface CounterProps {
  value: number
  label: string
}

function Counter({ value, label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isInitialized) return

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(element, {
          innerHTML: value,
          duration: 1.8,
          snap: { innerHTML: 0.01 },
          ease: 'power2.out',
        })
        setIsInitialized(true)
      },
    })

    return () => trigger.kill()
  }, [value, isInitialized])

  return (
    <GlassCard className="p-6 text-center">
      <div ref={ref} className="text-4xl font-display font-bold text-teal-bright">
        0
      </div>
      <p className="text-xs font-mono text-white/60 mt-2">{label}</p>
    </GlassCard>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="about" ref={sectionRef} className="section-block">
      <div className="section-shell">
        <div className="section-heading">
          <HudBadge label="ABOUT_ME" />
          <h2 className="mt-4 text-[clamp(40px,4vw,48px)] font-display font-light text-white">Who I Am</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start"
        >
          <div className="flex flex-col items-center gap-6">
            <GlassCard className="overflow-hidden p-0 w-full">
              <div
                className="mx-auto h-64 w-64 overflow-hidden"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <img 
                  src="/profile.jpg" 
                  alt="Dithhi Dasgupta" 
                  className="h-full w-full object-cover"
                />
              </div>
            </GlassCard>
          </div>

          <div className="flex flex-col gap-8">
            <p className="max-w-3xl text-[16px] leading-8 text-white/80 font-body">
              I'm a 3rd-year Biotechnology Engineering student at SRMIST, Chennai, currently working as a Research Intern under Dr. Satish Kumar R. My work bridges wet-lab molecular biology with computational tools — from microbial assays to machine learning-based disease detection. I'm driven by the intersection of life sciences and technology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Counter value={8.37} label="CGPA (5th Sem)" />
              <Counter value={3} label="Active Projects" />
              <Counter value={2} label="Awards Won" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
