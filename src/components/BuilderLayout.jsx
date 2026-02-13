import { useState } from 'react'
import BuilderScene from './scene/BuilderScene'
import WizardShell from './wizard/WizardShell'
import StepIndicator from './wizard/StepIndicator'
import PricingBar from './wizard/PricingBar'

const STEP_LABELS = ['Size & Style', 'Sides & Ends', 'Doors & Windows']

export default function BuilderLayout({ config, onUpdate }) {
  const [step, setStep] = useState(1)

  return (
    <div className="mw-builder">
      <div className="mw-builder__viewport">
        <BuilderScene config={config} />
      </div>

      <div className="mw-builder__hud">
        <header className="mw-builder__top-stepper">
          <p className="mw-builder__kicker">Metal Workshop Builder</p>
          <StepIndicator currentStep={step} onStepClick={setStep} />
        </header>

        <div className="mw-builder__controls">
          <aside className="mw-builder__panel">
            <WizardShell config={config} onUpdate={onUpdate} step={step} />
          </aside>
        </div>

        <footer className="mw-builder__powerbar">
          <PricingBar
            config={config}
            step={step}
            onPrev={step > 1 ? () => setStep(s => s - 1) : undefined}
            onNext={step < 3 ? () => setStep(s => s + 1) : undefined}
            nextLabel={step < 3 ? STEP_LABELS[step] : ''}
          />
        </footer>
      </div>
    </div>
  )
}
