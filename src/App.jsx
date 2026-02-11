import { useState } from 'react'
import BuilderLayout from './components/BuilderLayout'
import './App.css'

const DEFAULT_CONFIG = {
  // Dimensions
  width:  20,
  length: 30,
  height: 10,

  // Building type
  buildingType: 'garage',   // 'carport' | 'garage' | 'combo'

  // Roof
  roofType:  'regular',     // 'regular' | 'vertical' | 'boxedEave'
  roofPitch: 6,             // 6 | 8 | 9 | 12

  // Frame
  frameSize: '2x3',         // '2x2' | '2x3'

  // Colors (named palette keys)
  roofColor: 'charcoal',
  trimColor: 'white',
  wallColor: 'sandstone',

  // Options
  leanTo:        'none',        // 'none' | 'complete'
  surface:       'groundPosts', // 'groundPosts' | 'concrete' | 'asphalt'
  certification: '125mph',      // '125mph' | '35psf'
  gauge:         '14ga',        // '14ga' | '12ga'
  sheeting:      '29ga',        // '29ga' | '26ga'

  // Sides & Ends
  sides: {
    right: { openStyle: 'enclosed', style: 'standard' },
    left:  { openStyle: 'enclosed', style: 'standard' },
    front: { openStyle: 'enclosed', style: 'standard', gable: 'gabledOpen' },
    back:  { openStyle: 'enclosed', style: 'standard', gable: 'gabledOpen' },
  },
  sideColor:       'sandstone',
  verticalTwoTone: false,

  // Doors & Windows
  doors: {
    right: [],
    left:  [],
    front: [],
    back:  [],
  },
  insulation: 'none',  // 'none' | 'roofOnly'
}

function deepMerge(target, source) {
  const out = { ...target }
  for (const k of Object.keys(source)) {
    const srcVal = source[k]
    if (srcVal !== null && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
      out[k] = deepMerge(target[k] ?? {}, srcVal)
    } else {
      out[k] = srcVal
    }
  }
  return out
}

function App({ initialConfig = {} }) {
  const [config, setConfig] = useState({ ...DEFAULT_CONFIG, ...initialConfig })

  // Supports flat keys:  onUpdate('width', 20)
  // And dot-paths:       onUpdate('sides.right.openStyle', 'enclosed')
  function handleUpdate(path, value) {
    setConfig(prev => {
      const keys = path.split('.')
      if (keys.length === 1) return { ...prev, [path]: value }

      const [top, ...rest] = keys
      const nested = rest.reduceRight((acc, k) => ({ [k]: acc }), value)
      return { ...prev, [top]: deepMerge(prev[top], nested) }
    })
  }

  return <BuilderLayout config={config} onUpdate={handleUpdate} />
}

export default App
