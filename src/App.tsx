import { Suspense } from 'react'
import { WarpBackground } from './components/canvas/WarpBackground'
import { Navbar } from './components/ui/Navbar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Achievements } from './components/sections/Achievements'
import { Contact } from './components/sections/Contact'
import './index.css'

function App() {
  return (
    <>
      <WarpBackground />
      <div className="relative z-10 w-full overflow-x-hidden">
        <Navbar />
        <main className="w-full">
          <Suspense fallback={<div />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<div />}>
            <About />
          </Suspense>
          <Suspense fallback={<div />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<div />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<div />}>
            <Achievements />
          </Suspense>
          <Suspense fallback={<div />}>
            <Contact />
          </Suspense>
        </main>
      </div>
    </>
  )
}

export default App
