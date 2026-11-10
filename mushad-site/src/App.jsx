
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Hero from './Hero'
import './App.css'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <>
      <main>
        <Hero />
      </main>
    </>
  )
}

export default App