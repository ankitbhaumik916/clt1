import { motion } from 'framer-motion'
import { Trophy, Presentation, Zap, Star } from 'lucide-react'
import { HudBadge } from '../ui/HudBadge'
import { GlassCard } from '../ui/GlassCard'

interface Achievement {
  icon: React.ReactNode
  title: string
  subtitle?: string
  badge: string
  badgeVariant: 'amber' | 'default' | 'violet' | 'green'
  color: string
}

export function Achievements() {
  const achievements: Achievement[] = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'International Conference of Bioengineering',
      subtitle: 'National Symposium on Microbial Technologies — 3Bs (Biofuels, Biofilms, Bioproducts)',
      badge: 'WINNER',
      badgeVariant: 'amber',
      color: 'text-bio-amber',
    },
    {
      icon: <Presentation className="w-8 h-8" />,
      title: 'National Conference on Applied Microbiology & Antimicrobial Resistance',
      subtitle: 'Poster Presentation',
      badge: 'PRESENTER',
      badgeVariant: 'default',
      color: 'text-teal-bright',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'ULTRON 2.0 — Top 25 Teams',
      subtitle: 'SIH Hackathon — University Level Participant',
      badge: 'TOP_25',
      badgeVariant: 'violet',
      color: 'text-bio-violet',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Multi-level Awardee',
      subtitle: 'Dance · Debate · Recitation · Bionexus (SRM Cultural Club)',
      badge: 'MULTI_AWARD',
      badgeVariant: 'green',
      color: 'text-bio-green',
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
  }

  return (
    <section id="achievements" className="section-block">
      <div className="section-shell">
        <div className="section-heading">
          <span className="font-mono text-teal-bright">&gt; ACHIEVEMENT_GALLERY</span>
          <h2 className="mt-4 text-[clamp(40px,4vw,48px)] font-display font-light text-white">Achievements & Awards</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.title}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <GlassCard className="h-full p-8">
                <div className={`${achievement.color} mb-4`}>{achievement.icon}</div>

                <h3 className="mb-3 font-display text-[18px] font-medium text-white">{achievement.title}</h3>

                {achievement.subtitle && (
                  <p className="mb-4 text-[14px] leading-7 text-white/70 font-body">{achievement.subtitle}</p>
                )}

                <HudBadge label={achievement.badge} variant={achievement.badgeVariant} />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
