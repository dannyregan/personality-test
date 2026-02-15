import '../styles/home.css'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function Home() {
  return (
    <>
      <Header/>
      <div className="card">
        <p>This is the test page.</p>
      </div>
      <nav>
          <Link to='/'>
            <Button variant='dark'>Go Back</Button>
          </Link>
      </nav>
    </>
  )
}

export default Home
