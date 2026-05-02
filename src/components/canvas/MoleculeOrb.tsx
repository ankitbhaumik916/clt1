import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

function MoleculeOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.004
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3}>
      <Icosahedron ref={meshRef} args={[1.2, 1]}>
        <meshStandardMaterial
          wireframe
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={0.3}
        />
      </Icosahedron>
    </Float>
  )
}

export function MoleculeOrbCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ width: '200px', height: '200px', margin: '0 auto' }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <MoleculeOrb />
      <pointLight color="#2dd4bf" intensity={1.5} position={[2, 2, 2]} />
    </Canvas>
  )
}
