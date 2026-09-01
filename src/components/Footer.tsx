import { socials } from '../data/socials'

const blogHref = `${import.meta.env.BASE_URL}blog/index.html`

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__grid">
          <div className="site-footer__col">
            <span className="label" style={{ color: 'var(--accent-light)' }}>
              GCN.
            </span>
            <span className="mono footer-uid">Full-stack developer & creative technologist based in the Philippines.</span>
          </div>
          <div className="site-footer__col">
            <span className="label">Navigation</span>
            <a className="site-footer__link" href="#home">Home</a>
            <a className="site-footer__link" href="#about">About</a>
            <a className="site-footer__link" href="#resume">Resume</a>
            <a className="site-footer__link" href="#work">Work</a>
            <a className="site-footer__link" href="#contact">Contact</a>
          </div>
          <div className="site-footer__col">
            <span className="label">Elsewhere</span>
            <a className="site-footer__link" href={socials.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="site-footer__link" href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="site-footer__link" href={socials.email}>{socials.emailAddress}</a>
            <a className="site-footer__link" href={blogHref}>Blog</a>
          </div>
          <div className="site-footer__col">
            <span className="label">Colophon</span>
            <span className="mono footer-uid">Set in Space Grotesk & JetBrains Mono.</span>
            <span className="mono footer-uid">React · Vite · GSAP · Lenis</span>
            <span className="mono footer-uid">&copy; {new Date().getFullYear()} Gian Carlo Noriega</span>
          </div>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">
        GCN
      </div>
    </footer>
  )
}
