const BASE_PRICE_PER_SQFT = 6.50

export function calcPrice(config) {
  const sqft = config.width * config.length
  let price  = sqft * BASE_PRICE_PER_SQFT

  if (config.roofType === 'vertical')      price *= 1.08
  if (config.roofType === 'boxedEave')     price *= 1.05
  if (config.frameSize === '2x3')          price *= 1.07
  if (config.gauge === '12ga')             price *= 1.12
  if (config.sheeting === '26ga')          price *= 1.09
  if (config.certification === '35psf')    price *= 1.10
  if (config.leanTo === 'complete')        price *= 1.15
  if (config.insulation === 'roofOnly')    price += 300

  const totalDoors = Object.values(config.doors ?? {}).flat().length
  price += totalDoors * 450

  const total   = Math.round(price)
  const deposit = Math.round(price * 0.20)
  return { total, deposit }
}
