// Full schema of every valid config key and its allowed values.
// This is serialized into the GPT-4o system prompt so the model is
// strictly constrained to valid inputs only.

export const CONFIG_SCHEMA = {
  buildingType:  { type: 'string', values: ['carport', 'garage', 'combo'] },
  roofType:      { type: 'string', values: ['regular', 'vertical', 'boxedEave'] },
  roofPitch:     { type: 'number', values: [6, 8, 9, 12] },
  frameSize:     { type: 'string', values: ['2x2', '2x3'] },
  width:         { type: 'number', min: 12, max: 60,  step: 2 },
  length:        { type: 'number', min: 20, max: 200, step: 5 },
  height:        { type: 'number', min: 6,  max: 20,  step: 1 },
  roofColor:     { type: 'string', values: ['burgundy','red','charcoal','hunterGreen','galvalume','white','clay','sandstone','pewter','tan','blue','brown'] },
  trimColor:     { type: 'string', values: ['burgundy','red','charcoal','hunterGreen','galvalume','white','clay','sandstone','pewter','tan','blue','brown'] },
  wallColor:     { type: 'string', values: ['burgundy','red','charcoal','hunterGreen','galvalume','white','clay','sandstone','pewter','tan','blue','brown'] },
  leanTo:        { type: 'string', values: ['none', 'complete'] },
  surface:       { type: 'string', values: ['groundPosts', 'concrete', 'asphalt'] },
  certification: { type: 'string', values: ['125mph', '35psf'] },
  gauge:         { type: 'string', values: ['14ga', '12ga'] },
  sheeting:      { type: 'string', values: ['29ga', '26ga'] },
  insulation:    { type: 'string', values: ['none', 'roofOnly'] },

  // Dot-path keys for nested sides config
  'sides.right.openStyle': { type: 'string', values: ['open', 'rightSideOpen', 'leftSideOpen', 'enclosed'] },
  'sides.left.openStyle':  { type: 'string', values: ['open', 'rightSideOpen', 'leftSideOpen', 'enclosed'] },
  'sides.front.openStyle': { type: 'string', values: ['open', 'rightSideOpen', 'leftSideOpen', 'enclosed'] },
  'sides.back.openStyle':  { type: 'string', values: ['open', 'rightSideOpen', 'leftSideOpen', 'enclosed'] },
  'sides.front.gable':     { type: 'string', values: ['gabledOpen', 'tripleClosed', 'bothGablesClosed'] },
  'sides.back.gable':      { type: 'string', values: ['gabledOpen', 'tripleClosed', 'bothGablesClosed'] },
}
