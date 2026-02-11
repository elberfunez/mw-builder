import { useMemo } from 'react'
import * as THREE from 'three'
import { resolveColor } from '../../constants/colors'
import WallPanels from './WallPanels'

// ─── Gabled roof as a triangular prism ───────────────────────────────────────
// Sits with its base at y=0 (relative to a group placed at y=wallHeight).
function GabledRoof({ width, length, pitch, color, trimColor }) {
  const OH = 0.5
  const W  = width  + OH * 2
  const L  = length + OH * 2
  const PH = (width / 2) * (pitch / 12)

  const geometry = useMemo(() => {
    const verts = new Float32Array([
      -W / 2,  0,  -L / 2,
       W / 2,  0,  -L / 2,
       0,      PH, -L / 2,
      -W / 2,  0,   L / 2,
       W / 2,  0,   L / 2,
       0,      PH,  L / 2,
    ])
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    geo.setIndex([
      0, 1, 2,
      3, 5, 4,
      0, 2, 3,  2, 5, 3,
      1, 4, 2,  2, 4, 5,
    ])
    geo.computeVertexNormals()
    return geo
  }, [W, L, PH])

  return (
    <group>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          color={color}
          side={THREE.DoubleSide}
          metalness={0.45}
          roughness={0.55}
        />
      </mesh>
      {/* Trim eave strips along both bottom edges */}
      <mesh position={[-W / 2, 0, 0]}>
        <boxGeometry args={[0.1, 0.12, L]} />
        <meshStandardMaterial color={trimColor} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[W / 2, 0, 0]}>
        <boxGeometry args={[0.1, 0.12, L]} />
        <meshStandardMaterial color={trimColor} metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}

// ─── Flat / regular / boxed eave roof ────────────────────────────────────────
function FlatRoof({ width, length, color, trimColor }) {
  return (
    <group>
      {/* Main roof panel */}
      <mesh castShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[width + 0.6, 0.3, length + 0.6]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.55} />
      </mesh>
      {/* Trim strip along the eave (bottom face of overhang) */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[width + 0.62, 0.06, length + 0.62]} />
        <meshStandardMaterial color={trimColor} metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}

// ─── Corner/edge posts for carport ───────────────────────────────────────────
function CarportPosts({ width, length, height, color }) {
  const POST = 0.3
  const positions = [
    [-width / 2, height / 2,  -length / 2],
    [ width / 2, height / 2,  -length / 2],
    [-width / 2, height / 2,   length / 2],
    [ width / 2, height / 2,   length / 2],
  ]
  return (
    <group>
      {positions.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[POST, height, POST]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Gable triangle fill for enclosed end walls ───────────────────────────────
function GableTriangle({ width, pitch, length, posZ, rotY = 0, color }) {
  const OH = 0.5
  const W  = width + OH * 2
  const PH = (width / 2) * (pitch / 12)

  const geometry = useMemo(() => {
    const verts = new Float32Array([
      -W / 2, 0, 0,
       W / 2, 0, 0,
       0,     PH, 0,
    ])
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    geo.setIndex([0, 1, 2, 2, 1, 0])
    geo.computeVertexNormals()
    return geo
  }, [W, PH])

  return (
    <mesh geometry={geometry} position={[0, 0, posZ]} rotation={[0, rotY, 0]}>
      <meshStandardMaterial color={color} side={THREE.DoubleSide} metalness={0.25} roughness={0.75} />
    </mesh>
  )
}

// ─── Main building group ──────────────────────────────────────────────────────
export default function BuildingModel({ config }) {
  const { width, length, height, roofType, roofPitch, wallColor, roofColor, trimColor, buildingType, sides } = config

  // Map the named roof type to geometry type:
  // 'vertical' uses the same gabled prism (panel orientation difference only)
  // 'boxedEave' and 'regular' use flat-box geometry
  const roofGeom = roofType === 'vertical' ? 'gabled' : 'flat'
  const resolvedRoof  = resolveColor(roofColor)
  const resolvedTrim  = resolveColor(trimColor)
  const resolvedWall  = resolveColor(wallColor)

  // Default sides to all-enclosed if config.sides is missing (e.g. old embeds)
  const sidesConfig = sides ?? {
    right: { openStyle: 'enclosed' },
    left:  { openStyle: 'enclosed' },
    front: { openStyle: 'enclosed', gable: 'gabledOpen' },
    back:  { openStyle: 'enclosed', gable: 'gabledOpen' },
  }

  // For carport: force left+right sides open so only posts show
  // For combo: force right side open (attached carport on the right)
  const effectiveSides = buildingType === 'carport'
    ? { ...sidesConfig, right: { ...sidesConfig.right, openStyle: 'open' }, left: { ...sidesConfig.left, openStyle: 'open' } }
    : buildingType === 'combo'
    ? { ...sidesConfig, right: { ...sidesConfig.right, openStyle: 'open' } }
    : sidesConfig

  // Show gable triangles only when roof is vertical (gabled) and side is not open
  const showGables = roofGeom === 'gabled'
  const frontGable = sidesConfig.front?.gable ?? 'gabledOpen'
  const backGable  = sidesConfig.back?.gable  ?? 'gabledOpen'
  const frontEnclosed = effectiveSides.front?.openStyle !== 'open'
  const backEnclosed  = effectiveSides.back?.openStyle  !== 'open'

  return (
    <group>
      {/* Per-face wall panels */}
      <WallPanels
        width={width}
        length={length}
        height={height}
        sides={effectiveSides}
        wallColor={wallColor}
      />

      {/* Carport / combo: show corner posts on open sides */}
      {(buildingType === 'carport' || buildingType === 'combo') && (
        <CarportPosts width={width} length={length} height={height} color={resolvedWall} />
      )}

      {/* Roof — sits at the top of the walls */}
      <group position={[0, height, 0]}>
        {roofGeom === 'gabled'
          ? <GabledRoof width={width} length={length} pitch={roofPitch} color={resolvedRoof} trimColor={resolvedTrim} />
          : <FlatRoof   width={width} length={length}                   color={resolvedRoof} trimColor={resolvedTrim} />
        }

        {/* Gable triangles on enclosed end walls when roof is vertical */}
        {showGables && frontEnclosed && frontGable !== 'gabledOpen' && (
          <GableTriangle
            width={width} pitch={roofPitch} length={length}
            posZ={-length / 2} color={resolvedWall}
          />
        )}
        {showGables && backEnclosed && backGable !== 'gabledOpen' && (
          <GableTriangle
            width={width} pitch={roofPitch} length={length}
            posZ={length / 2} rotY={Math.PI} color={resolvedWall}
          />
        )}
      </group>
    </group>
  )
}
