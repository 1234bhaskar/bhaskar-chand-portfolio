import { useCallback, useEffect, useRef, useState } from 'react'
import TitleBar from './components/TitleBar.jsx'
import BootSequence from './components/BootSequence.jsx'
import Typewriter from './components/Typewriter.jsx'
import InputLine from './components/InputLine.jsx'
import Prompt from './components/Prompt.jsx'
import { runCommand } from './lib/commands.jsx'

// Commands auto-played after boot to reveal each portfolio section.
const INTRO_COMMANDS = [
    'cat welcome.txt',
    'ls ~/skills/',
    'find . -name "*projects*"',
    'ssh ~links/',
]

let _id = 0
const nextId = () => ++_id

export default function App() {
    // phase: 'boot' -> 'intro' -> 'live'
    const [phase, setPhase] = useState('boot')

    // committed history of { id, command, node }
    const [entries, setEntries] = useState([])

    // intro auto-play state
    const [introStep, setIntroStep] = useState(0)

    // command history for ArrowUp/ArrowDown recall
    const [history, setHistory] = useState([])

    const termRef = useRef(null)

    const scrollToBottom = useCallback(() => {
        const el = termRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [entries, phase, introStep, scrollToBottom])

    // Commit a finished command + its output into history.
    const commit = useCallback((command, node) => {
        setEntries((prev) => [...prev, { id: nextId(), command, node }])
    }, [])

    // Handle a command typed by the visitor in the live prompt.
    const handleSubmit = useCallback(
        (raw) => {
            const command = raw
            if (command.trim() !== '') {
                setHistory((h) => [...h, command])
            }
            const result = runCommand(command)
            if (result.type === 'clear') {
                setEntries([])
                return
            }
            commit(command, result.node)
        },
        [commit]
    )

    // Advance the auto-intro once a command line finishes typing.
    const handleIntroDone = useCallback(
        (command) => {
            const result = runCommand(command)
            commit(command, result.type === 'clear' ? null : result.node)
            setIntroStep((s) => s + 1)
        },
        [commit]
    )

    useEffect(() => {
        if (phase === 'intro' && introStep >= INTRO_COMMANDS.length) {
            setPhase('live')
        }
    }, [phase, introStep])

    const introCommand =
        phase === 'intro' && introStep < INTRO_COMMANDS.length
            ? INTRO_COMMANDS[introStep]
            : null

    return (
        <div className="screen">
            <div className="terminal" ref={termRef}>
                <TitleBar />

                {/* 1. Boot logs */}
                {phase === 'boot' && (
                    <BootSequence onComplete={() => setPhase('intro')} />
                )}

                {phase !== 'boot' && (
                    <p className="line muted section-gap">
                        Session ready. Auto-running portfolio walkthrough...
                    </p>
                )}

                {/* 2 & 3. Committed command history (intro + live) */}
                {entries.map((e) => (
                    <div className="block" key={e.id}>
                        <p className="line">
                            <Prompt />
                            <span className="command-text">{e.command}</span>
                        </p>
                        {e.node}
                    </div>
                ))}

                {/* Currently auto-typing intro command */}
                {introCommand && (
                    <div className="block" key={`intro-${introStep}`}>
                        <p className="line">
                            <Prompt />
                            <Typewriter
                                text={introCommand}
                                speed={28}
                                caret
                                className="command-text"
                                onDone={() => handleIntroDone(introCommand)}
                            />
                        </p>
                    </div>
                )}

                {/* 4. Live interactive prompt */}
                {phase === 'live' && (
                    <>
                        <p className="hint">
                            type a command — try: help · ls · find projects · ssh links · clear
                        </p>
                        <InputLine onSubmit={handleSubmit} history={history} />
                    </>
                )}
            </div>
        </div>
    )
}
