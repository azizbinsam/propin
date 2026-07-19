import { useState } from 'react'

/**
 * Brand logo — image only.
 * Drop your logo file into `public/logo.png` (or `public/logo.svg`).
 * Falls back to a styled "P" mark if the image is missing.
 *
 * Usage:
 *   <Logo />              // default 120px wide, height auto
 *   <Logo size={200} />   // custom width
 */
export default function Logo({
  size = 120,
  className = '',
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={className}>
      {!imgError ? (
        <img
          src="/logo.png"
          alt="PROPIN"
          width={size}
          className="object-contain"
          style={{ width: size, height: 'auto' }}
          onError={() => setImgError(true)}
        />
      ) : (
        // Fallback mark if /public/logo.png hasn't been added yet
        <div
          className="bg-gold-gradient rounded-lg flex items-center justify-center font-serif font-bold text-white"
          style={{ width: size, height: size }}
        >
          <span style={{ fontSize: size * 0.45 }}>P</span>
        </div>
      )}
    </div>
  )
}