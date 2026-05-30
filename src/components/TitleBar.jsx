import { USER, HOST } from '../data/portfolio.js'

export default function TitleBar() {
    return (
        <div className="titlebar" aria-hidden="true">
            <div className="dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
            </div>
            <div className="title">
                {USER}@{HOST}: ~ — bash — 80x24
            </div>
            <div className="meta">tty1</div>
        </div>
    )
}
