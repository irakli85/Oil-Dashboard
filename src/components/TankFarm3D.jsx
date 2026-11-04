/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import data from '../../data'

const SECTIONS = [
  { id: 'baseOne', name: 'დიზელი / ნავთი', short: 'სადგური 1' },
  { id: 'baseTwo', name: 'ნავთი / ბენზინი', short: 'სადგური 2' },
  { id: 'baseThree', name: 'მუქი პროდუქტები', short: 'საამქრო 3' },
  { id: 'baseFour', name: 'ნედლი ნავთობი (ხოლოდნაია სლობოდა)', short: 'ხ. სლობოდა' },
  { id: 'baseFive', name: 'ნედლი ნავთობი (კაპრეშუმი)', short: 'კაპრეშუმი' },
  { id: 'baseSix', name: 'საზღვაო მიღება/დატვირთვა', short: 'საზღვაო' },
  { id: 'baseSeven', name: 'იმპორტირებადი პროდუქტები', short: 'იმპორტი' },
  { id: 'baseEight', name: 'გათხევადებული აირები', short: 'LPG' },
  { id: 'baseWater', name: 'წყალი და ქაფი', short: 'წყალი/ქაფი' },
  { id: 'baseOther', name: 'შლამსაცავი', short: 'შლამსაცავი' },
]

const parseVolume = (value) => Number(String(value).replace(/\s/g, '')) || 0
const fmt = (value) => Math.round(value).toLocaleString('en-US').replace(/,/g, ' ')
const radiusFor = (volume) => 1.5 + Math.cbrt(volume) * 0.35
const heightFor = (volume) => 4 + Math.cbrt(volume) * 0.45

