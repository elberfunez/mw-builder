const LABELS = ['Size & Style', 'Sides & Ends', 'Doors & Windows']

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <div className="mw-step-indicator" role="tablist" aria-label="Builder progress">
      {LABELS.map((label, i) => {
        const n = i + 1
        const state = n < currentStep ? 'done' : n === currentStep ? 'active' : 'pending'

        return (
          <button
            key={n}
            className={`mw-step-indicator__item mw-step-indicator__item--${state}`}
            onClick={() => onStepClick(n)}
            type="button"
            role="tab"
            aria-selected={n === currentStep}
          >
            <span className="mw-step-indicator__dot">{n < currentStep ? '✓' : n}</span>
            <span className="mw-step-indicator__label">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
