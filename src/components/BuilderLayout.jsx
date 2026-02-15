import { useState } from 'react'
import BuilderScene from './scene/BuilderScene'
import WizardShell from './wizard/WizardShell'
import StepIndicator from './wizard/StepIndicator'
import PricingBar from './wizard/PricingBar'
import AIAssistant from './ai/AIAssistant'

const STEP_LABELS = ['Size & Style', 'Sides & Ends', 'Doors & Windows']

export default function BuilderLayout({ config, onUpdate }) {
  const [step, setStep] = useState(1)
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <div className="mw-builder">
      {/* 3D viewport — always fills remaining space beside sidebar */}
      <div className="mw-builder__viewport">
        <BuilderScene config={config} />
      </div>

      {/* Sidebar: fixed on desktop/tablet, slide-up sheet on mobile */}
      <aside className={`mw-builder__sidebar${panelOpen ? ' mw-builder__sidebar--open' : ''}`}>
        <header className="mw-builder__sidebar-head">
          <p className="mw-builder__kicker">Design Your Garage</p>
          <StepIndicator currentStep={step} onStepClick={setStep} />
        </header>

        <div className="mw-builder__sidebar-body">
          <WizardShell config={config} onUpdate={onUpdate} step={step} />
        </div>

        <div className="mw-builder__sidebar-ai">
          <AIAssistant onUpdate={onUpdate} />
        </div>

        <footer className="mw-builder__sidebar-footer">
          <PricingBar
            config={config}
            step={step}
            onPrev={step > 1 ? () => setStep(s => s - 1) : undefined}
            onNext={step < 3 ? () => setStep(s => s + 1) : undefined}
            nextLabel={step < 3 ? STEP_LABELS[step] : ''}
          />
        </footer>
      </aside>

      {/* Mobile FAB — only visible on small screens */}
      <button
        className="mw-builder__panel-toggle"
        onClick={() => setPanelOpen(o => !o)}
        aria-label={panelOpen ? 'Hide controls' : 'Show controls'}
      >
        {panelOpen ? '✕' : '☰ Configure'}
      </button>
    </div>
  )
}
