import { ErrorBoundary } from './components/ErrorBoundary'
import { Cursor } from './components/ui/Cursor'
import { MarqueeBand } from './components/layout/MarqueeBand'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Resume } from './sections/Resume'
import { Work } from './sections/Work'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis(true)

  return (
    <ErrorBoundary>
      <div className="site-frame">
        <Cursor />
        <Navbar />
        <main id="main">
          <Hero />
          <MarqueeBand />
          <About />
          <Resume />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
