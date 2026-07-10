import { useEffect, useRef, useState } from 'react'

/**
 * useCountdown — counts down from `seconds` to 0.
 * Calls `onComplete` once when it reaches 0. Pauses when `active` is false.
 */
export function useCountdown(seconds, { active = true, onComplete } = {}) {
  const [remaining, setRemaining] = useState(seconds)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setRemaining(seconds)
  }, [seconds])

  useEffect(() => {
    if (!active) return undefined
    if (remaining <= 0) {
      onCompleteRef.current?.()
      return undefined
    }
    const id = setInterval(() => {
      setRemaining((r) => (r <= 0 ? 0 : r - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [active, remaining])

  return remaining
}

export default useCountdown
