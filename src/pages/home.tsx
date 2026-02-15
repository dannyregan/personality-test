
import '../styles/home.css'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Home() {

  return (
    <>
        <Header/>
        <div className="card">
          <p>Blurb about the test.</p>
        </div>
        <nav className='padding'>
          <Link to='/test'>
            <Button variant='light'>Take the test</Button>
          </Link>
        </nav>
    </>
  )
}

export default Home
