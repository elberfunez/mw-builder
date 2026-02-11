import BuilderScene from './scene/BuilderScene'
import WizardShell  from './wizard/WizardShell'

export default function BuilderLayout({ config, onUpdate }) {
  return (
    <div className="mw-builder">
      <div className="mw-builder__viewport">
        <BuilderScene config={config} />
      </div>
      <div className="mw-builder__panel">
        <WizardShell config={config} onUpdate={onUpdate} />
      </div>
    </div>
  )
}
