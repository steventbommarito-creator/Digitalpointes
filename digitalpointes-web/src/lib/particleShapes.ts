export const PARTICLE_COUNT = 3000

type P3 = [number, number, number]

// ── helpers ──────────────────────────────────────────────────────────────────

function rz(range = 0.07): number {
  return (Math.random() - 0.5) * range
}

function onEllipseArc(cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n: number): P3[] {
  if (n < 2) return []
  return Array.from({ length: n }, (_, i) => {
    const t = a0 + (i / (n - 1)) * (a1 - a0)
    return [cx + Math.cos(t) * rx, cy + Math.sin(t) * ry, rz()] as P3
  })
}

function onCircle(cx: number, cy: number, r: number, n: number): P3[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2
    return [cx + Math.cos(t) * r, cy + Math.sin(t) * r, rz()] as P3
  })
}

function onLine(x1: number, y1: number, x2: number, y2: number, n: number): P3[] {
  if (n < 2) return [[x1, y1, rz()]]
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    return [
      x1 + (x2 - x1) * t + (Math.random() - 0.5) * 0.008,
      y1 + (y2 - y1) * t + (Math.random() - 0.5) * 0.008,
      rz(0.04),
    ] as P3
  })
}

function inCircle(cx: number, cy: number, r: number, n: number): P3[] {
  const pts: P3[] = []
  let attempts = 0
  while (pts.length < n && attempts < n * 8) {
    attempts++
    const x = cx + (Math.random() - 0.5) * r * 2
    const y = cy + (Math.random() - 0.5) * r * 2
    if ((x - cx) ** 2 + (y - cy) ** 2 < r * r) {
      pts.push([x, y, rz(0.05)])
    }
  }
  return pts
}

function inRect(x1: number, y1: number, w: number, h: number, n: number): P3[] {
  return Array.from({ length: n }, () => [
    x1 + Math.random() * w,
    y1 + Math.random() * h,
    rz(0.04),
  ] as P3)
}

function pad(pts: P3[], target: number): Float32Array {
  const arr: number[] = pts.flatMap(p => p)
  let i = 0
  while (arr.length / 3 < target) {
    const b = i % pts.length
    arr.push(
      pts[b][0] + (Math.random() - 0.5) * 0.012,
      pts[b][1] + (Math.random() - 0.5) * 0.012,
      pts[b][2] + (Math.random() - 0.5) * 0.015,
    )
    i++
  }
  return new Float32Array(arr.slice(0, target * 3))
}

// ── shape generators ──────────────────────────────────────────────────────────

function makeEye(): P3[] {
  const pts: P3[] = []
  // upper lid
  pts.push(...onEllipseArc(0, 0, 0.72, 0.30, 0, Math.PI, 380))
  // lower lid (shallower)
  pts.push(...onEllipseArc(0, 0, 0.72, 0.10, Math.PI, 2 * Math.PI, 240))
  // iris center y = midpoint of lid extents
  const irisY = (0.30 - 0.10) / 2  // 0.10
  pts.push(...onCircle(0, irisY, 0.23, 460))
  pts.push(...onCircle(0, irisY, 0.09, 180))
  pts.push(...inCircle(0, irisY, 0.21, 620))
  // eyelid fill (inside the eye lens shape)
  const eyeFill: P3[] = []
  while (eyeFill.length < 500) {
    const x = (Math.random() - 0.5) * 1.44
    const y = (Math.random() - 0.5) * 0.55
    if (Math.abs(x) < 0.72) {
      const upper = 0.30 * Math.sin(Math.acos(Math.min(1, Math.abs(x) / 0.72)))
      const lower = -0.10 * Math.sin(Math.acos(Math.min(1, Math.abs(x) / 0.72)))
      if (y < upper && y > lower) eyeFill.push([x, y, rz(0.03)])
    }
  }
  pts.push(...eyeFill)
  return pts
}