const seeded = (seed) => {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function buildLayout() {
  const rand = seeded(7)
  const sections = SECTIONS.map((section) => {
    const items = data[section.id].map((item) => {
      const volume = parseVolume(item.vol)
      return { id: `${section.id}-${item.count}`, sectionId: section.id, number: String(item.tank), year: item.year, volume, radius: radiusFor(volume), height: heightFor(volume), level: 0.12 + rand() * 0.8 }
    })
    const maxRadius = Math.max(...items.map((tank) => tank.radius))
    const pitch = maxRadius * 2.5
    const cols = Math.max(1, Math.ceil(Math.sqrt(items.length * 1.4)))
    const rows = Math.ceil(items.length / cols)
    items.forEach((tank, index) => {
      tank.local = [(index % cols) * pitch, Math.floor(index / cols) * pitch]
    })
    return { ...section, items, width: (cols - 1) * pitch + maxRadius * 2, depth: (rows - 1) * pitch + maxRadius * 2, pitch, maxRadius, capacity: items.reduce((sum, tank) => sum + tank.volume, 0) }
  })

  const rowWidthLimit = 210
  const gap = 22
  let cursorX = 0
  let cursorZ = 0
  let rowDepth = 0
  let maxX = 0
  sections.forEach((section) => {
    if (cursorX > 0 && cursorX + section.width > rowWidthLimit) {
      cursorX = 0
      cursorZ += rowDepth + gap
      rowDepth = 0
    }
    section.origin = [cursorX, cursorZ]
    section.items.forEach((tank) => {
      tank.position = [cursorX + tank.local[0] + section.maxRadius, cursorZ + tank.local[1] + section.maxRadius]
    })
    cursorX += section.width + gap
    maxX = Math.max(maxX, cursorX - gap)
    rowDepth = Math.max(rowDepth, section.depth)
  })
  const width = maxX
  const depth = cursorZ + rowDepth
  const center = [width / 2, depth / 2]
  sections.forEach((section) => {
    section.items.forEach((tank) => {
      tank.position = [tank.position[0] - center[0], tank.position[1] - center[1]]
    })
    section.labelPosition = [section.origin[0] + section.width / 2 - center[0], section.origin[1] - center[1] - 4]
  })
  return { sections, width, depth }
}

const statusOf = (level) => (level < 0.15 ? 'low' : level > 0.92 ? 'high' : 'ok')
const STATUS_COLOR = { ok: '#34d399', low: '#fb923c', high: '#f87171' }
const STATUS_LABEL = { ok: 'ნორმა', low: 'დაბალი დონე', high: 'გადავსების რისკი' }

const metalMaterial = new THREE.MeshStandardMaterial({ color: '#aab3bd', metalness: 0.85, roughness: 0.32 })
const roofMaterial = new THREE.MeshStandardMaterial({ color: '#7b8590', metalness: 0.8, roughness: 0.4 })
const baseMaterial = new THREE.MeshStandardMaterial({ color: '#1c2430', metalness: 0.4, roughness: 0.7 })

function Tank({ tank, level, selected, dimmed, onSelect, onHover }) {
  const liquid = useRef()
  const current = useRef(level)
  const status = statusOf(level)
  const color = STATUS_COLOR[status]

  useFrame((_, delta) => {
    current.current += (level - current.current) * Math.min(1, delta * 2)
    const scaleY = Math.max(0.01, current.current)
    if (liquid.current) {
      liquid.current.scale.y = scaleY
      liquid.current.position.y = (tank.height * scaleY) / 2
    }
  })

  return (
    <group
      position={[tank.position[0], 0, tank.position[1]]}
      onClick={(event) => { event.stopPropagation(); onSelect(tank.id) }}
      onPointerOver={(event) => { event.stopPropagation(); onHover(tank.id); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { onHover(null); document.body.style.cursor = 'auto' }}
    >
      <mesh position={[0, 0.25, 0]} material={baseMaterial}>
        <cylinderGeometry args={[tank.radius * 1.12, tank.radius * 1.15, 0.5, 32]} />
      </mesh>
      <mesh position={[0, tank.height / 2 + 0.5, 0]} material={metalMaterial} castShadow>
        <cylinderGeometry args={[tank.radius, tank.radius, tank.height, 36]} />
      </mesh>
      <mesh position={[0, tank.height + 0.5 + tank.height * 0.03, 0]} material={roofMaterial}>
        <cylinderGeometry args={[tank.radius * 0.18, tank.radius, tank.height * 0.06, 36]} />
      </mesh>
      <group position={[0, 0.5, 0]}>
        <mesh ref={liquid} scale={[1, level, 1]}>
          <cylinderGeometry args={[tank.radius * 1.015, tank.radius * 1.015, tank.height, 36]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={selected ? 0.9 : 0.45} transparent opacity={dimmed ? 0.18 : 0.6} />
        </mesh>
      </group>
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.6, 0]}>
          <ringGeometry args={[tank.radius * 1.25, tank.radius * 1.45, 48]} />
          <meshBasicMaterial color='#38bdf8' side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

function SectionLabel({ section }) {
  return (
    <Html position={[section.labelPosition[0], 0.5, section.labelPosition[1]]} center distanceFactor={90} zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}>
      <FloorLabel>{section.short}</FloorLabel>
    </Html>
  )
}

function Scene({ layout, levels, selectedId, hoveredId, filterId, onSelect, onHover }) {
  const span = Math.max(layout.width, layout.depth)
  return (
    <>
      <color attach='background' args={['#080c12']} />
      <fog attach='fog' args={['#080c12', span * 0.9, span * 2.4]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#9db8d6', '#10161d', 0.6]} />
      <directionalLight position={[span * 0.5, span * 0.8, span * 0.4]} intensity={1.6} />
      <pointLight position={[-span * 0.4, 30, -span * 0.3]} intensity={0.7} color='#38bdf8' />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[span * 3, span * 3]} />
        <meshStandardMaterial color='#0d131b' metalness={0.6} roughness={0.5} />
      </mesh>
      <gridHelper args={[span * 3, 90, '#1e2a38', '#141c26']} position={[0, 0.02, 0]} />
      {layout.sections.map((section) => (
        <React.Fragment key={section.id}>
          <SectionLabel section={section} />
          {section.items.map((tank) => (
            <Tank
              key={tank.id}
              tank={tank}
              level={levels[tank.id]}
              selected={selectedId === tank.id || hoveredId === tank.id}
              dimmed={filterId && filterId !== section.id}
              onSelect={onSelect}
              onHover={onHover}
            />
          ))}
        </React.Fragment>
      ))}
      <OrbitControls makeDefault target={[0, 0, 0]} maxPolarAngle={Math.PI / 2.08} minDistance={25} maxDistance={span * 1.6} enableDamping dampingFactor={0.08} />
    </>
  )
}

function Sparkline({ values }) {
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = Math.max(max - min, 1)
  const points = values.map((value, index) => `${(index / Math.max(values.length - 1, 1)) * 100},${100 - ((value - min) / range) * 85 - 7}`).join(' ')
  return (
    <svg viewBox='0 0 100 100' preserveAspectRatio='none' width='100%' height='100%'>
      <polyline points={points} fill='none' stroke='#38bdf8' strokeWidth='2' vectorEffect='non-scaling-stroke' />
    </svg>
  )
}

const TankFarm3D = () => {
  const layout = useMemo(buildLayout, [])
  const allTanks = useMemo(() => layout.sections.flatMap((section) => section.items), [layout])
  const [levels, setLevels] = useState(() => Object.fromEntries(allTanks.map((tank) => [tank.id, tank.level])))
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [filterId, setFilterId] = useState(null)
  const [flow, setFlow] = useState(125)
  const [history, setHistory] = useState([])

  const totalCapacity = useMemo(() => allTanks.reduce((sum, tank) => sum + tank.volume, 0), [allTanks])

  useEffect(() => {
    const timer = setInterval(() => {
      setLevels((current) => {
        const next = {}
        let moved = 0
        allTanks.forEach((tank) => {
          const delta = (Math.random() - 0.5) * 0.02
          const value = Math.min(0.98, Math.max(0.04, current[tank.id] + delta))
          moved += Math.abs(value - current[tank.id]) * tank.volume
          next[tank.id] = value
        })
        setFlow(Math.round(moved / 3))
        return next
      })
    }, 2500)
    return () => clearInterval(timer)
  }, [allTanks])

  const stored = allTanks.reduce((sum, tank) => sum + tank.volume * levels[tank.id], 0)
  useEffect(() => {
    setHistory((current) => [...current.slice(-29), stored])
  }, [stored])

  const alerts = allTanks.filter((tank) => statusOf(levels[tank.id]) !== 'ok')
  const systemStatus = alerts.length > 0 ? 'ყურადღება' : 'მუშაობს'
  const focus = allTanks.find((tank) => tank.id === (hoveredId || selectedId))
  const focusSection = focus && layout.sections.find((section) => section.id === focus.sectionId)

  return (
    <Shell>
      <Sidebar>
        <SideTitle>რეზერვუარების პარკი</SideTitle>
        <SideItem $active={!filterId} onClick={() => setFilterId(null)}>
          <span>ყველა სექცია</span><b>{allTanks.length}</b>
        </SideItem>
        {layout.sections.map((section) => (
          <SideItem key={section.id} $active={filterId === section.id} onClick={() => setFilterId(filterId === section.id ? null : section.id)}>
            <span>{section.short}</span><b>{section.items.length}</b>
          </SideItem>
        ))}
        <SimBadge>სიმულაცია: დონეები ტესტურია, რეალური სენსორები არ არის დაკავშირებული</SimBadge>
      </Sidebar>

      <Stage>
        <Canvas camera={{ position: [0, layout.depth * 0.9 + 40, layout.width * 0.55 + 60], fov: 42, near: 1, far: 3000 }} dpr={[1, 1.75]} onPointerMissed={() => setSelectedId(null)}>
          <Suspense fallback={null}>
            <Scene layout={layout} levels={levels} selectedId={selectedId} hoveredId={hoveredId} filterId={filterId} onSelect={setSelectedId} onHover={setHoveredId} />
          </Suspense>
        </Canvas>

        <TopStats>
          <StatCell><small>სრული მოცულობა</small><strong>{fmt(totalCapacity)} მ³</strong></StatCell>
          <StatCell><small>შევსებულია</small><strong>{fmt(stored)} მ³</strong></StatCell>
          <StatCell><small>ნაკადი</small><strong>{fmt(flow)} მ³/სთ</strong></StatCell>
          <StatCell><small>სისტემის სტატუსი</small><strong style={{ color: alerts.length ? '#fb923c' : '#34d399' }}>{systemStatus}</strong></StatCell>
        </TopStats>

        <TrendCard>
          <CardTitle>ჯამური მარაგი</CardTitle>
          <div style={{ height: '5.2rem' }}><Sparkline values={history} /></div>
        </TrendCard>

        <InfoCard>
          {focus ? (
            <>
              <InfoTitle>რეზერვუარი №{focus.number}</InfoTitle>
              <InfoRow><span>{focusSection.name}</span></InfoRow>
              <InfoRow><span>დონე</span><b style={{ color: STATUS_COLOR[statusOf(levels[focus.id])] }}>{Math.round(levels[focus.id] * 100)}%</b></InfoRow>
              <InfoRow><span>მარაგი</span><b>{fmt(focus.volume * levels[focus.id])} მ³</b></InfoRow>
              <InfoRow><span>მოცულობა</span><b>{fmt(focus.volume)} მ³</b></InfoRow>
              <InfoRow><span>აშენების წელი</span><b>{focus.year || '—'}</b></InfoRow>
              <InfoRow><span>სტატუსი</span><b style={{ color: STATUS_COLOR[statusOf(levels[focus.id])] }}>{STATUS_LABEL[statusOf(levels[focus.id])]}</b></InfoRow>
            </>
          ) : (
            <>
              <InfoTitle>გაფრთხილებები: {alerts.length}</InfoTitle>
              {alerts.slice(0, 4).map((tank) => (
                <InfoRow key={tank.id}>
                  <span>№{tank.number}</span>
                  <b style={{ color: STATUS_COLOR[statusOf(levels[tank.id])] }}>{Math.round(levels[tank.id] * 100)}% — {STATUS_LABEL[statusOf(levels[tank.id])]}</b>
                </InfoRow>
              ))}
              {alerts.length === 0 && <InfoRow><span>ყველა რეზერვუარი ნორმაშია</span></InfoRow>}
              <Hint>დააჭირეთ რეზერვუარს დეტალებისთვის</Hint>
            </>
          )}
        </InfoCard>

        <BarCard>
          <CardTitle>მოცულობა სექციების მიხედვით</CardTitle>
          <Bars>
            {layout.sections.map((section) => {
              const max = Math.max(...layout.sections.map((item) => item.capacity))
              return (
                <Bar key={section.id} $active={!filterId || filterId === section.id} title={`${section.name}: ${fmt(section.capacity)} მ³`} onClick={() => setFilterId(filterId === section.id ? null : section.id)}>
                  <i style={{ height: `${(section.capacity / max) * 100}%` }} />
                </Bar>
              )
            })}
          </Bars>
        </BarCard>
      </Stage>
    </Shell>
  )
}

const Shell = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 14rem);
  min-height: 56rem;
  border-radius: 1.5rem;
  overflow: hidden;
  background: #0b1118;
  color: #e5edf5;
  font-size: 1.6rem;

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
  }
