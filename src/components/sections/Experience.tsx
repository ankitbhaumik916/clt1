import { motion } from 'framer-motion'
import { HudBadge } from '../ui/HudBadge'
import { GlassCard } from '../ui/GlassCard'

interface ExperienceEntry {
  title: string
  badge: string
  organization: string
  date?: string
  description: string[]
}

export function Experience() {
  const experiences: ExperienceEntry[] = [
    {
      title: 'Research Intern',
      badge: 'RESEARCH_INTERN',
      organization: 'SRMIST, Chennai',
      date: '2022 – Present',
      description: [
        '• Laboratory-based molecular biology experiments and microbial assays',
        '• Therapeutic research approaches and biotechnological applications',
        '• Lead researcher: Essential Oils vs Candida albicans (paper under review)',
      ],
    },
    {
      title: 'Column Chromatography Education',
      badge: 'VOLUNTEER_EDUCATOR',
      organization: 'RARIORA Initiative',
      description: ['Column Chromatography Education for High School Students'],
    },
    {
      title: 'Certifications',
      badge: 'CERTIFIED',
      organization: 'Professional Credentials',
      description: ['C Programming  ·  Bioinformatics'],
    },
  ]

  return (
    <section id="experience" className="section-block">
      <div className="section-shell">
        <div className="section-heading">
          <span className="font-mono text-teal-bright">&gt; EXPERIENCE_LOG</span>
          <h2 className="mt-4 text-[clamp(40px,4vw,48px)] font-display font-light text-white">Experience</h2>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-teal-bright/40" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative w-full pl-8"
              >
                <div
                  className="absolute left-[-9px] top-6 h-4 w-4 rounded-full bg-teal-bright"
                  style={{ boxShadow: '0 0 12px rgba(45,212,191,0.8)' }}
                />

                <GlassCard className="w-full p-8">
                  <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <HudBadge label={exp.badge} />
                    {exp.date && <span className="text-xs font-mono text-white/60">{exp.date}</span>}
                  </div>

                  <h3 className="mb-1 font-display text-xl text-white">{exp.title}</h3>
                  <p className="mb-4 font-mono text-sm text-teal-bright">{exp.organization}</p>

                  <div className="space-y-2">
                    {exp.description.map((item, i) => (
                      <p key={i} className="text-sm text-white/70 font-body">
                        {item}
                      </p>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
