import { ErrorBoundary } from './components/ErrorBoundary'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Resume } from './sections/Resume'
import { Work } from './sections/Work'

export default function App() {
  return (
    <ErrorBoundary>
      <div className="site-frame">
        <Navbar />
        <main id="main">
          <Hero />
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
