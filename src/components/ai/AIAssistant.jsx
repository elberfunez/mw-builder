import { useState, useRef } from 'react'
import { useVoice } from '../../ai/useVoice'
import VoiceToast  from './VoiceToast'

export default function AIAssistant({ onUpdate }) {
  const [text, setText]           = useState('')
  const [showToast, setShowToast] = useState(false)
  const inputRef = useRef(null)

  const {
    status,
    errorMsg,
    lastTranscript,
    lastPatches,
    startListening,
    stopListening,
    submit,
    clearError,
  } = useVoice({ onUpdate })

  const isListening  = status === 'listening'
  const isProcessing = status === 'processing'
  const isError      = status === 'error'
  const isBusy       = isListening || isProcessing

  // Called when user submits the text input
  function handleTextSubmit(e) {
    e.preventDefault()
    if (!text.trim() || isBusy) return
    submit(text.trim())
    setText('')
    setShowToast(true)
  }

  // Called when voice result comes back
  function handleMicClick() {
    if (isError)      { clearError(); return }
    if (isListening)  { stopListening(); return }
    if (isProcessing) return
    setShowToast(true)
    startListening()
  }

  const micLabel = isListening ? 'Stop' : isProcessing ? '…' : isError ? '!' : '🎙'
  const micTitle = isListening
    ? 'Stop listening'
    : isProcessing
    ? 'Processing…'
    : isError
    ? 'Error — click to dismiss'
    : 'Speak your command'

  return (
    <div className="mw-ai-assistant">
      <form className="mw-ai-assistant__form" onSubmit={handleTextSubmit}>
        <button
          type="button"
          className={`mw-ai-mic mw-ai-mic--${status}`}
          onClick={handleMicClick}
          disabled={isProcessing}
          title={micTitle}
          aria-label={micTitle}
        >
          {micLabel}
        </button>

        <input
          ref={inputRef}
          className="mw-ai-input"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Describe your building…"
          disabled={isBusy}
          aria-label="Describe your building"
        />

        <button
          type="submit"
          className="mw-ai-submit"
          disabled={!text.trim() || isBusy}
          title="Send"
          aria-label="Send"
        >
          {isProcessing ? '⏳' : '↵'}
        </button>
      </form>

      {showToast && (
        <VoiceToast
          transcript={lastTranscript}
          patches={lastPatches}
          errorMsg={isError ? errorMsg : ''}
          onDismiss={() => setShowToast(false)}
        />
      )}
    </div>
  )
}
