import { useEffect, useRef } from 'react'

export function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      canvas.width = 300
      canvas.height = 520
      ctx.fillStyle = '#020c0e'
      ctx.fillRect(0, 0, 300, 520)
      return
    }

    // Apply DPR capping for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = 300 * dpr
    canvas.height = 520 * dpr
    canvas.style.width = '300px'
    canvas.style.height = '520px'
    ctx.scale(dpr, dpr)

    const W = 300
    const H = 520
    const CX = W / 2

    const RUNGS = 26
    const AMP = 82
    const HELIX_TURNS = 2.5
    const ROT_SPD = 0.0028
    const SCROLL_SPD = 0.0012
    const WOBBLE_AMP = 5
    const WOBBLE_SPD = 0.0007

    const SEQ = [0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1]
    const PAIRS = [
      { a: '#e91919', b: '#e0810e', aRgb: '233,25,25', bRgb: '224,129,14' },
      { a: '#1c170e', b: '#4012f8', aRgb: '28,23,14', bRgb: '64,18,248' },
    ]

    let rot = 0
    let scroll = 0
    let wobble = 0
    let rafId = 0
    let isVisible = true

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      col: string
      life: number
    }

    let particles: Particle[] = []

    function emit(x: number, y: number, col: string) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -0.5 - Math.random() * 0.8,
        r: 1.2 + Math.random() * 1.8,
        col,
        life: 1,
      })
    }

    function tickParticles() {
      particles = particles.filter((p) => p.life > 0)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.012
        p.life -= 0.016
      }
    }

    function drawParticles() {
      for (const p of particles) {
        ctx!.save()
        ctx!.globalAlpha = p.life * 0.7
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = p.col
        ctx!.fill()
        ctx!.restore()
      }
    }

    function buildRungs() {
      return Array.from({ length: RUNGS }, (_, i) => {
        const frac = i / (RUNGS - 1)
        const y = 28 + frac * (H - 56)
        const phase = frac * HELIX_TURNS * Math.PI * 2 + rot + scroll
        const sway = Math.sin(wobble + frac * Math.PI * 1.4) * WOBBLE_AMP
        const groove = 1 - 0.18 * Math.pow(Math.cos(phase * 2), 2)

        return {
          i,
          frac,
          y,
          x1: CX + sway + Math.cos(phase) * AMP,
          z1: Math.sin(phase),
          x2: CX + sway + Math.cos(phase + Math.PI) * AMP,
          z2: Math.sin(phase + Math.PI),
          phase,
          groove,
          pair: PAIRS[SEQ[i % SEQ.length]],
        }
      })
    }

    function drawBackbone(rungs: ReturnType<typeof buildRungs>, strand: 'A' | 'B') {
      const pts = rungs.map((r) => ({
        x: strand === 'A' ? r.x1 : r.x2,
        y: r.y,
      }))

      const layers = [
        { lw: 5, alpha: 0.06 },
        { lw: 3, alpha: 0.14 },
        { lw: 1.8, alpha: 0.55 },
        { lw: 0.8, alpha: 0.9 },
      ]

      for (const { lw, alpha } of layers) {
        ctx!.save()
        ctx!.beginPath()
        ctx!.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i - 1]
          const q = pts[i]
          ctx!.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2)
        }
        ctx!.quadraticCurveTo(
          pts[pts.length - 2].x,
          pts[pts.length - 2].y,
          pts[pts.length - 1].x,
          pts[pts.length - 1].y,
        )
        const col = strand === 'A' ? '45,212,191' : '167,139,250'
        const g = ctx!.createLinearGradient(0, 28, 0, H - 28)
        g.addColorStop(0, `rgba(${col},${alpha * 0.4})`)
        g.addColorStop(0.25, `rgba(${col},${alpha})`)
        g.addColorStop(0.5, `rgba(${col},${alpha})`)
        g.addColorStop(0.75, `rgba(${col},${alpha})`)
        g.addColorStop(1, `rgba(${col},${alpha * 0.4})`)
        ctx!.strokeStyle = g
        ctx!.lineWidth = lw
        ctx!.lineCap = 'round'
        ctx!.lineJoin = 'round'
        ctx!.stroke()
        ctx!.restore()
      }
    }

    function drawRung(r: ReturnType<typeof buildRungs>[number]) {
      const { x1, y, z1, x2, z2, pair, groove } = r
      const dA = (z1 + 1) / 2
      const dB = (z2 + 1) / 2
      const avg = (dA + dB) / 2
      const mx = (x1 + x2) / 2

      const bondAlpha = (0.1 + 0.25 * avg) * groove

      const hgA = ctx!.createLinearGradient(x1, y, mx, y)
      hgA.addColorStop(0, `rgba(${pair.aRgb},${bondAlpha + 0.05 * dA})`)
      hgA.addColorStop(1, `rgba(255,255,255,${bondAlpha * 0.4})`)
      ctx!.beginPath()
      ctx!.moveTo(x1, y)
      ctx!.lineTo(mx, y)
      ctx!.strokeStyle = hgA
      ctx!.lineWidth = 1 + avg * 1.5
      ctx!.stroke()

      const hgB = ctx!.createLinearGradient(mx, y, x2, y)
      hgB.addColorStop(0, `rgba(255,255,255,${bondAlpha * 0.4})`)
      hgB.addColorStop(1, `rgba(${pair.bRgb},${bondAlpha + 0.05 * dB})`)
      ctx!.beginPath()
      ctx!.moveTo(mx, y)
      ctx!.lineTo(x2, y)
      ctx!.strokeStyle = hgB
      ctx!.lineWidth = 1 + avg * 1.5
      ctx!.stroke()

      const sA = 4.5 + 8 * dA
      ctx!.save()
      ctx!.globalAlpha = 0.45 + 0.55 * dA
      const rA = ctx!.createRadialGradient(x1 - sA * 0.3, y - sA * 0.3, 0, x1, y, sA)
      rA.addColorStop(0, '#ffffff')
      rA.addColorStop(0.25, pair.a)
      rA.addColorStop(0.7, pair.a + 'bb')
      rA.addColorStop(1, pair.a + '33')
      ctx!.beginPath()
      ctx!.arc(x1, y, sA, 0, Math.PI * 2)
      ctx!.fillStyle = rA
      ctx!.fill()
      ctx!.restore()

      const sB = 4 + 7 * dB
      ctx!.save()
      ctx!.globalAlpha = 0.45 + 0.55 * dB
      const rB = ctx!.createRadialGradient(x2 - sB * 0.3, y - sB * 0.3, 0, x2, y, sB)
      rB.addColorStop(0, '#ffffff')
      rB.addColorStop(0.25, pair.b)
      rB.addColorStop(0.7, pair.b + 'bb')
      rB.addColorStop(1, pair.b + '33')
      ctx!.beginPath()
      ctx!.arc(x2, y, sB, 0, Math.PI * 2)
      ctx!.fillStyle = rB
      ctx!.fill()
      ctx!.restore()

      if (Math.random() < 0.002) emit(x1, y, pair.a)
      if (Math.random() < 0.002) emit(x2, y, pair.b)
    }

    function frame() {
      ctx!.clearRect(0, 0, W, H)

      rot += ROT_SPD
      scroll += SCROLL_SPD
      wobble += WOBBLE_SPD

      const rungs = buildRungs()

      drawBackbone(rungs, 'A')
      drawBackbone(rungs, 'B')

      const sorted = [...rungs].sort((a, b) => (a.z1 + a.z2) / 2 - (b.z1 + b.z2) / 2)
      for (const rung of sorted) drawRung(rung)

      tickParticles()
      drawParticles()

      if (isVisible) {
        rafId = requestAnimationFrame(frame)
      }
    }

    // IntersectionObserver to pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          isVisible = true
          rafId = requestAnimationFrame(frame)
        } else if (!entry.isIntersecting && isVisible) {
          isVisible = false
          cancelAnimationFrame(rafId)
        }
      },
      { threshold: 0 }
    )

    observer.observe(canvas)

    rafId = requestAnimationFrame(frame)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ background: 'transparent', display: 'block' }} />
}

export function DnaHelixCanvas() {
  return <DnaHelix />
}
