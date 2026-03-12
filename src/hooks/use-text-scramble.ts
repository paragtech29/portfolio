"use client"

import { useEffect, useState, useCallback } from "react"

const CHARS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export function useTextScramble(
  finalText: string,
  options: {
    trigger?: boolean
    delay?: number
    duration?: number
    interval?: number
  } = {}
) {
  const { trigger = true, delay = 0, duration = 1500, interval = 40 } = options
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!trigger) {
      setDisplayText("")
      setIsComplete(false)
      return
    }

    let timeout: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>

    timeout = setTimeout(() => {
      const totalSteps = Math.ceil(duration / interval)
      let step = 0

      intervalId = setInterval(() => {
        step++
        const progress = step / totalSteps

        const result = finalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            const charProgress = i / finalText.length
            if (progress > charProgress + 0.3) return char
            if (progress > charProgress) {
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")

        setDisplayText(result)

        if (step >= totalSteps) {
          setDisplayText(finalText)
          setIsComplete(true)
          clearInterval(intervalId)
        }
      }, interval)
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(intervalId)
    }
  }, [trigger, finalText, delay, duration, interval])

  return { displayText, isComplete }
}
