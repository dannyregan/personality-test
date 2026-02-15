import witch from '../assets/witch.png'
import fairy from '../assets/fairy.png'

export default function Header() {
    return (
        <>
            <h1>The Character Test</h1>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={witch} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={fairy} className="logo" alt="React logo" />
                </a>
            </div>
      </>
    )
}