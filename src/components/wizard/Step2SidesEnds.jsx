import SectionAccordion  from '../ui/SectionAccordion'
import ButtonGroup       from '../ui/ButtonGroup'
import ThumbnailPicker   from '../ui/ThumbnailPicker'
import ColorSwatchPicker from '../ui/ColorSwatchPicker'

// Building type thumbnails (same as Step 1)
const SVG_CARPORT = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='30' width='70' height='18' fill='%23C9B99A'/><polygon points='40,8 5,30 75,30' fill='%2336454F'/><line x1='10' y1='30' x2='10' y2='48' stroke='%23888' stroke-width='2'/><line x1='70' y1='30' x2='70' y2='48' stroke='%23888' stroke-width='2'/></svg>`
const SVG_GARAGE  = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='28' width='70' height='20' fill='%23C9B99A'/><polygon points='40,6 5,28 75,28' fill='%2336454F'/><rect x='20' y='34' width='40' height='14' fill='%23ddd' stroke='%23aaa' stroke-width='1'/><line x1='40' y1='34' x2='40' y2='48' stroke='%23aaa' stroke-width='1'/></svg>`
const SVG_COMBO   = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='28' width='45' height='20' fill='%23C9B99A'/><rect x='50' y='32' width='25' height='16' fill='%23C9B99A' opacity='0.6'/><polygon points='27,6 5,28 50,28' fill='%2336454F'/><polygon points='62,12 50,32 75,32' fill='%2336454F' opacity='0.8'/><rect x='12' y='34' width='28' height='14' fill='%23ddd' stroke='%23aaa' stroke-width='1'/></svg>`

// Side open style thumbnails
const SVG_S_OPEN  = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 50'><rect x='5' y='10' width='70' height='35' fill='none' stroke='%23aaa' stroke-width='1.5' stroke-dasharray='4,3'/><line x1='5' y1='10' x2='75' y2='10' stroke='%2336454F' stroke-width='3'/></svg>`
const SVG_S_RIGHT = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 50'><rect x='5' y='10' width='35' height='35' fill='none' stroke='%23aaa' stroke-width='1.5' stroke-dasharray='4,3'/><rect x='40' y='10' width='35' height='35' fill='%23C9B99A'/><line x1='5' y1='10' x2='75' y2='10' stroke='%2336454F' stroke-width='3'/></svg>`
const SVG_S_LEFT  = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 50'><rect x='5' y='10' width='35' height='35' fill='%23C9B99A'/><rect x='40' y='10' width='35' height='35' fill='none' stroke='%23aaa' stroke-width='1.5' stroke-dasharray='4,3'/><line x1='5' y1='10' x2='75' y2='10' stroke='%2336454F' stroke-width='3'/></svg>`
const SVG_S_ENC   = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 50'><rect x='5' y='10' width='70' height='35' fill='%23C9B99A'/><line x1='5' y1='10' x2='75' y2='10' stroke='%2336454F' stroke-width='3'/></svg>`

