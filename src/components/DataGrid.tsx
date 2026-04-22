'use client'

import { useEffect, useRef } from 'react'

/**
 * Ambient canvas data-grid. A field of dots that:
 *  - breathe subtly on their own
 *  - react to the mouse (brighten + repel)
 *  - emit random orange "data packets" that propagate across the grid
 *
 * Designed to feel like the ambient pulse of a data network. Not flashy.
 */
export default function DataGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width  = canvas.clientWidth
    let height = canvas.clientHeight
    const dpr  = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width  = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width  = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Grid setup: dot spacing adapts to viewport
    const SPACING = 26
    const cols = Math.ceil(width / SPACING) + 2
    const rows = Math.ceil(height / SPACING) + 2

    type Dot = { x: number; y: number; ox: number; oy: number; phase: number; heat: number }
    const dots: Dot[] = []
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = i * SPACING
        const y = j * SPACING
        dots.push({ x, y, ox: x, oy: y, phase: Math.random() * Math.PI * 2, heat: 0 })
      }
    }

    // Mouse — listen on window so overlapping elements don't swallow events
    const mouse = { x: -9999, y: -9999, active: false }
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse.x = x
      mouse.y = y
      mouse.active = x >= 0 && y >= 0 && x <= width && y <= height
    }
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    // Data packets: a packet walks the grid for a short life, lighting dots orange
    type Packet = { i: number; j: number; life: number; max: number; dir: number }
    const packets: Packet[] = []
    const spawnPacket = () => {
      packets.push({
        i: Math.floor(Math.random() * cols),
        j: Math.floor(Math.random() * rows),
        life: 0,
        max: 30 + Math.floor(Math.random() * 40),
        dir: Math.floor(Math.random() * 4), // 0 right, 1 down, 2 left, 3 up
      })
    }
    let packetTimer = 0

    let animId = 0
    let t0 = performance.now()

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw)
      const t = (now - t0) * 0.001

      ctx.clearRect(0, 0, width, height)

      // Spawn packets occasionally
      packetTimer++
      if (packetTimer > 28 && packets.length < 6) {
        spawnPacket()
        packetTimer = 0
      }

      // Update packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pk = packets[p]
        pk.life++
        // Heat the current dot
        const idx = pk.j * cols + pk.i
        if (dots[idx]) dots[idx].heat = 1
        // Advance in direction
        if (pk.dir === 0) pk.i++
        else if (pk.dir === 1) pk.j++
        else if (pk.dir === 2) pk.i--
        else pk.j--
        // Occasionally turn
        if (Math.random() < 0.08) pk.dir = (pk.dir + (Math.random() < 0.5 ? 1 : 3)) % 4
        // Remove if out of bounds or expired
        if (pk.i < 0 || pk.i >= cols || pk.j < 0 || pk.j >= rows || pk.life > pk.max) {
          packets.splice(p, 1)
        }
      }

      // Draw dots
      for (let k = 0; k < dots.length; k++) {
        const d = dots[k]

        // Breathing
        const breath = Math.sin(t * 0.9 + d.phase) * 0.5 + 0.5 // 0..1

        // Mouse influence
        let mouseBoost = 0
        let dx = 0, dy = 0
        if (mouse.active) {
          dx = d.ox - mouse.x
          dy = d.oy - mouse.y
          const dist2 = dx * dx + dy * dy
          const R = 140
          if (dist2 < R * R) {
            const dist = Math.sqrt(dist2) || 1
            mouseBoost = 1 - dist / R
            // Gentle repel
            const push = mouseBoost * 6
            d.x = d.ox + (dx / dist) * push
            d.y = d.oy + (dy / dist) * push
          } else {
            d.x += (d.ox - d.x) * 0.12
            d.y += (d.oy - d.y) * 0.12
          }
        } else {
          d.x += (d.ox - d.x) * 0.12
          d.y += (d.oy - d.y) * 0.12
        }

        // Heat decay
        d.heat *= 0.92

        // Final alpha + size
        const baseAlpha = 0.18 + breath * 0.12 + mouseBoost * 0.55
        const heatAlpha = d.heat * 0.9
        const size = 1.2 + breath * 0.6 + mouseBoost * 1.2 + d.heat * 2.2

        // Base (neutral)
        ctx.fillStyle = `rgba(26,25,23,${baseAlpha})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Heat overlay (orange)
        if (heatAlpha > 0.04) {
          ctx.fillStyle = `rgba(255,158,27,${heatAlpha})`
          ctx.beginPath()
          ctx.arc(d.x, d.y, size + 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    animId = requestAnimationFrame(draw)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  )
}
