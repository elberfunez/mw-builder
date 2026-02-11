import { useState } from 'react'
import SectionAccordion from '../ui/SectionAccordion'
import ButtonGroup      from '../ui/ButtonGroup'

const SIDE_TABS   = ['front', 'right', 'back', 'left']
const SIDE_LABELS = { front: 'Front End', right: 'Right Side', back: 'Back End', left: 'Left Side' }
const MIN_HEIGHT  = 9

const INSULATION_OPTIONS = [
  { value: 'none',     label: 'No Insulation'     },
  { value: 'roofOnly', label: 'Insulate Roof Only' },
]

export default function Step3DoorsWindows({ config, onUpdate }) {
  const [activeTab, setActiveTab] = useState('front')

  const heightOk = config.height >= MIN_HEIGHT

  function addDoor(side) {
    if (!heightOk) return
    onUpdate(`doors.${side}`, [
      ...config.doors[side],
      { type: 'garage', width: 9, height: 8 },
    ])
  }

  function removeDoor(side, idx) {
    onUpdate(`doors.${side}`, config.doors[side].filter((_, i) => i !== idx))
  }

  const activeDoors = config.doors[activeTab] ?? []

  return (
    <div className="mw-step3">

      <div className="mw-step3__summary-header">
        <p>Select a side to add doors and windows.</p>
      </div>

      {/* Side tabs */}
      <div className="mw-step3__tabs">
        {SIDE_TABS.map(side => (
          <button
            key={side}
            className={`mw-step3__tab${activeTab === side ? ' mw-step3__tab--active' : ''}`}
            onClick={() => setActiveTab(side)}
            type="button"
          >
            {SIDE_LABELS[side]}
          </button>
        ))}
      </div>

      {/* Height validation banner */}
      {!heightOk && (
        <div className="mw-step3__validation">
          <p>Your sides are currently {config.height}ft — they must be at least {MIN_HEIGHT}ft to add garage doors.</p>
          <button
            className="mw-step3__fix-btn"
            onClick={() => onUpdate('height', MIN_HEIGHT)}
            type="button"
          >
            Change height to {MIN_HEIGHT}ft to add garage doors
          </button>
          <button
            className="mw-step3__fix-btn mw-step3__fix-btn--secondary"
            onClick={() => {
              onUpdate('height', MIN_HEIGHT)
              SIDE_TABS.forEach(s => onUpdate(`sides.${s}.openStyle`, 'enclosed'))
            }}
            type="button"
          >
            Change to Open Sides Carport
          </button>
        </div>
      )}

      {/* Active side door list */}
      <SectionAccordion title={`${SIDE_LABELS[activeTab]} — Garage Doors`}>
        {activeDoors.length === 0 && (
          <p className="mw-step3__empty">No doors added yet.</p>
        )}
        {activeDoors.map((door, i) => (
          <div key={i} className="mw-step3__door-row">
            <span>{door.width}ft × {door.height}ft Garage Door</span>
            <button
              className="mw-step3__remove"
              onClick={() => removeDoor(activeTab, i)}
              type="button"
              aria-label="Remove door"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="mw-step3__add-door"
          disabled={!heightOk}
          onClick={() => addDoor(activeTab)}
          type="button"
        >
          + Add Garage Door
        </button>
      </SectionAccordion>

      <SectionAccordion title="Insulation Options" defaultOpen={false}>
        <ButtonGroup
          options={INSULATION_OPTIONS}
          value={config.insulation}
          onChange={v => onUpdate('insulation', v)}
        />
      </SectionAccordion>

    </div>
  )
}