// Gable thumbnails
const SVG_GABLE_OPEN  = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='28' width='70' height='20' fill='%23C9B99A'/><polygon points='40,6 5,28 75,28' fill='none' stroke='%2336454F' stroke-width='2'/></svg>`
const SVG_GABLE_TRIPLE = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='28' width='70' height='20' fill='%23C9B99A'/><polygon points='40,6 5,28 75,28' fill='%2336454F'/><rect x='25' y='18' width='12' height='10' fill='%23888'/><rect x='43' y='18' width='12' height='10' fill='%23888'/></svg>`
const SVG_GABLE_BOTH  = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='28' width='70' height='20' fill='%23C9B99A'/><polygon points='40,6 5,28 75,28' fill='%2336454F'/></svg>`

const BUILDING_TYPE_OPTIONS = [
  { value: 'carport', label: 'Carport', imgSrc: SVG_CARPORT },
  { value: 'garage',  label: 'Garage',  imgSrc: SVG_GARAGE  },
  { value: 'combo',   label: 'Combo',   imgSrc: SVG_COMBO   },
]

const SIDE_OPEN_OPTIONS = [
  { value: 'open',          label: 'Open',           imgSrc: SVG_S_OPEN  },
  { value: 'rightSideOpen', label: 'Right Side Open', imgSrc: SVG_S_RIGHT },
  { value: 'leftSideOpen',  label: 'Left Side Open',  imgSrc: SVG_S_LEFT  },
  { value: 'enclosed',      label: 'Enclosed',        imgSrc: SVG_S_ENC   },
]

const GABLE_OPTIONS = [
  { value: 'gabledOpen',       label: 'Gable Open',          imgSrc: SVG_GABLE_OPEN   },
  { value: 'tripleClosed',     label: 'Triple Closed',       imgSrc: SVG_GABLE_TRIPLE },
  { value: 'bothGablesClosed', label: 'Both Gables Closed',  imgSrc: SVG_GABLE_BOTH   },
]

const SIDE_STYLE_OPTIONS = [
  { value: 'standard', label: 'Standard' },
  { value: 'vertical', label: 'Vertical' },
  { value: 'lite',     label: 'Lite'     },
]

const TWO_TONE_OPTIONS = [
  { value: false, label: 'Without Two-Tone' },
  { value: true,  label: 'With Two-Tone'    },
]

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Step2SidesEnds({ config, onUpdate }) {
  const updateSide = (side, key, val) => onUpdate(`sides.${side}.${key}`, val)

  return (
    <div className="mw-step2">

      <SectionAccordion title="Building Type">
        <ThumbnailPicker
          options={BUILDING_TYPE_OPTIONS}
          value={config.buildingType}
          onChange={v => onUpdate('buildingType', v)}
          columns={3}
        />
      </SectionAccordion>

      {['right', 'left'].map((side, i) => (
        <SectionAccordion key={side} title={`${capitalize(side)} Side`} defaultOpen={i === 0}>
          <ThumbnailPicker
            options={SIDE_OPEN_OPTIONS}
            value={config.sides[side].openStyle}
            onChange={v => updateSide(side, 'openStyle', v)}
            columns={4}
          />
        </SectionAccordion>
      ))}

      <SectionAccordion title="Side Style" defaultOpen={false}>
        <ButtonGroup
          options={SIDE_STYLE_OPTIONS}
          value={config.sides.right.style}
          onChange={v => {
            onUpdate('sides.right.style', v)
            onUpdate('sides.left.style',  v)
          }}
        />
      </SectionAccordion>

      <SectionAccordion title="Vertical Deluxe Two Tone on Side" defaultOpen={false}>
        <ButtonGroup
          options={TWO_TONE_OPTIONS}
          value={config.verticalTwoTone}
          onChange={v => onUpdate('verticalTwoTone', v === true || v === 'true')}
        />
      </SectionAccordion>

      {['front', 'back'].map((side, i) => (
        <SectionAccordion key={side} title={`${capitalize(side)} End`} defaultOpen={i === 0}>
          <ThumbnailPicker
            options={SIDE_OPEN_OPTIONS}
            value={config.sides[side].openStyle}
            onChange={v => updateSide(side, 'openStyle', v)}
            columns={4}
          />
        </SectionAccordion>
      ))}

      <SectionAccordion title="Gables" defaultOpen={false}>
        <ThumbnailPicker
          options={GABLE_OPTIONS}
          value={config.sides.front.gable}
          onChange={v => {
            onUpdate('sides.front.gable', v)
            onUpdate('sides.back.gable',  v)
          }}
          columns={3}
        />
      </SectionAccordion>

      <SectionAccordion title="Select Your Sides Color" defaultOpen={false}>
        <ColorSwatchPicker
          value={config.wallColor}
          onChange={v => onUpdate('wallColor', v)}
        />
      </SectionAccordion>

    </div>
  )
}
