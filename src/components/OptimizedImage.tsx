import { useEffect, useRef, useState } from 'react'

export interface ResponsiveImageSource {
  src: string
  width: number
}

export interface ResponsiveImage {
  /** JPG fallback for browsers without WebP support */
  fallback: string
  /** WebP variants, ascending by width */
  sources: ResponsiveImageSource[]
}

interface OptimizedImageProps {
  image: ResponsiveImage
  alt: string
  width: number
  height: number
  className?: string
  eager?: boolean
  sizes?: string
}

export function OptimizedImage({ image, alt, width, height, className = '', eager = false, sizes = '100vw' }: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const srcSet = image.sources.map((source) => `${source.src} ${source.width}w`).join(', ')

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  const markLoaded = () => {
    if (!imgRef.current?.complete) return
    setLoaded(true)
  }

  return (
    <span className={`optimized-image ${loaded ? 'is-loaded' : ''} ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <span className="optimized-image__placeholder" aria-hidden="true" />
      <picture>
        {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
        <img
          ref={imgRef}
          src={image.fallback}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          onLoad={markLoaded}
          onError={markLoaded}
        />
      </picture>
    </span>
  )
}
