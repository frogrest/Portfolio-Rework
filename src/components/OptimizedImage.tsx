import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  fallbackSrc?: string
  alt: string
  width: number
  height: number
  className?: string
  eager?: boolean
}

export function OptimizedImage({ src, fallbackSrc, alt, width, height, className = '', eager = false }: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <span className={`optimized-image ${loaded ? 'is-loaded' : ''} ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <span className="optimized-image__placeholder" aria-hidden="true" />
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc)
        }}
      />
    </span>
  )
}
