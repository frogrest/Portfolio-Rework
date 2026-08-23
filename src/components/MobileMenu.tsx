import { ArrowUpRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'

interface MobileMenuProps {
  open: boolean
  activeSection: string
  onClose: () => void
  items: { id: string; label: string }[]
}

export function MobileMenu({ open, activeSection, onClose, items }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && menuRef.current) {
        const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        const first = focusable[0]
        const last = focusable.at(-1)
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('menu-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('menu-open')
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mobile-menu__top">
            <a className="brand" href="#home" onClick={onClose} aria-label="GCN home">GCN<span>.</span></a>
            <button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close navigation menu"><X size={22} /></button>
          </div>
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {items.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'is-active' : ''}
                onClick={onClose}
              >
                <span className="mono">0{index + 1}</span>
                <span>{item.label}</span>
                {item.id === 'contact' && <ArrowUpRight size={20} aria-hidden="true" />}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
