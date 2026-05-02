import { useEffect, useRef } from 'react'

export function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    canvas.width = 300
    canvas.height = 520
    const W = canvas.width
    const H = canvas.height
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
      { a: '#e91919', b: '#e0810e' },
      { a: '#1c170e', b: '#4012f8' },
    ]

    let rot = 0
    let scroll = 0
    let wobble = 0
    let rafId = 0

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
        ctx.save()
        ctx.globalAlpha = p.life * 0.7
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.col
        ctx.shadowBlur = 6
        ctx.shadowColor = p.col
        ctx.fill()
        ctx.restore()
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
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i - 1]
          const q = pts[i]
          ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2)
        }
        ctx.quadraticCurveTo(
          pts[pts.length - 2].x,
          pts[pts.length - 2].y,
          pts[pts.length - 1].x,
          pts[pts.length - 1].y,
        )
        const col = strand === 'A' ? '45,212,191' : '167,139,250'
        const g = ctx.createLinearGradient(0, 28, 0, H - 28)
        g.addColorStop(0, `rgba(${col},${alpha * 0.4})`)
        g.addColorStop(0.25, `rgba(${col},${alpha})`)
        g.addColorStop(0.5, `rgba(${col},${alpha})`)
        g.addColorStop(0.75, `rgba(${col},${alpha})`)
        g.addColorStop(1, `rgba(${col},${alpha * 0.4})`)
        ctx.strokeStyle = g
        ctx.lineWidth = lw
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowBlur = lw > 2 ? 8 : 0
        ctx.shadowColor = strand === 'A' ? '#151f1e' : '#a78bfa'
        ctx.stroke()
        ctx.restore()
      }
    }

    function hexToRgb(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `${r},${g},${b}`
    }

    function drawRung(r: ReturnType<typeof buildRungs>[number]) {
      const { x1, y, z1, x2, z2, pair, groove } = r
      const dA = (z1 + 1) / 2
      const dB = (z2 + 1) / 2
      const avg = (dA + dB) / 2
      const mx = (x1 + x2) / 2

      const bondAlpha = (0.1 + 0.25 * avg) * groove

      const hgA = ctx.createLinearGradient(x1, y, mx, y)
      hgA.addColorStop(0, `rgba(${hexToRgb(pair.a)},${bondAlpha + 0.05 * dA})`)
      hgA.addColorStop(1, `rgba(255,255,255,${bondAlpha * 0.4})`)
      ctx.beginPath()
      ctx.moveTo(x1, y)
      ctx.lineTo(mx, y)
      ctx.strokeStyle = hgA
      ctx.lineWidth = 1 + avg * 1.5
      ctx.shadowBlur = 0
      ctx.stroke()

      const hgB = ctx.createLinearGradient(mx, y, x2, y)
      hgB.addColorStop(0, `rgba(255,255,255,${bondAlpha * 0.4})`)
      hgB.addColorStop(1, `rgba(${hexToRgb(pair.b)},${bondAlpha + 0.05 * dB})`)
      ctx.beginPath()
      ctx.moveTo(mx, y)
      ctx.lineTo(x2, y)
      ctx.strokeStyle = hgB
      ctx.lineWidth = 1 + avg * 1.5
      ctx.stroke()

      const sA = 4.5 + 8 * dA
      ctx.save()
      ctx.globalAlpha = 0.45 + 0.55 * dA
      const rA = ctx.createRadialGradient(x1 - sA * 0.3, y - sA * 0.3, 0, x1, y, sA)
      rA.addColorStop(0, '#ffffff')
      rA.addColorStop(0.25, pair.a)
      rA.addColorStop(0.7, pair.a + 'bb')
      rA.addColorStop(1, pair.a + '33')
      ctx.beginPath()
      ctx.arc(x1, y, sA, 0, Math.PI * 2)
      ctx.fillStyle = rA
      ctx.shadowBlur = 8 + 14 * dA
      ctx.shadowColor = pair.a
      ctx.fill()
      ctx.restore()

      const sB = 4 + 7 * dB
      ctx.save()
      ctx.globalAlpha = 0.45 + 0.55 * dB
      const rB = ctx.createRadialGradient(x2 - sB * 0.3, y - sB * 0.3, 0, x2, y, sB)
      rB.addColorStop(0, '#ffffff')
      rB.addColorStop(0.25, pair.b)
      rB.addColorStop(0.7, pair.b + 'bb')
      rB.addColorStop(1, pair.b + '33')
      ctx.beginPath()
      ctx.arc(x2, y, sB, 0, Math.PI * 2)
      ctx.fillStyle = rB
      ctx.shadowBlur = 6 + 12 * dB
      ctx.shadowColor = pair.b
      ctx.fill()
      ctx.restore()

      if (Math.random() < 0.002) emit(x1, y, pair.a)
      if (Math.random() < 0.002) emit(x2, y, pair.b)
    }

    function frame() {
      ctx.clearRect(0, 0, W, H)

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

      rafId = requestAnimationFrame(frame)
    }

    frame()

    return () => cancelAnimationFrame(rafId)
  }, [])

  return <canvas ref={canvasRef} style={{ background: 'transparent', display: 'block' }} />
}

export function DnaHelixCanvas() {
  return <DnaHelix />
}
