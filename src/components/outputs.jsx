import { welcome, skills, projects, links } from '../data/portfolio.js'

// --- cat welcome.txt ---
export function WelcomeOutput() {
    return (
        <div className="output">
            <p className="line bright">{welcome.bio}</p>
            <p className="line muted">{welcome.detail}</p>
        </div>
    )
}

// --- ls ~/skills/ ---
export function SkillsOutput() {
    return (
        <div className="output">
            <p className="line muted">total {skills.length} modules</p>
            <div className="skills-grid">
                {skills.map((s) => (
                    <span className="skill-item" key={s}>
                        {s}
                    </span>
                ))}
            </div>
        </div>
    )
}

// --- find . -name "*projects*" ---
export function ProjectsOutput() {
    return (
        <div className="output">
            {projects.map((p) => (
                <div className="project" key={p.name}>
                    <p className="line project-head">
                        <span className="project-perms">{p.permissions}</span>
                        <span className="project-name">./projects/{p.name}</span>
                        <span className="muted">  {p.size}</span>
                    </p>
                    <p className="line project-desc">
                        <span className="bright">{p.title}</span> — {p.description}
                    </p>
                    <p className="line project-stack">
                        stack: [{p.stack.join(', ')}]
                    </p>
                </div>
            ))}
        </div>
    )
}

// --- ssh ~links/ ---
export function LinksOutput() {
    return (
        <div className="output">
            <p className="line muted">Authenticating channels ... 3 endpoints found</p>
            {links.map((l) => (
                <span className="link-row" key={l.key}>
                    <span className="link-key">{l.label}</span>
                    <a
                        href={l.url}
                        target={l.key === 'email' ? undefined : '_blank'}
                        rel="noopener noreferrer"
                    >
                        {l.handle}
                    </a>
                </span>
            ))}
        </div>
    )
}

// --- help ---
const HELP = [
    ['help', 'show this list of available commands'],
    ['cat welcome.txt', 'print bio / profile'],
    ['ls', 'list the tech stack (skills)'],
    ['find projects', 'list featured projects'],
    ['ssh links', 'show contact links'],
    ['whoami', 'print current user'],
    ['date', 'print current system date'],
    ['banner', 'reprint the welcome banner'],
    ['clear', 'clear the terminal screen'],
]

export function HelpOutput() {
    return (
        <div className="output">
            <p className="line muted">Available commands:</p>
            {HELP.map(([cmd, desc]) => (
                <p className="line" key={cmd}>
                    <span className="help-cmd">{cmd}</span>
                    <span className="muted">{desc}</span>
                </p>
            ))}
        </div>
    )
}

export function TextOutput({ text, variant = '' }) {
    return (
        <div className="output">
            <p className={`line ${variant}`}>{text}</p>
        </div>
    )
}
