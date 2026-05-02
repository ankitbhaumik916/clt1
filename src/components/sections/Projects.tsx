import { motion } from 'framer-motion'
import { HudBadge } from '../ui/HudBadge'

interface Project {
  title: string
  description: string
  status: 'UNDER_REVIEW' | 'COMPLETED' | 'IN_PROGRESS'
  tags: string[]
  statusVariant: 'amber' | 'green' | 'default'
}

export function Projects() {
  const projects: Project[] = [
    {
      title: 'Inhibitory Effect of Essential Oils Against Candida albicans Pathogenesis',
      description:
        'Evaluated antifungal properties of essential oils against C. albicans virulence factors, including biofilm inhibition and growth profiling for therapeutic validation.',
      status: 'UNDER_REVIEW',
      statusVariant: 'amber',
      tags: ['Antifungal', 'Biofilm', 'Microbiology', 'C. albicans'],
    },
    {
      title: 'Crop Disease Identifier using Machine Learning',
      description:
        'ML-based model detecting plant diseases from leaf images using image classification algorithms for early and accurate disease identification.',
      status: 'COMPLETED',
      statusVariant: 'green',
      tags: ['Machine Learning', 'Computer Vision', 'Python'],
    },
    {
      title: 'Inhibitory Effect of Essential Oil Against Serratia marcescens Pathogenesis',
      description:
        'Evaluating antibacterial properties of essential oils against S. marcescens virulence factors through biofilm inhibition and growth profiling studies.',
      status: 'IN_PROGRESS',
      statusVariant: 'default',
      tags: ['Antibacterial', 'Biofilm', 'Pathogen Research'],
    },
  ]

  return (
    <section id="projects" className="section-block">
      <div className="section-shell">
        <div className="section-heading">
          <span className="font-mono text-teal-bright">&gt; RESEARCH_PROJECTS</span>
          <h2 className="mt-4 text-[clamp(40px,4vw,48px)] font-display font-light text-white">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <div className="project-card">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <HudBadge label={project.status} variant={project.statusVariant} />
                </div>

                <h3 className="mb-4 font-display text-[18px] font-medium text-white">{project.title}</h3>

                <div className="mb-5 h-px bg-gradient-to-r from-white/20 to-transparent" />

                <p className="mb-6 text-[14px] leading-7 text-white/70 font-body">{project.description}</p>

                <div className="mt-auto project-tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border px-3 py-1.5 text-xs font-mono text-white/80"
                      style={{
                        background: 'rgba(45,212,191,0.08)',
                        borderColor: 'rgba(45,212,191,0.2)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
