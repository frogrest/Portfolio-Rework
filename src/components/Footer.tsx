import { socials } from '../data/socials'

const blogHref = `${import.meta.env.BASE_URL}blog/`

export function Footer() {
  return (
    <footer className="footer shell">
      <div>
        <a className="brand" href="#home" aria-label="GCN home">GCN<span>.</span></a>
        <p>Creative Developer & Software Engineer</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href={socials.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={socials.email}>Email</a>
        <a href={blogHref}>Blog</a>
      </nav>
      <div className="footer__meta">
        <span>© {new Date().getFullYear()} Gian Carlo Noriega</span>
        <span>Built with React + TypeScript</span>
      </div>
    </footer>
  )
}
