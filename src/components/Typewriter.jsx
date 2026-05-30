import { useEffect, useRef, useState } from 'react'

/**
 * Types out `text` one character at a time, then calls onDone().
 * `speed` is ms per character. `caret` shows a blinking caret while typing.
 */
export default function Typewriter({
    text,
    speed = 18,
    className = '',
    caret = false,
    onDone,
}) {
    const [shown, setShown] = useState('')
    const doneRef = useRef(onDone)
    doneRef.current = onDone

    useEffect(() => {
        setShown('')
        let i = 0
        let cancelled = false

        // Respect reduced-motion: render instantly.
        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (reduce) {
            setShown(text)
            const t = setTimeout(() => doneRef.current && doneRef.current(), 0)
            return () => clearTimeout(t)
        }

        const tick = () => {
            if (cancelled) return
            i += 1
            setShown(text.slice(0, i))
            if (i < text.length) {
                timer = setTimeout(tick, speed)
            } else if (doneRef.current) {
                doneRef.current()
            }
        }
        let timer = setTimeout(tick, speed)

        return () => {
            cancelled = true
            clearTimeout(timer)
        }
    }, [text, speed])

    const finished = shown.length === text.length

    return (
        <span className={className}>
            {shown}
            {caret && !finished && <span className="type-caret" aria-hidden="true" />}
        </span>
    )
}