function makeFingerprint(): P3[] {
  const pts: P3[] = []
  const rings = [
    { rx: 0.08, ry: 0.053, n: 80,  rot: 0.00 },
    { rx: 0.18, ry: 0.128, n: 160, rot: 0.12 },
    { rx: 0.29, ry: 0.218, n: 255, rot: 0.18 },
    { rx: 0.41, ry: 0.318, n: 330, rot: 0.13 },
    { rx: 0.54, ry: 0.428, n: 410, rot: 0.08 },
    { rx: 0.68, ry: 0.548, n: 490, rot: 0.10 },
  ]
  for (const { rx, ry, n, rot } of rings) {
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2
      pts.push([
        Math.cos(t + rot) * rx,
        Math.sin(t + rot) * ry,
        rz(0.06),
      ])
    }
  }
  pts.push(...inCircle(0, 0, 0.07, 110))
  return pts
}

function makePin(): P3[] {
  const pts: P3[] = []
  const cy = 0.28
  const r = 0.32
  // outer circle
  pts.push(...onCircle(0, cy, r, 640))
  pts.push(...inCircle(0, cy, r * 0.88, 420))
  // inner dot
  pts.push(...onCircle(0, cy, r * 0.42, 210))
  pts.push(...inCircle(0, cy, r * 0.36, 170))
  // left & right side converging to tip
  const sideY = cy - r        // -0.04
  const tipY = -0.70
  pts.push(...onLine(-r * 0.75, sideY, 0, tipY, 260))
  pts.push(...onLine(r * 0.75, sideY, 0, tipY, 260))
  // tip fill
  const tipFill: P3[] = []
  while (tipFill.length < 180) {
    const s = Math.random()
    const hw = r * 0.75 * s
    const y = sideY + (tipY - sideY) * (1 - s)
    const x = (Math.random() - 0.5) * 2 * hw
    tipFill.push([x, y, rz(0.04)])
  }
  pts.push(...tipFill)
  return pts
}

function makePerson(): P3[] {
  const pts: P3[] = []
  // head
  pts.push(...onCircle(0, 0.65, 0.14, 310))
  pts.push(...inCircle(0, 0.65, 0.12, 170))
  // neck
  pts.push(...onLine(0, 0.51, 0, 0.47, 40))
  // shoulders arc
  pts.push(...onEllipseArc(0, 0.47, 0.28, 0.055, 0, Math.PI, 120))
  // body sides
  pts.push(...onLine(-0.22, 0.47, -0.23, 0.04, 130))
  pts.push(...onLine(0.22, 0.47, 0.23, 0.04, 130))
  pts.push(...onLine(-0.23, 0.04, 0.23, 0.04, 85))
  // arms
  pts.push(...onLine(-0.22, 0.38, -0.40, 0.14, 130))
  pts.push(...onLine(-0.40, 0.14, -0.23, 0.04, 110))
  pts.push(...onLine(0.22, 0.38, 0.40, 0.14, 130))
  pts.push(...onLine(0.40, 0.14, 0.23, 0.04, 110))
  // body fill
  pts.push(...inRect(-0.21, 0.06, 0.42, 0.40, 210))
  // phone rectangle
  const px = -0.14, py = -0.48, pw = 0.28, ph = 0.50
  pts.push(...onLine(px, py, px + pw, py, 80))
  pts.push(...onLine(px + pw, py, px + pw, py + ph, 130))
  pts.push(...onLine(px + pw, py + ph, px, py + ph, 80))
  pts.push(...onLine(px, py + ph, px, py, 130))
  // phone screen lines
  pts.push(...onLine(px + 0.04, py + 0.08, px + pw - 0.04, py + 0.08, 60))
  pts.push(...onLine(px + 0.04, py + 0.16, px + pw * 0.65, py + 0.16, 48))
  pts.push(...inRect(px + 0.03, py + 0.03, pw - 0.06, ph - 0.06, 160))
  // arm-to-phone connections
  pts.push(...onLine(-0.23, 0.04, px, py + ph, 85))
  pts.push(...onLine(0.23, 0.04, px + pw, py + ph, 85))
  return pts
}

