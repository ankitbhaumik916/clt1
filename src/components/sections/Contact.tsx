import { motion } from 'framer-motion'
import { useState } from 'react'
import { GlassCard } from '../ui/GlassCard'
import { GlowButton } from '../ui/GlowButton'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/60 mb-2">name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: 'white',
                    fontFamily: 'JetBrains Mono',
                    padding: '12px',
                    width: '100%',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(45,212,191,0.5)'
                    e.target.style.boxShadow = '0 0 20px rgba(45,212,191,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-2">email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: 'white',
                    fontFamily: 'JetBrains Mono',
                    padding: '12px',
                    width: '100%',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(45,212,191,0.5)'
                    e.target.style.boxShadow = '0 0 20px rgba(45,212,191,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-2">message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  rows={4}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: 'white',
                    fontFamily: 'JetBrains Mono',
                    padding: '12px',
                    width: '100%',
                    resize: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(45,212,191,0.5)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(45,212,191,0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div className="pt-4">
                <GlowButton className="w-full">
                  &gt; SEND_MESSAGE
                </GlowButton>
              </div>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-teal-bright text-sm font-mono"
                >
                  Message sent successfully! ✓
                </motion.p>
              )}
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
