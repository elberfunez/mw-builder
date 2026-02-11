export default function ThumbnailPicker({ options, value, onChange, columns = 3 }) {
  return (
    <div
      className="mw-thumb-picker"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {options.map(opt => (
        <button
          key={opt.value}
          className={`mw-thumb-picker__card${value === opt.value ? ' mw-thumb-picker__card--active' : ''}`}
          onClick={() => onChange(opt.value)}
          type="button"
        >
          {opt.imgSrc && (
            <img src={opt.imgSrc} alt={opt.label} className="mw-thumb-picker__img" />
          )}
          <span className="mw-thumb-picker__label">{opt.label}</span>
        </button>
      ))}
    </div>
  )
}
