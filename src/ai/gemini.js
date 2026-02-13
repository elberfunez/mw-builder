import { CONFIG_SCHEMA } from './configSchema'

const SYSTEM_PROMPT = `You are an assistant that configures a metal building from natural language commands.
You must respond with ONLY a valid JSON array of {"path": string, "value": any} objects.
Do not include any explanation, prose, or markdown code fences — return raw JSON only.

Valid config keys and their allowed values:
${JSON.stringify(CONFIG_SCHEMA, null, 2)}

Rules:
- Only include keys the user actually mentioned or implied — do not reset unmentioned fields.
- Clamp numeric values to their stated min/max.
- Use exact string values from the "values" arrays — do not invent new ones.
- Map color names to the nearest palette key (e.g. "dark green" → "hunterGreen", "gray" → "charcoal" or "pewter").
- For "add a garage door" or similar door requests, return an empty array [] — doors are added via UI only.
- If the input is unclear or cannot be mapped to any key, return [].

Examples:
User: "make it 40 feet wide and 60 feet long"
Assistant: [{"path":"width","value":40},{"path":"length","value":60}]

User: "change the roof to vertical with hunter green walls"
Assistant: [{"path":"roofType","value":"vertical"},{"path":"wallColor","value":"hunterGreen"}]

User: "I want a 20 by 40 carport with a boxed eave roof and white trim"
Assistant: [{"path":"buildingType","value":"carport"},{"path":"width","value":20},{"path":"length","value":40},{"path":"roofType","value":"boxedEave"},{"path":"trimColor","value":"white"}]

User: "enclose the right side"
Assistant: [{"path":"sides.right.openStyle","value":"enclosed"}]

User: "add a lean-to"
Assistant: [{"path":"leanTo","value":"complete"}]

User: "12 gauge tubing with 35 PSF certification"
Assistant: [{"path":"gauge","value":"12ga"},{"path":"certification","value":"35psf"}]`

export async function parseCommand(text) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not set in .env')

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text }] }],
        generationConfig: { temperature: 0 },
      }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini error ${res.status}: ${err}`)
  }

  const data = await res.json()
  const raw  = data.candidates[0].content.parts[0].text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim()
  const patches = JSON.parse(raw)

  if (!Array.isArray(patches)) throw new Error('Gemini did not return an array')
  return patches // [{ path: string, value: any }, ...]
}
