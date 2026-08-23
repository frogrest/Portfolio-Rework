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

export function OptimizedImage({ image, alt, width, height, className = '' }: OptimizedImageProps) {
  return (
    <span className={`optimized-image ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <img
        src={image.fallback}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
      />
    </span>
  )
}