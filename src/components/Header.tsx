import witch from '../assets/witch.png'
import fairy from '../assets/fairy.png'
import Menu from './Menu'

export default function Header() {
    return (
        <>
            <Menu />
            <h1>The Character Test</h1>
            <div>
                <img src={witch} className="logo" alt="Vite logo" />

                <img src={fairy} className="logo" alt="React logo" />

            </div>
      </>
    )
}