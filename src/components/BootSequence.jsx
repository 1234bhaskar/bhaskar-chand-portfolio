import { useState } from 'react'
import Typewriter from './Typewriter.jsx'
import { bootLogs } from '../data/portfolio.js'

/**
 * Types the boot log lines one after another, fast.
 * Calls onComplete() once the final line has been typed.
 */
export default function BootSequence({ onComplete }) {
    const [index, setIndex] = useState(0)

    return (
        <div className="boot">
            {bootLogs.slice(0, index).map((l, i) => (
                <p className="boot-line" key={i}>
                    {l}
                </p>
            ))}
            {index < bootLogs.length && (
                <p className="boot-line">
                    <Typewriter
                        text={bootLogs[index]}
                        speed={6}
                        caret
                        onDone={() => {
                            const next = index + 1
                            // brief pause between log lines
                            setTimeout(() => {
                                setIndex(next)
                                if (next >= bootLogs.length && onComplete) onComplete()
                            }, 70)
                        }}
                    />
                </p>
            )}
        </div>
    )
}