`

const Sidebar = styled.aside`
  flex: 0 0 22rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.4rem 1rem;
  background: #0e151e;
  border-right: 1px solid #1b2733;
  overflow-y: auto;

  @media (max-width: 900px) {
    flex: none;
    flex-direction: row;
    flex-wrap: wrap;
    border-right: none;
    border-bottom: 1px solid #1b2733;
  }
`

const SideTitle = styled.p`
  margin: 0 0 0.8rem;
  padding: 0 0.6rem;
  font-size: 1.3rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7f93;
  width: 100%;
`

const SideItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 1rem;
  border: 0;
  border-radius: 0.8rem;
  background: ${({ $active }) => ($active ? '#1a2a3a' : 'transparent')};
  color: ${({ $active }) => ($active ? '#7dd3fc' : '#a9b8c8')};
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover { background: #162231; }
  b { font-weight: 600; font-size: 1.5rem; }
`

const SimBadge = styled.p`
  margin: auto 0 0;
  padding: 0.8rem;
  border-radius: 0.8rem;
  background: #2a1f0f;
  color: #fbbf24;
  font-size: 1.3rem;
  line-height: 1.4;
  width: 100%;
`

const Stage = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 44rem;

  canvas { display: block; }
`

const Panel = styled.div`
  position: absolute;
  background: rgba(14, 21, 30, 0.82);
  border: 1px solid #1f2d3b;
  border-radius: 1rem;
  backdrop-filter: blur(6px);
  pointer-events: none;
