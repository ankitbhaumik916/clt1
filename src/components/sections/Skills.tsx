import { motion } from 'framer-motion'
import { HudBadge } from '../ui/HudBadge'
import { GlassCard } from '../ui/GlassCard'
import { FlaskConical, Dna, Terminal } from 'lucide-react'
import { MoleculeOrbCanvas } from '../canvas/MoleculeOrb'
import { Suspense } from 'react'

interface SkillCategory {
  icon: React.ReactNode
  category: string
  label: string
  skills: string[]
}

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      icon: <FlaskConical className="w-8 h-8" />,
      category: 'LAB_SKILLS',
      label: 'Laboratory Techniques',
      skills: [
        'MIC Determination',
        'Growth Profile Study',
        'Biofilm Inhibition Assay',
        'Hyphal Inhibition Assay',
        'Swimming & Swarming Assay',
        'H₂O₂ Assay',
        'Prodigiosin Assay',
        'Live Dead Staining',
      ],
    },
    {
      icon: <Dna className="w-8 h-8" />,
      category: 'MOLECULAR_TECH',
      label: 'Molecular Techniques',
      skills: [
        'Gene Isolation',
        'RNA Extraction',
        'cDNA Synthesis',
        'Competent Cell Transformation',
        'Column Chromatography',
        'Pathogen Identification',
      ],
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      category: 'COMPUTATIONAL',
      label: 'Computational Skills',
      skills: ['MATLAB', 'C Programming', 'Bioinformatics', 'Machine Learning', 'Image Classification'],
    },
  ]

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.05 },
    }),
  }

  return (
    <section id="skills" className="section-block">
      <div className="section-shell">
        <div className="section-heading">
          <HudBadge label="SKILLS_MATRIX" />
          <h2 className="mt-4 text-[clamp(40px,4vw,48px)] font-display font-light text-white">Technical Arsenal</h2>
        </div>

        <div className="mb-16 flex justify-center">
          <Suspense fallback={<div className="h-[200px] w-[200px] rounded-2xl border border-white/10 bg-white/5" />}>
            <MoleculeOrbCanvas />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <GlassCard className="h-full p-8">
                <div className="mb-4 flex items-center gap-3 text-teal-bright">
                  {category.icon}
                  <h3 className="font-mono text-sm tracking-wider">&gt; {category.category}</h3>
                </div>

                <h4 className="mb-6 font-display text-lg text-white">{category.label}</h4>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      custom={i}
                      variants={pillVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="inline-block"
                      style={{
                        background: 'rgba(45,212,191,0.1)',
                        border: '1px solid rgba(45,212,191,0.25)',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'rgba(255,255,255,0.85)',
                        margin: '4px',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
