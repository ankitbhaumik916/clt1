import { useState, useEffect } from 'react'

interface TerminalTextProps {
  text: string
  delay?: number
}

export function TerminalText({ text, delay = 0 }: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let charIndex = 0
      const interval = setInterval(() => {
        if (charIndex <= text.length) {
          setDisplayedText(text.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [text, delay])

  return (
    <span className="font-mono">
      {displayedText}
      {displayedText.length < text.length && <span className="animate-blink">_</span>}
    </span>
  )
}