`

const TopStats = styled(Panel)`
  top: 1.2rem;
  right: 1.2rem;
  display: flex;
  gap: 2rem;
  padding: 1rem 1.6rem;
  flex-wrap: wrap;
`

const StatCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  small { color: #8aa0b5; font-size: 1.3rem; }
  strong { font-size: 2rem; font-weight: 600; }
`

const TrendCard = styled(Panel)`
  top: 1.2rem;
  left: 1.2rem;
  width: 26rem;
  padding: 1rem 1.2rem;
`

const CardTitle = styled.p`
  margin: 0 0 0.6rem;
  font-size: 1.5rem;
  color: #c4d2e0;
`

const InfoCard = styled(Panel)`
  bottom: 1.2rem;
  left: 1.2rem;
  min-width: 32rem;
  padding: 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const InfoTitle = styled.p`
  margin: 0 0 0.4rem;
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  span { color: #9fb2c5; }
  b { font-weight: 600; }
`

const Hint = styled.p`
  margin: 0.4rem 0 0;
  font-size: 1.3rem;
  color: #6b7f93;
`

const BarCard = styled(Panel)`
  bottom: 1.2rem;
  right: 1.2rem;
  width: 28rem;
  padding: 1rem 1.2rem;
  pointer-events: auto;
`

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  height: 7rem;
`

const Bar = styled.button`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  i {
    display: block;
    width: 100%;
    border-radius: 0.3rem 0.3rem 0 0;
    background: ${({ $active }) => ($active ? '#38bdf8' : '#2b3b4b')};
  }
`

const FloorLabel = styled.div`
  padding: 0.3rem 0.9rem;
  border-radius: 99rem;
  background: rgba(56, 189, 248, 0.14);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #bae6fd;
  font-size: 1.6rem;
  white-space: nowrap;
`

export default TankFarm3D
