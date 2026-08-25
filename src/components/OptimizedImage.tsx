export interface ResponsiveImageSource {
  src: string
  width: number
}

export interface ResponsiveImage {
  fallback: string
  sources: ResponsiveImageSource[]
}

interface OptimizedImageProps {
  image: ResponsiveImage
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
}

export function OptimizedImage({ image, alt, width, height, className = '', sizes }: OptimizedImageProps) {
  const srcSet = image.sources.length > 0
    ? image.sources.map((source) => `${source.src} ${source.width}w`).join(', ')
    : undefined

  return (
    <span className={`optimized-image ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <img
        src={image.fallback}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
      />
    </span>
  )
}