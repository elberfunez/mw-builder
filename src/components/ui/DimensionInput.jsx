export default function DimensionInput({ label, value, onChange, min, max, step = 1, unit = 'ft' }) {
  return (
    <div className="mw-dim-input">
      <label className="mw-dim-input__label">{label}</label>
      <div className="mw-dim-input__row">
        <input
          type="number"
          className="mw-dim-input__field"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
        />
        <span className="mw-dim-input__unit">{unit}</span>
      </div>
    </div>
  )
}
