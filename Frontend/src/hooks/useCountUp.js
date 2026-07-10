import { useEffect, useState } from 'react'

/**
 * useCountUp — animates a number from 0 to `end` over `duration` ms.
 * Uses requestAnimationFrame with ease-out.
 */
export function useCountUp(end, duration = 1400, start = 0) {
  const [value, setValue] = useState(start)

  useEffect(() => {
    if (typeof end !== 'number' || Number.isNaN(end)) return
    let raf
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setValue(start + (end - start) * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, start])

  return value
}

export default useCountUp
