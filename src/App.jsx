import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="builder-root">
      <h1>Metal Building Configurator</h1>
      <p>3D scene loads here</p>
    </div>
  )
}

export default App
