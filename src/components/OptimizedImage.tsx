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
  const srcSet = image.sources.map((source) => `${source.src} ${source.width}w`).join(', ')

  return (
    <span className={`optimized-image ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <picture>
        {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
        <img
          src={image.fallback}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
        />
      </picture>
    </span>
  )
}
