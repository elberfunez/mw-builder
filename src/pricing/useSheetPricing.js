import { useState, useEffect } from 'react'

// Parses a published Google Sheets CSV into a structured rates object.
// Expected columns: field, value, type, amount
// Types: sqft_rate | multiplier | flat | rate
function parseCSV(text) {
  const [_header, ...rows] = text.trim().split('\n')
  const rates = {
    baseSqft:    6.50,
    multipliers: {},
    flats:       {},
    depositRate: 0.20,
  }

  for (const row of rows) {
    const [field, value, type, amount] = row.split(',').map(s => s.trim())
    if (!field || !type || !amount) continue
    const num = parseFloat(amount)
    if (isNaN(num)) continue

    if (type === 'sqft_rate') {
      rates.baseSqft = num
    } else if (type === 'multiplier') {
      if (!rates.multipliers[field]) rates.multipliers[field] = {}
      rates.multipliers[field][value] = num
    } else if (type === 'flat') {
      if (!rates.flats[field]) rates.flats[field] = {}
      rates.flats[field][value] = num
    } else if (type === 'rate') {
      if (field === 'deposit') rates.depositRate = num
    }
  }

  return rates
}

export function useSheetPricing() {
  const url = import.meta.env.VITE_PRICING_SHEET_URL

  const [rates,   setRates]   = useState(null)
  const [loading, setLoading] = useState(!!url)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!url) return

    let cancelled = false
    setLoading(true)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
        return res.text()
      })
      .then(text => {
        if (!cancelled) {
          setRates(parseCSV(text))
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [url])

  return { rates, loading, error }
}