function makeNeural(): P3[] {
  const pts: P3[] = []
  const nodes: [number, number][] = [
    [0.00,  0.75],
    [-0.52, 0.30],
    [0.52,  0.30],
    [-0.70, -0.18],
    [0.00,  -0.07],
    [0.70,  -0.18],
    [-0.40, -0.63],
    [0.40,  -0.63],
  ]
  for (const [nx, ny] of nodes) {
    pts.push(...onCircle(nx, ny, 0.075, 110))
    pts.push(...inCircle(nx, ny, 0.065, 55))
  }
  const edges: [number, number][] = [
    [0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,4],[4,5],[3,6],[4,6],[4,7],[5,7]
  ]
  for (const [a, b] of edges) {
    const [ax, ay] = nodes[a]
    const [bx, by] = nodes[b]
    const d = Math.hypot(bx - ax, by - ay)
    pts.push(...onLine(ax, ay, bx, by, Math.round(d * 160)))
  }
  // ambient scatter
  for (let i = 0; i < 120; i++) {
    const r2 = Math.random() * 0.85
    const t2 = Math.random() * Math.PI * 2
    pts.push([Math.cos(t2) * r2, Math.sin(t2) * r2, rz(0.08)])
  }
  return pts
}

function makeChart(): P3[] {
  const pts: P3[] = []
  const base = -0.62
  const bars = [
    { x: -0.72, w: 0.26, h: 0.36 },
    { x: -0.38, w: 0.26, h: 0.58 },
    { x: -0.04, w: 0.26, h: 0.82 },
    { x: 0.30,  w: 0.26, h: 1.08 },
  ]
  for (const { x, w, h } of bars) {
    const y2 = base + h
    const lin = Math.round(120 + h * 220)
    const fil = Math.round(lin * 1.6)
    pts.push(...onLine(x, base, x, y2, lin))
    pts.push(...onLine(x + w, base, x + w, y2, lin))
    pts.push(...onLine(x, y2, x + w, y2, Math.round(w * 210)))
    pts.push(...inRect(x + 0.01, base + 0.01, w - 0.02, h - 0.01, fil))
  }
  // baseline + y-axis
  pts.push(...onLine(-0.76, base, 0.62, base, 190))
  pts.push(...onLine(-0.76, base, -0.76, 0.56, 210))
  // arrow on tallest bar
  const ax = 0.43, aBase = base + 1.08
  pts.push(...onLine(ax, aBase + 0.06, ax, aBase + 0.28, 52))
  pts.push(...onLine(ax - 0.10, aBase + 0.15, ax, aBase + 0.30, 42))
  pts.push(...onLine(ax + 0.10, aBase + 0.15, ax, aBase + 0.30, 42))
  return pts
}

// ── public API ────────────────────────────────────────────────────────────────

const shapeFactories: Record<string, () => P3[]> = {
  eye:         makeEye,
  fingerprint: makeFingerprint,
  pin:         makePin,
  person:      makePerson,
  neural:      makeNeural,
  chart:       makeChart,
}

export function generateShape(name: string): Float32Array {
  const factory = shapeFactories[name] ?? makeEye
  return pad(factory(), PARTICLE_COUNT)
}

export const SHAPE_SEQUENCE = [
  { key: 'eye',         label: 'VISITOR IDENTITY',        sub: 'See who\'s on your site' },
  { key: 'fingerprint', label: 'AUDIENCE DATA',           sub: 'Know exactly who they are' },
  { key: 'pin',         label: 'LOCATION INTELLIGENCE',   sub: 'Know where they go' },
  { key: 'person',      label: 'AUDIENCE ACTIVATION',     sub: 'Reach them where they are' },
  { key: 'neural',      label: 'CUSTOM AI SYSTEMS',       sub: 'Built for your business' },
  { key: 'chart',       label: 'GROWTH OPTIMIZATION',     sub: 'Built to convert and grow' },
]
