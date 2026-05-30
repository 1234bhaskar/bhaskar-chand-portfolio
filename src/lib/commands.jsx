import {
    WelcomeOutput,
    SkillsOutput,
    ProjectsOutput,
    LinksOutput,
    HelpOutput,
    TextOutput,
} from '../components/outputs.jsx'
import { welcome } from '../data/portfolio.js'

/**
 * Resolve a raw command string into an action.
 * Returns one of:
 *   { type: 'clear' }
 *   { type: 'render', node: <ReactNode> }
 * Matching is intentionally forgiving so visitors can discover content.
 */
export function runCommand(raw) {
    const input = raw.trim()
    const lower = input.toLowerCase()

    if (lower === 'clear' || lower === 'cls') {
        return { type: 'clear' }
    }

    if (lower === 'help' || lower === '?' || lower === 'man') {
        return { type: 'render', node: <HelpOutput /> }
    }

    // Profile: cat welcome.txt (and friendly variants)
    if (
        lower === 'cat welcome.txt' ||
        lower === 'cat welcome' ||
        lower === 'welcome' ||
        lower === 'about' ||
        lower === 'cat about' ||
        lower === 'whoami -a'
    ) {
        return { type: 'render', node: <WelcomeOutput /> }
    }

    // Skills: ls ~/skills/  (also bare `ls`)
    if (
        lower === 'ls' ||
        lower === 'ls -l' ||
        lower === 'ls ~/skills/' ||
        lower === 'ls ~/skills' ||
        lower === 'ls skills' ||
        lower === 'skills' ||
        lower === 'dir'
    ) {
        return { type: 'render', node: <SkillsOutput /> }
    }

    // Projects: find . -name "*projects*"
    if (
        lower.startsWith('find') ||
        lower === 'projects' ||
        lower === 'ls projects' ||
        lower === 'cat projects'
    ) {
        return { type: 'render', node: <ProjectsOutput /> }
    }

    // Links: ssh ~links/
    if (
        lower.startsWith('ssh') ||
        lower === 'links' ||
        lower === 'contact' ||
        lower === 'cat links'
    ) {
        return { type: 'render', node: <LinksOutput /> }
    }

    if (lower === 'whoami') {
        return { type: 'render', node: <TextOutput text="sde1" /> }
    }

    if (lower === 'banner') {
        return {
            type: 'render',
            node: <TextOutput text={welcome.bio} variant="bright" />,
        }
    }

    if (lower === 'date') {
        return {
            type: 'render',
            node: <TextOutput text={new Date().toString()} variant="muted" />,
        }
    }

    if (lower === 'echo' || lower.startsWith('echo ')) {
        return { type: 'render', node: <TextOutput text={input.slice(5)} /> }
    }

    if (lower === 'pwd') {
        return { type: 'render', node: <TextOutput text="/home/sde1" variant="muted" /> }
    }

    if (lower === '') {
        return { type: 'render', node: null }
    }

    // Unknown command
    const cmdName = input.split(' ')[0]
    return {
        type: 'render',
        node: (
            <TextOutput
                text={`command not found: ${cmdName}  —  type 'help' for a list of commands.`}
                variant="error"
            />
        ),
    }
}
