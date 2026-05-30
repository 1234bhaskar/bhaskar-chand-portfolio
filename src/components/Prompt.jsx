import { promptLabel } from '../data/portfolio.js'

export default function Prompt() {
    return <span className="prompt-label">{promptLabel()} </span>
}
