import { useState, useRef, useCallback } from 'react'
import { parseCommand } from './gemini'

// Manages the full voice → AI → config-update lifecycle.
// Also exposes `submit(text)` so the same pipeline can be triggered
// from a typed text input without any voice involvement.
export function useVoice({ onUpdate }) {
  const [status, setStatus]           = useState('idle')  // 'idle' | 'listening' | 'processing' | 'error'
  const [errorMsg, setErrorMsg]       = useState('')
  const [lastTranscript, setLastTranscript] = useState('')
  const [lastPatches, setLastPatches]       = useState([])
  const recogRef = useRef(null)

  // Core: send any text string through GPT-4o and apply patches
  const submit = useCallback(async (text) => {
    if (!text.trim()) return
    setLastTranscript(text.trim())
    setStatus('processing')
    setErrorMsg('')
    try {
      const patches = await parseCommand(text.trim())
      patches.forEach(({ path, value }) => onUpdate(path, value))
      setLastPatches(patches)
      setStatus('idle')
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }, [onUpdate])

  // Start Web Speech API listening
  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setErrorMsg('Speech recognition is not supported in this browser. Please use Chrome or Edge, or type your command instead.')
      setStatus('error')
      return
    }

    const recog = new SR()
    recog.lang = 'en-US'
    recog.interimResults = false
    recog.maxAlternatives = 1
    recogRef.current = recog

    recog.onstart = () => setStatus('listening')

    recog.onerror = (e) => {
      setErrorMsg(`Speech error: ${e.error}`)
      setStatus('error')
    }

    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      recog.stop()
      submit(transcript)
    }

    recog.start()
  }, [submit])

  const stopListening = useCallback(() => {
    recogRef.current?.stop()
    setStatus('idle')
  }, [])

  const clearError = useCallback(() => {
    setStatus('idle')
    setErrorMsg('')
  }, [])

  return {
    status,       // 'idle' | 'listening' | 'processing' | 'error'
    errorMsg,
    lastTranscript,
    lastPatches,
    startListening,
    stopListening,
    submit,       // call with a text string to skip voice entirely
    clearError,
  }
}
