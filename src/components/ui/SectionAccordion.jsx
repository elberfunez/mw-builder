import { useState } from 'react'

export default function SectionAccordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="mw-accordion">
      <button
        className="mw-accordion__header"
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        <span>{title}</span>
        <span className={`mw-accordion__chevron${open ? ' mw-accordion__chevron--open' : ''}`}>
          ›
        </span>
      </button>
      {open && <div className="mw-accordion__body">{children}</div>}
    </div>
  )
}
