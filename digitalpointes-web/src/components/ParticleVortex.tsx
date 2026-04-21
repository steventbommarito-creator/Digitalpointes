'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { generateShape, PARTICLE_COUNT, SHAPE_SEQUENCE } from '@/lib/particleShapes'

const HOLD_MS = 3200
const MORPH_MS = 1700
const SCALE = 2.3
const CAMERA_Z = 4.5

interface LabelState {
  label: string
  sub: string
  visible: boolean
}

export default function ParticleVortex() {
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [labelState, setLabelState] = useState<LabelState>({
    label: SHAPE_SEQUENCE[0].label,
    sub: SHAPE_SEQUENCE[0].sub,
    visible: true,
  })

  const updateLabel = useCallback((idx: number, show: boolean) => {
    setLabelState({
      label: SHAPE_SEQUENCE[idx].label,
      sub: SHAPE_SEQUENCE[idx].sub,
      visible: show,
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Pre-generate all shapes
    const shapes = SHAPE_SEQUENCE.map(s => generateShape(s.key))

    // Scene setup
    const scene = new THREE.Scene()
    const w = el.clientWidth
    const h = el.clientHeight
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
    camera.position.z = CAMERA_Z

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Particle positions (live, mutated during morph)
    const positions = new Float32Array(shapes[0])

    // Per-particle colours: 68% warm white, 22% warm gray, 10% orange
    const colorsArr = new Float32Array(PARTICLE_COUNT * 3)
    const white  = new THREE.Color('#E8E4DC')
    const gray   = new THREE.Color('#8A8680')
    const orange = new THREE.Color('#FF9E1B')
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = Math.random()
      const c = r < 0.10 ? orange : r < 0.32 ? gray : white
      colorsArr[i * 3]     = c.r
      colorsArr[i * 3 + 1] = c.g
      colorsArr[i * 3 + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colorsArr, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.020,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.88,
    })

    const points = new THREE.Points(geo, mat)
    points.scale.setScalar(SCALE)
    scene.add(points)

    // Animation loop
    let animId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      animId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      points.rotation.y = Math.sin(t * 0.09) * 0.18
      points.rotation.x = Math.sin(t * 0.07) * 0.07
      renderer.render(scene, camera)
    }
    tick()

    // Morph engine
    let currentIdx = 0
    let morphTimeout: ReturnType<typeof setTimeout>
    let killed = false

    const morphTo = (nextIdx: number) => {
      if (killed) return
      updateLabel(currentIdx, false)

      const source = new Float32Array(positions)
      const target = shapes[nextIdx]
      const proxy = { t: 0 }

      gsap.killTweensOf(proxy)
      gsap.to(proxy, {
        t: 1,
        duration: MORPH_MS / 1000,
        ease: 'power2.inOut',
        onUpdate() {
          const p = proxy.t
          for (let i = 0; i < positions.length; i++) {
            positions[i] = source[i] + (target[i] - source[i]) * p
          }
          geo.attributes.position.needsUpdate = true
        },
        onComplete() {
          currentIdx = nextIdx
          if (!killed) {
            updateLabel(nextIdx, true)
            morphTimeout = setTimeout(
              () => morphTo((nextIdx + 1) % SHAPE_SEQUENCE.length),
              HOLD_MS,
            )
          }
        },
      })
    }

    morphTimeout = setTimeout(() => morphTo(1), HOLD_MS)

    // Resize
    const onResize = () => {
      const nw = el.clientWidth
      const nh = el.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      killed = true
      clearTimeout(morphTimeout)
      gsap.killTweensOf({})
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [updateLabel])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="absolute inset-0" />
      {/* Service label overlay */}
      <div
        ref={labelRef}
        className="absolute bottom-16 left-8 md:left-12 select-none pointer-events-none"
        style={{
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          opacity: labelState.visible ? 1 : 0,
          transform: labelState.visible ? 'translateY(0)' : 'translateY(6px)',
        }}
      >
        <p
          className="text-xs tracking-[0.25em] font-semibold mb-1"
          style={{ color: '#FF9E1B' }}
        >
          {labelState.label}
        </p>
        <p className="text-sm" style={{ color: 'rgba(232,228,220,0.65)' }}>
          {labelState.sub}
        </p>
      </div>
    </div>
  )
}
