import { Warp } from '@paper-design/shaders-react'
import { useEffect, useState } from 'react'

export function WarpBackground() {
  const [showWarp, setShowWarp] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShowWarp(!reduced)
  }, [])

  if (!showWarp) {
    return <div className="fixed inset-0 z-0 bg-[#020c0e]" aria-hidden="true" />
  }

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Warp
        style={{ width: '100%', height: '100%' }}
        proportion={0.5}
        softness={0.9}
        distortion={0.3}
        swirl={0.9}
        swirlIterations={12}
        shape="checks"
        shapeScale={0.12}
        scale={1.1}
        rotation={0}
        speed={0.6}
        colors={[
          'hsl(195, 100%, 8%)',
          'hsl(175, 90%, 18%)',
          'hsl(185, 100%, 35%)',
          'hsl(165, 80%, 55%)',
        ]}
      />
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(2,12,14,0.7) 100%)',
        }}
      />
    </div>
  )
}
