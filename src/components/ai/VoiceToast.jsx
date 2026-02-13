import { useEffect, useState } from 'react'

export default function VoiceToast({ transcript, patches, errorMsg, onDismiss }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!transcript && !errorMsg) return
    setVisible(true)
    if (!errorMsg) {
      const t = setTimeout(() => {
        setVisible(false)
        onDismiss?.()
      }, 5000)
      return () => clearTimeout(t)
    }
  }, [transcript, errorMsg, onDismiss])

  if (!visible) return null

  return (
    <div className={`mw-voice-toast${errorMsg ? ' mw-voice-toast--error' : ''}`}>
      <button
        className="mw-voice-toast__close"
        onClick={() => { setVisible(false); onDismiss?.() }}
        type="button"
        aria-label="Dismiss"
      >×</button>

      {errorMsg ? (
        <p className="mw-voice-toast__error">{errorMsg}</p>
      ) : (
        <>
          <p className="mw-voice-toast__heard">"{transcript}"</p>
          {patches.length === 0 ? (
            <p className="mw-voice-toast__no-changes">No changes recognised.</p>
          ) : (
            <ul className="mw-voice-toast__changes">
              {patches.map(({ path, value }) => (
                <li key={path}><strong>{path}</strong> → {String(value)}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
