export const COLOR_PALETTE = [
  { key: 'burgundy',    label: 'Burgundy',      hex: '#6B1A2A' },
  { key: 'red',         label: 'Red',            hex: '#C0392B' },
  { key: 'charcoal',   label: 'Charcoal',       hex: '#36454F' },
  { key: 'hunterGreen', label: 'Hunter Green',   hex: '#355E3B' },
  { key: 'galvalume',  label: 'Galvalume',      hex: '#BDC3C7' },
  { key: 'white',      label: 'White',          hex: '#F5F5F5' },
  { key: 'clay',       label: 'Clay',           hex: '#B87654' },
  { key: 'sandstone',  label: 'Sandstone',      hex: '#C9B99A' },
  { key: 'pewter',     label: 'Pewter',         hex: '#8A9BA8' },
  { key: 'tan',        label: 'Tan',            hex: '#D2B48C' },
  { key: 'blue',       label: 'Blue',           hex: '#2471A3' },
  { key: 'brown',      label: 'Brown',          hex: '#6E4B3A' },
]

export function resolveColor(key) {
  return COLOR_PALETTE.find(c => c.key === key)?.hex ?? '#94a3b8'
}
