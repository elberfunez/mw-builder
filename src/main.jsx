import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const mountEl = document.querySelector('[data-builder]')

if (mountEl) {
  // Parse optional config overrides from data attributes:
  //   <div data-builder data-width="30" data-length="50" data-height="12"></div>
  const fromAttrs = {}
  const numericKeys = ['width', 'length', 'height', 'roofPitch']
  numericKeys.forEach(key => {
    const val = mountEl.dataset[key]
    if (val !== undefined) fromAttrs[key] = Number(val)
  })
  const stringKeys = [
    'roofType', 'wallColor', 'roofColor', 'buildingType',
    'trimColor', 'frameSize', 'surface', 'certification',
    'gauge', 'sheeting', 'insulation', 'leanTo', 'sideColor',
  ]
  stringKeys.forEach(key => {
    if (mountEl.dataset[key]) fromAttrs[key] = mountEl.dataset[key]
  })

  createRoot(mountEl).render(
    <StrictMode>
      <App initialConfig={fromAttrs} />
    </StrictMode>
  )
}
