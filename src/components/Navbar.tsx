import { ArrowUpRight, FileText, Menu } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { MobileMenu } from './MobileMenu'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
  { id: 'blog', label: 'Blog' },
]

const blogHref = `${import.meta.env.BASE_URL}blog/`

export function Navbar() {
  const ids = useMemo(() => navItems.map((item) => item.id).filter((id) => id !== 'blog'), [])
  const activeSection = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#home" aria-label="GCN home">GCN<span>.</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.id === 'blog' ? (
              <a key={item.id} href={blogHref}>{item.label}</a>
            ) : (
              <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'is-active' : ''}>
                {item.label}
                {item.id === 'contact' && <ArrowUpRight size={14} aria-hidden="true" />}
              </a>
            )
          )}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen}>
          <span>MENU</span><Menu size={18} />
        </button>
      </header>
      <MobileMenu open={menuOpen} activeSection={activeSection} onClose={() => setMenuOpen(false)} items={navItems} />
    </>
  )
}
