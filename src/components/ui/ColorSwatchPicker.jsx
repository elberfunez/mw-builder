import { COLOR_PALETTE } from '../../constants/colors'

export default function ColorSwatchPicker({ value, onChange, palette = COLOR_PALETTE }) {
  return (
    <div className="mw-swatch-grid">
      {palette.map(c => (
        <button
          key={c.key}
          className={`mw-swatch${value === c.key ? ' mw-swatch--active' : ''}`}
          style={{ background: c.hex }}
          title={c.label}
          data-label={c.label}
          onClick={() => onChange(c.key)}
          type="button"
          aria-label={c.label}
        />
      ))}
    </div>
  )
}
