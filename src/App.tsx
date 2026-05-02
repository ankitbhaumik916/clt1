import { Suspense, lazy } from 'react'
import { Navbar } from './components/ui/Navbar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Achievements } from './components/sections/Achievements'
import { Contact } from './components/sections/Contact'
import './index.css'

const WarpBackground = lazy(() =>
  import('./components/canvas/WarpBackground').then((m) => ({
    default: m.WarpBackground,
  }))
)

function App() {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#020c0e]" />}>
        <WarpBackground />
      </Suspense>
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
