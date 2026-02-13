import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import * as THREE from 'three'

const DURATION = 0.55 // seconds

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const VIEW_ANGLES = {
  front: { theta: 0,             phi: Math.PI / 2 },
  back:  { theta: Math.PI,       phi: Math.PI / 2 },
  right: { theta: Math.PI / 2,   phi: Math.PI / 2 },
  left:  { theta: -Math.PI / 2,  phi: Math.PI / 2 },
}

// CameraRig renders OrbitControls and animates the camera when targetView changes.
// It must be rendered BEFORE OrbitControls mounts so its useFrame subscribes first,
// guaranteeing it runs before the OrbitControls frame loop each tick.
export default function CameraRig({ targetView, config }) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const anim = useRef(null) // { fromPos, toPos, fromTarget, toTarget, t }

  const { width, length, height } = config

  useEffect(() => {
    if (!targetView || !controlsRef.current) return

    const dist = Math.max(width, length) * 2.0 + 20
    const cy   = height / 2

    const views = {
      front: new THREE.Vector3(0,    cy,  dist),
      back:  new THREE.Vector3(0,    cy, -dist),
      right: new THREE.Vector3(dist, cy,  0),
      left:  new THREE.Vector3(-dist, cy, 0),
    }

    anim.current = {
      fromPos:    camera.position.clone(),
      toPos:      views[targetView].clone(),
      fromTarget: controlsRef.current.target.clone(),
      toTarget:   new THREE.Vector3(0, cy, 0),
      t: 0,
    }

    // Freeze damping velocity so it doesn't fight the animation.
    controlsRef.current.enableDamping = false
  }, [targetView, width, length, height])

  useFrame((_, delta) => {
    const a = anim.current
    if (!a || !controlsRef.current) return

    a.t = Math.min(a.t + delta / DURATION, 1)
    const ease = easeInOutCubic(a.t)

    // Set camera position and orbit target.
    camera.position.lerpVectors(a.fromPos, a.toPos, ease)
    controlsRef.current.target.lerpVectors(a.fromTarget, a.toTarget, ease)
    // Calling update() bakes the new position into OrbitControls' internal
    // spherical representation so its own frame loop doesn't override us.
    controlsRef.current.update()

    if (a.t >= 1) {
      anim.current = null
      controlsRef.current.enableDamping = true
    }
  })

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        minDistance={15}
        maxDistance={300}
        maxPolarAngle={Math.PI / 2 - 0.04}
        enableDamping
        dampingFactor={0.06}
      />
      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport labelColor="white" axisHeadScale={1} />
      </GizmoHelper>
    </>
  )
}
