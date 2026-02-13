import * as THREE from 'three'
import { resolveColor } from '../../constants/colors'

// FACES: each panel maps to one cardinal face of the building box
// position/rotation place a plane flush with each wall face
const FACE_DEFS = [
  { side: 'front', getPos: (w, h, l) => [0, h / 2, -l / 2], rot: [0, 0, 0],            getSize: (w, h)     => [w, h] },
  { side: 'back',  getPos: (w, h, l) => [0, h / 2,  l / 2], rot: [0, Math.PI, 0],      getSize: (w, h)     => [w, h] },
  { side: 'right', getPos: (w, h)    => [w / 2, h / 2, 0],  rot: [0,  Math.PI / 2, 0], getSize: (_w, h, l) => [l, h] },
  { side: 'left',  getPos: (w, h)    => [-w / 2, h / 2, 0], rot: [0, -Math.PI / 2, 0], getSize: (_w, h, l) => [l, h] },
]

export default function WallPanels({ width, length, height, sides, wallColor }) {
  const color = resolveColor(wallColor)

  return (
    <group>
      {FACE_DEFS.map(({ side, getPos, rot, getSize }) => {
        const openStyle = sides?.[side]?.openStyle ?? 'enclosed'
        if (openStyle === 'open') return null

        const [pw, ph] = getSize(width, height, length)
        const [px, py, pz] = getPos(width, height, length)

        // Partial panels: half-width, offset to one side
        let finalW  = pw
        let offsetX = 0
        if (openStyle === 'rightSideOpen') {
          finalW  = pw / 2
          offsetX = -pw / 4  // left half stays
        } else if (openStyle === 'leftSideOpen') {
          finalW  = pw / 2
          offsetX = pw / 4   // right half stays
        }

        // offsetX is in the panel's local space; for front/back that is world X,
        // for right/left we need to rotate it to world Z — handled by the mesh rotation
        const localOffset = (side === 'right' || side === 'left')
          ? [0, 0, offsetX]   // along the side's length axis
          : [offsetX, 0, 0]   // along front/back width axis

        return (
          <mesh
            key={side}
            position={[px + localOffset[0], py + localOffset[1], pz + localOffset[2]]}
            rotation={rot}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[finalW, ph]} />
            <meshStandardMaterial
              color={color}
              metalness={0.25}
              roughness={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}
