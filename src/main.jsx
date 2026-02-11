import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const mountElement = document.querySelector('[data-builder]')

if (mountElement) {
  createRoot(mountElement).render(
    <StrictMode>
      <App
        // initialConfig={{
        //   company: mountElement.dataset.company,
        //   basePrice: Number(mountElement.dataset.basePrice) || 0
        // }}
      />
    </StrictMode>
  )
} 