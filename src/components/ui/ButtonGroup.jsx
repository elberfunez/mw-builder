export default function ButtonGroup({ options, value, onChange }) {
  return (
    <div className="mw-btn-group">
      {options.map(opt => (
        <button
          key={String(opt.value)}
          className={`mw-btn-group__btn${value === opt.value ? ' mw-btn-group__btn--active' : ''}`}
          onClick={() => onChange(opt.value)}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
