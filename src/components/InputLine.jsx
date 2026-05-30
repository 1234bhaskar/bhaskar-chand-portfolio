import { useEffect, useRef, useState } from 'react'
import Prompt from './Prompt.jsx'

/**
 * The active, blinking command prompt.
 * - Maintains its own text value while typing.
 * - Renders a custom block cursor that tracks the typed text.
 * - Keeps focus so the page always feels like a live shell.
 * - Supports command history with ArrowUp / ArrowDown.
 */
export default function InputLine({ onSubmit, history }) {
    const [value, setValue] = useState('')
    const [histIndex, setHistIndex] = useState(-1)
    const inputRef = useRef(null)

    const focus = () => inputRef.current && inputRef.current.focus()

    useEffect(() => {
        focus()
        // Refocus when clicking anywhere on the document.
        const handler = () => focus()
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            onSubmit(value)
            setValue('')
            setHistIndex(-1)
            return
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (history.length === 0) return
            const next = histIndex < 0 ? history.length - 1 : Math.max(0, histIndex - 1)
            setHistIndex(next)
            setValue(history[next])
            return
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (history.length === 0) return
            if (histIndex < 0) return
            const next = histIndex + 1
            if (next >= history.length) {
                setHistIndex(-1)
                setValue('')
            } else {
                setHistIndex(next)
                setValue(history[next])
            }
            return
        }

        if (e.key === 'l' && e.ctrlKey) {
            // Ctrl+L clears, like a real shell.
            e.preventDefault()
            onSubmit('clear')
            setValue('')
        }
    }

    return (
        <div className="input-line" onClick={focus}>
            <Prompt />
            <div className="input-wrap">
                <span aria-hidden="true" style={{ whiteSpace: 'pre' }} className="command-text">
                    {value}
                </span>
                <span className="cursor" aria-hidden="true" />
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    aria-label="terminal command input"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        width: '100%',
                    }}
                />
            </div>
        </div>
    )
}
