import { Fragment } from 'react'
import { Marquee } from '../motion/Marquee'
import { specialties } from '../../data/skills'

export function MarqueeBand() {
  return (
    <div className="marquee-band mask-x" aria-hidden="true">
      <Marquee speed="slow">
        <div className="marquee-band__item">
          {specialties.map((item) => (
            <Fragment key={item}>
              <span>{item}</span>
              <span className="marquee-band__sep">×</span>
            </Fragment>
          ))}
        </div>
      </Marquee>
    </div>
  )
}
