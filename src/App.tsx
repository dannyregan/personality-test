import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Test from './pages/test'
import About from './pages/about'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/test' element={<Test />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
