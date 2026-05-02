import { motion } from 'framer-motion'
import { useState } from 'react'
import { GlassCard } from '../ui/GlassCard'
import { GlowButton } from '../ui/GlowButton'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // For now, just log to console and show success message
      // To enable email sending, add VITE_WEB3FORMS_KEY to your .env
      console.log('Form submission:', formData)
      // TODO: Uncomment when ready to use Web3Forms
      // const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
      // const res = await fetch('https://api.web3forms.com/submit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     access_key: WEB3FORMS_KEY,
      //     subject: `Portfolio contact from ${formData.name}`,
      //     from_name: 'Dithhi Dasgupta Portfolio',
      //     ...formData,
      //   }),
      // })
      // if (!res.ok) throw new Error('Form submission failed')
      
      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      console.error('Form error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const inputCls = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 font-mono text-white placeholder:text-white/40 focus:border-teal-bright/50 focus:outline-none focus:ring-2 focus:ring-teal-bright/20'

  return (
    <section id="contact" className="section-block">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-[760px]"
        >
          <GlassCard className="p-8 sm:p-12">
            <div className="mb-8 space-y-2">
              <h2 className="text-4xl md:text-5xl font-mono text-teal-bright">&gt; INITIATE_CONTACT.sh</h2>
              <p className="text-white/70 font-body">Open to research collaborations, internships & opportunities.</p>
            </div>

            <div className="mb-8 space-y-4 font-mono text-sm">
              <div className="text-white/70">
                <span className="text-teal-bright">$ echo $EMAIL</span>
                <span className="text-white/50"> → </span>
                <a
                  href="mailto:dids2367@gmail.com"
                  className="text-white hover:text-teal-bright transition-colors"
                >
                  dids2367@gmail.com
                </a>
              </div>

              <div className="text-white/70">
                <span className="text-teal-bright">$ echo $PHONE</span>
                <span className="text-white/50"> → </span>
                <a
                  href="tel:+919475542893"
                  className="text-white hover:text-teal-bright transition-colors"
                >
                  +91-9475542893
                </a>
              </div>

              <div className="text-white/70">
                <span className="text-teal-bright">$ echo $LOCATION</span>
                <span className="text-white/50"> → </span>
                <span className="text-white">Chennai, Tamil Nadu, India</span>
              </div>

              <div className="text-white/70">
                <span className="text-teal-bright">$ open $LINKEDIN</span>
                <span className="text-white/50"> → </span>
                <a
                  href="https://www.linkedin.com/in/dithhi-dasgupta-21b16834a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-bright transition-colors"
                >
                  www.linkedin.com/in/dithhi-dasgupta-21b16834a
                </a>
              </div>
            </div>

            <div className="my-8 h-px bg-gradient-to-r from-teal-bright/20 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-white/60 mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-white/60 mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-white/60 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="A line about why you're reaching out…"
                  rows={5}
                  className={`${inputCls} resize-y`}
                />
              </div>

              <div className="pt-4">
                <GlowButton type="submit" disabled={status === 'sending'} className="w-full">
                  {status === 'sending' ? 'Sending…' : '> SEND_MESSAGE'}
                </GlowButton>
              </div>

              <div role="status" aria-live="polite" className="min-h-[24px] text-center text-sm font-mono">
                {status === 'sent' && (
                  <span className="text-teal-bright">✓ Message sent — I'll reply within a day or two.</span>
                )}
                {status === 'error' && (
                  <span className="text-red-400">Something went wrong. Please email dids2367@gmail.com directly.</span>
                )}
              </div>
            </form>
          </GlassCard>

          <div className="pt-8 text-center">
            <p className="text-xs font-mono text-white/40">© 2025 Dithhi Dasgupta</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
