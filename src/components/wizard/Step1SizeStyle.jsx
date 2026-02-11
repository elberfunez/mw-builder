import SectionAccordion  from '../ui/SectionAccordion'
import ButtonGroup       from '../ui/ButtonGroup'
import ThumbnailPicker   from '../ui/ThumbnailPicker'
import DimensionInput    from '../ui/DimensionInput'
import ColorSwatchPicker from '../ui/ColorSwatchPicker'

// Inline SVG thumbnails — no external assets needed
const SVG_CARPORT = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='30' width='70' height='18' fill='%23C9B99A'/><polygon points='40,8 5,30 75,30' fill='%2336454F'/><line x1='10' y1='30' x2='10' y2='48' stroke='%23888' stroke-width='2'/><line x1='70' y1='30' x2='70' y2='48' stroke='%23888' stroke-width='2'/></svg>`
const SVG_GARAGE  = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='28' width='70' height='20' fill='%23C9B99A'/><polygon points='40,6 5,28 75,28' fill='%2336454F'/><rect x='20' y='34' width='40' height='14' fill='%23ddd' stroke='%23aaa' stroke-width='1'/><line x1='40' y1='34' x2='40' y2='48' stroke='%23aaa' stroke-width='1'/></svg>`
const SVG_COMBO   = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 55'><rect x='5' y='28' width='45' height='20' fill='%23C9B99A'/><rect x='50' y='32' width='25' height='16' fill='%23C9B99A' opacity='0.6'/><polygon points='27,6 5,28 50,28' fill='%2336454F'/><polygon points='62,12 50,32 75,32' fill='%2336454F' opacity='0.8'/><rect x='12' y='34' width='28' height='14' fill='%23ddd' stroke='%23aaa' stroke-width='1'/></svg>`

const SVG_REGULAR  = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 50'><rect x='8' y='22' width='64' height='20' fill='%23C9B99A'/><rect x='5' y='19' width='70' height='5' fill='%2336454F'/></svg>`
const SVG_VERTICAL = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 50'><rect x='8' y='22' width='64' height='20' fill='%23C9B99A'/><polygon points='40,6 5,22 75,22' fill='%2336454F'/><line x1='20' y1='6' x2='20' y2='22' stroke='%23C9B99A' stroke-width='1.5'/><line x1='33' y1='6' x2='28' y2='22' stroke='%23C9B99A' stroke-width='1.5'/><line x1='47' y1='6' x2='52' y2='22' stroke='%23C9B99A' stroke-width='1.5'/><line x1='60' y1='6' x2='60' y2='22' stroke='%23C9B99A' stroke-width='1.5'/></svg>`
const SVG_BOXED    = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 50'><rect x='8' y='22' width='64' height='20' fill='%23C9B99A'/><polygon points='40,8 8,22 72,22' fill='%2336454F'/><rect x='5' y='21' width='70' height='3' fill='%23555'/></svg>`

const BUILDING_TYPE_OPTIONS = [
  { value: 'carport', label: 'Carport', imgSrc: SVG_CARPORT },
  { value: 'garage',  label: 'Garage',  imgSrc: SVG_GARAGE  },
  { value: 'combo',   label: 'Combo',   imgSrc: SVG_COMBO   },
]

const ROOF_STYLE_OPTIONS = [
  { value: 'regular',   label: 'Regular',    imgSrc: SVG_REGULAR  },
  { value: 'vertical',  label: 'Vertical',   imgSrc: SVG_VERTICAL },
  { value: 'boxedEave', label: 'Boxed Eave', imgSrc: SVG_BOXED    },
]

const PITCH_OPTIONS = [
  { value: 6,  label: '6/12'  },
  { value: 8,  label: '8/12'  },
  { value: 9,  label: '9/12'  },
  { value: 12, label: '12/12' },
]

const FRAME_OPTIONS = [
  { value: '2x2', label: '2"×2"' },
  { value: '2x3', label: '2"×3"' },
]

