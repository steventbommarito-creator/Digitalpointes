'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { generateShape, PARTICLE_COUNT, SHAPE_SEQUENCE } from '@/lib/particleShapes'

const N = SHAPE_SEQUENCE.length
const SCALE = 2.3
const CAMERA_Z = 4.5

// Pre-compute per-particle golden-angle phase and speed (module-level, once)
const PP = new Float32Array(PARTICLE_COUNT)
const PS = new Float32Array(PARTICLE_COUNT)
for (let i = 0; i < PARTICLE_COUNT; i++) {
  PP[i] = (i * 2.39996) % (Math.PI * 2)
  PS[i] = 0.5 + (i % 17) / 17
}

function vortexLerp(
  positions: Float32Array,
  src: Float32Array,
  tgt: Float32Array,
  frac: number,
) {
  const v = Math.sin(frac * Math.PI)   // 0 → 1 → 0 through transition
  const spin = frac * Math.PI * 2.4

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const bi = i * 3
    const bx = src[bi]     + (tgt[bi]     - src[bi])     * frac
    const by = src[bi + 1] + (tgt[bi + 1] - src[bi + 1]) * frac
    const bz = src[bi + 2] + (tgt[bi + 2] - src[bi + 2]) * frac

    if (v < 0.0015) {
      positions[bi] = bx; positions[bi + 1] = by; positions[bi + 2] = bz
      continue
    }

    // Spiral spin — scaled by v so start/end shapes stay clean
    const angle = (PP[i] * 0.12 + spin * PS[i]) * v
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)
    const rx = bx * cosA - by * sinA
    const ry = bx * sinA + by * cosA

    // Radial expansion at peak transition
    const dist = Math.sqrt(bx * bx + by * by) || 0.0001
    const exp = v * 0.42 * (0.25 + dist * 0.75)

    positions[bi]     = rx + (rx / dist) * exp
    positions[bi + 1] = ry + (ry / dist) * exp
    positions[bi + 2] = bz + Math.sin(PP[i] + spin * PS[i]) * v * 0.14
  }
}

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export default function ParticleVortex({ containerRef }: Props) {
  const canvasRef     = useRef<HTMLDivElement>(null)
  const headlineRef   = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const labelRef      = useRef<HTMLDivElement>(null)
  const labelNumRef   = useRef<HTMLSpanElement>(null)
  const labelNameRef  = useRef<HTMLParagraphElement>(null)
  const labelSubRef   = useRef<HTMLParagraphElement>(null)
  const dotsRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const shapes = SHAPE_SEQUENCE.map(s => generateShape(s.key))

    // Three.js
    const scene    = new THREE.Scene()
    const w        = canvas.clientWidth
    const h        = canvas.clientHeight
    const camera   = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
    camera.position.z = CAMERA_Z

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    canvas.appendChild(renderer.domElement)

    const positions = new Float32Array(shapes[0])

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
    geo.setAttribute('color',    new THREE.BufferAttribute(colorsArr, 3))

    const mat    = new THREE.PointsMaterial({ size: 0.020, vertexColors: true, sizeAttenuation: true, transparent: true, opacity: 0.88 })
    const points = new THREE.Points(geo, mat)
    points.scale.setScalar(SCALE)
    scene.add(points)

    // DOM refs (captured once — avoids closure churn)
    const headline   = headlineRef.current
    const scrollHint = scrollHintRef.current
    const labelEl    = labelRef.current
    const labelNum   = labelNumRef.current
    const labelName  = labelNameRef.current
    const labelSub   = labelSubRef.current
    const dotsEl     = dotsRef.current

    // Build progress dots
    const dotEls: HTMLElement[] = []
    if (dotsEl) {
      dotsEl.innerHTML = ''
      for (let i = 0; i < N; i++) {
        const d = document.createElement('div')
        d.style.cssText = `width:5px;height:5px;border-radius:50%;background:rgba(255,158,27,${i === 0 ? 1 : 0.22});transition:background 0.35s`
        dotsEl.appendChild(d)
        dotEls.push(d)
      }
    }

    let smooth          = 0
    let lastDisplayIdx  = -1
    let animId          = 0
    let killed          = false
    const startTime     = performance.now()

    const tick = () => {
      if (killed) return
      animId = requestAnimationFrame(tick)

      // --- Scroll progress ---
      const rect       = container.getBoundingClientRect()
      const raw        = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      smooth          += (raw - smooth) * 0.042

      // --- Shape mapping ---
      const totalP  = smooth * (N - 1)          // 0 → N-1
      const idx     = Math.min(Math.floor(totalP), N - 2)
      const frac    = totalP - idx               // 0 → 1

      // --- Vortex positions ---
      vortexLerp(positions, shapes[idx], shapes[idx + 1], frac)
      geo.attributes.position.needsUpdate = true

      // --- Ambient rotation ---
      const t = (performance.now() - startTime) / 1000
      points.rotation.y = Math.sin(t * 0.09) * 0.18
      points.rotation.x = Math.sin(t * 0.07) * 0.07

      renderer.render(scene, camera)

      // --- Headline fade ---
      if (headline) {
        const op = Math.max(0, 1 - smooth * 18)
        headline.style.opacity   = String(op)
        headline.style.transform = `translateY(${-smooth * 80}px)`
      }

      // --- Scroll hint ---
      if (scrollHint) {
        scrollHint.style.opacity = String(Math.max(0, 1 - smooth * 28))
      }

      // --- Service label ---
      let displayIdx: number
      let labelOp: number
      if (frac < 0.5) {
        displayIdx = idx
        labelOp    = 1 - frac * 2
      } else {
        displayIdx = idx + 1
        labelOp    = (frac - 0.5) * 2
      }

      if (labelEl) {
        labelEl.style.opacity   = String(labelOp)
        labelEl.style.transform = `translateY(${(1 - labelOp) * 7}px)`
      }

      if (displayIdx !== lastDisplayIdx) {
        lastDisplayIdx = displayIdx
        const seq = SHAPE_SEQUENCE[displayIdx]
        if (labelNum)  labelNum.textContent  = String(displayIdx + 1).padStart(2, '0')
        if (labelName) labelName.textContent = seq.label
        if (labelSub)  labelSub.textContent  = seq.sub
        dotEls.forEach((d, i) => {
          d.style.background = `rgba(255,158,27,${i === displayIdx ? 1 : 0.22})`
        })
      }
    }
    tick()

    const onResize = () => {
      const nw = canvas.clientWidth; const nh = canvas.clientHeight
      camera.aspect = nw / nh; camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      killed = true
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose(); geo.dispose(); mat.dispose()
      if (canvas.contains(renderer.domElement)) canvas.removeChild(renderer.domElement)
    }
  }, [containerRef])

  return (
    <div className="relative w-full h-full">
      {/* Three.js canvas */}
      <div ref={canvasRef} className="absolute inset-0" />

      {/* Headline — fades as user scrolls into shapes */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none"
        style={{ willChange: 'opacity, transform' }}
      >
        <p className="text-xs tracking-[0.3em] font-semibold uppercase mb-6" style={{ color: '#FF9E1B' }}>
          Digital Pointes
        </p>
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-5" style={{ color: '#F5F3EF' }}>
          You can&apos;t close a click.
        </h1>
        <p className="text-lg lg:text-xl tracking-wide" style={{ color: 'rgba(232,228,220,0.65)' }}>
          Meaningful, measurable marketing.
        </p>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none scroll-hint-bounce"
        style={{ willChange: 'opacity' }}
      >
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,228,220,0.35)' }}>
          Scroll
        </p>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(232,228,220,0.25)" strokeWidth="1.5" />
          <rect x="6.5" y="5" width="3" height="6" rx="1.5" fill="rgba(255,158,27,0.6)" />
        </svg>
      </div>

      {/* Service label — bottom left */}
      <div
        ref={labelRef}
        className="absolute bottom-16 left-8 md:left-12 select-none pointer-events-none"
        style={{ willChange: 'opacity, transform', opacity: 0 }}
      >
        <span
          ref={labelNumRef}
          className="block text-xs tracking-[0.35em] font-medium mb-1"
          style={{ color: 'rgba(255,158,27,0.45)' }}
        >
          01
        </span>
        <p
          ref={labelNameRef}
          className="text-xs tracking-[0.25em] font-semibold mb-1"
          style={{ color: '#FF9E1B' }}
        >
          {SHAPE_SEQUENCE[0].label}
        </p>
        <p
          ref={labelSubRef}
          className="text-sm"
          style={{ color: 'rgba(232,228,220,0.60)' }}
        >
          {SHAPE_SEQUENCE[0].sub}
        </p>
      </div>

      {/* Progress dots — right edge */}
      <div
        ref={dotsRef}
        className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none select-none"
      />
    </div>
  )
}
