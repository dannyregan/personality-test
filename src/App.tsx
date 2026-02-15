import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Test from './pages/test'
import About from './pages/about'
import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/test' element={<Test />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
