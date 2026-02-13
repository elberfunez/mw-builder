import Step1SizeStyle from './Step1SizeStyle'
import Step2SidesEnds from './Step2SidesEnds'
import Step3DoorsWindows from './Step3DoorsWindows'

const STEP_COMPONENTS = [Step1SizeStyle, Step2SidesEnds, Step3DoorsWindows]
const STEP_LABELS = ['Size & Style', 'Sides & Ends', 'Doors & Windows']

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function WizardShell({ config, onUpdate, step }) {
  const StepContent = STEP_COMPONENTS[step - 1]

  return (
    <div className="mw-wizard">
      <div className="mw-wizard__header">
        <h2 className="mw-wizard__title">Design Your {capitalize(config.buildingType)}</h2>
        <p className="mw-wizard__step-label">Step {step}: {STEP_LABELS[step - 1]}</p>
      </div>

      <div className="mw-wizard__body">
        <StepContent config={config} onUpdate={onUpdate} />
      </div>
    </div>
  )
}
