const SLIDERS = [
  { key: 'width',     label: 'Width',       min: 12,  max: 60,  step: 2, unit: 'ft' },
  { key: 'length',    label: 'Length',      min: 20,  max: 200, step: 5, unit: 'ft' },
  { key: 'height',    label: 'Eave Height', min: 8,   max: 20,  step: 1, unit: 'ft' },
  { key: 'roofPitch', label: 'Roof Pitch',  min: 1,   max: 6,   step: 1, unit: ':12' },
]

export default function ControlPanel({ config, onUpdate }) {
  return (
    <div className="mw-panel">
      <h2 className="mw-panel__title">Metal Building</h2>

      {SLIDERS.map(({ key, label, min, max, step, unit }) => (
        <div key={key} className="mw-panel__field">
          <label className="mw-panel__label">
            {label}
            <span className="mw-panel__value">
              {config[key]}{unit}
            </span>
          </label>
          <input
            type="range"
            className="mw-panel__range"
            min={min}
            max={max}
            step={step}
            value={config[key]}
            onChange={e => onUpdate(key, Number(e.target.value))}
          />
        </div>
      ))}

      <hr className="mw-panel__divider" />

      <div className="mw-panel__field">
        <label className="mw-panel__label">Roof Style</label>
        <select
          className="mw-panel__select"
          value={config.roofType}
          onChange={e => onUpdate('roofType', e.target.value)}
        >
          <option value="gabled">Gabled (A-Frame)</option>
          <option value="regular">Regular (Flat)</option>
        </select>
      </div>

      <hr className="mw-panel__divider" />

      <div className="mw-panel__field">
        <label className="mw-panel__label">
          Wall Color
          <span className="mw-panel__color-hex">{config.wallColor}</span>
        </label>
        <div className="mw-panel__color-row">
          <input
            type="color"
            className="mw-panel__color"
            value={config.wallColor}
            onChange={e => onUpdate('wallColor', e.target.value)}
          />
        </div>
      </div>

      <div className="mw-panel__field">
        <label className="mw-panel__label">
          Roof Color
          <span className="mw-panel__color-hex">{config.roofColor}</span>
        </label>
        <div className="mw-panel__color-row">
          <input
            type="color"
            className="mw-panel__color"
            value={config.roofColor}
            onChange={e => onUpdate('roofColor', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