const LEAN_TO_OPTIONS = [
  { value: 'none',     label: 'No Lean-To'     },
  { value: 'complete', label: 'Complete Style'  },
]

const SURFACE_OPTIONS = [
  { value: 'groundPosts', label: 'Ground Posts' },
  { value: 'concrete',    label: 'Concrete'     },
  { value: 'asphalt',     label: 'Asphalt'      },
]

const CERT_OPTIONS = [
  { value: '125mph', label: '125 MPH' },
  { value: '35psf',  label: '35 PSF'  },
]

const GAUGE_OPTIONS = [
  { value: '14ga', label: '14 GA' },
  { value: '12ga', label: '12 GA' },
]

const SHEETING_OPTIONS = [
  { value: '29ga', label: '29 GA' },
  { value: '26ga', label: '26 GA' },
]

export default function Step1SizeStyle({ config, onUpdate }) {
  return (
    <div className="mw-step1">

      <SectionAccordion title="Building Type">
        <ThumbnailPicker
          options={BUILDING_TYPE_OPTIONS}
          value={config.buildingType}
          onChange={v => onUpdate('buildingType', v)}
          columns={3}
        />
      </SectionAccordion>

      <SectionAccordion title="Choose Your Roof Style">
        <ThumbnailPicker
          options={ROOF_STYLE_OPTIONS}
          value={config.roofType}
          onChange={v => onUpdate('roofType', v)}
          columns={3}
        />
      </SectionAccordion>

      <SectionAccordion title="Choose Your Roof Pitch">
        <ButtonGroup
          options={PITCH_OPTIONS}
          value={config.roofPitch}
          onChange={v => onUpdate('roofPitch', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="Choose Your Frame Size">
        <ButtonGroup
          options={FRAME_OPTIONS}
          value={config.frameSize}
          onChange={v => onUpdate('frameSize', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="Dimensions">
        <div className="mw-step1__dims">
          <DimensionInput
            label="Width"
            value={config.width}
            onChange={v => onUpdate('width', v)}
            min={12} max={60} step={2}
          />
          <DimensionInput
            label="Length"
            value={config.length}
            onChange={v => onUpdate('length', v)}
            min={20} max={200} step={5}
          />
          <DimensionInput
            label="Leg Height"
            value={config.height}
            onChange={v => onUpdate('height', v)}
            min={6} max={20} step={1}
          />
        </div>
      </SectionAccordion>

      <SectionAccordion title="Select Your Roof Color">
        <ColorSwatchPicker
          value={config.roofColor}
          onChange={v => onUpdate('roofColor', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="Select Your Trim Color">
        <ColorSwatchPicker
          value={config.trimColor}
          onChange={v => onUpdate('trimColor', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="Select Your Sides & Ends Color">
        <ColorSwatchPicker
          value={config.wallColor}
          onChange={v => onUpdate('wallColor', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="Add 12' Lean-To" defaultOpen={false}>
        <ButtonGroup
          options={LEAN_TO_OPTIONS}
          value={config.leanTo}
          onChange={v => onUpdate('leanTo', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="Installation Surface" defaultOpen={false}>
        <ButtonGroup
          options={SURFACE_OPTIONS}
          value={config.surface}
          onChange={v => onUpdate('surface', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="Certification" defaultOpen={false}>
        <ButtonGroup
          options={CERT_OPTIONS}
          value={config.certification}
          onChange={v => onUpdate('certification', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="Gauge Tubing" defaultOpen={false}>
        <ButtonGroup
          options={GAUGE_OPTIONS}
          value={config.gauge}
          onChange={v => onUpdate('gauge', v)}
        />
      </SectionAccordion>

      <SectionAccordion title="29 GA or 26 GA Sheeting" defaultOpen={false}>
        <ButtonGroup
          options={SHEETING_OPTIONS}
          value={config.sheeting}
          onChange={v => onUpdate('sheeting', v)}
        />
      </SectionAccordion>

    </div>
  )
}
