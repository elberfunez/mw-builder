import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraRig from './CameraRig'
import BuildingModel from './BuildingModel'

export default function BuilderScene({ config }) {
  const [activeView, setActiveView] = useState(null)
  const [targetView, setTargetView] = useState(null)

  function handleViewClick(key) {
    setTargetView(key)
    setActiveView(key)
    // Clear active highlight once the animation finishes (~650ms)
    setTimeout(() => setActiveView(null), 650)
  }

  return (
    // Wrapper div so the button overlay sits on top of the Canvas via absolute positioning
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Camera view buttons — compass layout, bottom-left corner */}
      <nav className="mw-view-nav" aria-label="Camera views">
        <button
          className={`mw-view-btn mw-view-btn--front${activeView === 'front' ? ' mw-view-btn--active' : ''}`}
          onClick={() => handleViewClick('front')}
        >↑ Front</button>
        <button
          className={`mw-view-btn mw-view-btn--left${activeView === 'left' ? ' mw-view-btn--active' : ''}`}
          onClick={() => handleViewClick('left')}
        >← Left</button>
        <button
          className={`mw-view-btn mw-view-btn--right${activeView === 'right' ? ' mw-view-btn--active' : ''}`}
          onClick={() => handleViewClick('right')}
        >Right →</button>
        <button
          className={`mw-view-btn mw-view-btn--back${activeView === 'back' ? ' mw-view-btn--active' : ''}`}
          onClick={() => handleViewClick('back')}
        >↓ Back</button>
      </nav>

      <Canvas
        shadows
        camera={{ position: [40, 28, 55], fov: 45, near: 0.1, far: 2000 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#dde3ea']} />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[60, 90, 40]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={300}
          shadow-camera-left={-80}
          shadow-camera-right={80}
          shadow-camera-top={80}
          shadow-camera-bottom={-80}
        />
        <directionalLight position={[-40, 20, -30]} intensity={0.35} />

        {/* CameraRig owns OrbitControls + GizmoHelper + all camera animation.
            Placed first so its useFrame subscribes before OrbitControls' loop,
            letting it override the camera position each frame during a transition. */}
        <CameraRig targetView={targetView} config={config} />

        <BuildingModel config={config} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[600, 600]} />
          <meshStandardMaterial color="#b8c4c8" />
        </mesh>
      </Canvas>
    </div>
  )
}
