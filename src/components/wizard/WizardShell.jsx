import { useState } from 'react'
import StepIndicator     from './StepIndicator'
import Step1SizeStyle    from './Step1SizeStyle'
import Step2SidesEnds    from './Step2SidesEnds'
import Step3DoorsWindows from './Step3DoorsWindows'
import PricingBar        from './PricingBar'

const STEP_COMPONENTS = [Step1SizeStyle, Step2SidesEnds, Step3DoorsWindows]
const STEP_LABELS     = ['Size & Style', 'Sides & Ends', 'Doors & Windows']

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function WizardShell({ config, onUpdate }) {
  const [step, setStep] = useState(1)
  const StepContent = STEP_COMPONENTS[step - 1]

  return (
    <div className="mw-wizard">
      <div className="mw-wizard__header">
        <h2 className="mw-wizard__title">
          Customize Your {capitalize(config.buildingType)} and Get Instant Pricing
        </h2>
        <StepIndicator currentStep={step} onStepClick={setStep} />
      </div>

      <div className="mw-wizard__body">
        <p className="mw-wizard__step-label">
          Step {step}: {STEP_LABELS[step - 1]}
        </p>
        <StepContent config={config} onUpdate={onUpdate} />
      </div>

      <div className="mw-wizard__footer">
        <div className="mw-wizard__nav">
          {step > 1 && (
            <button
              className="mw-wizard__nav-btn mw-wizard__nav-btn--prev"
              onClick={() => setStep(s => s - 1)}
              type="button"
            >
              ‹ Prev Steps
            </button>
          )}
          {step < 3 && (
            <button
              className="mw-wizard__nav-btn mw-wizard__nav-btn--next"
              onClick={() => setStep(s => s + 1)}
              type="button"
            >
              {STEP_LABELS[step]} ›
            </button>
          )}
        </div>
        <PricingBar config={config} />
      </div>
    </div>
  )
}
