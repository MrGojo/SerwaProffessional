/**
 * Subtle decorative hair + molecule artwork for empty section space.
 * Single PNG instances in corners — never a full-page tile.
 */

const TEXTURES = {
  light: '/images/textures/flowy-hair-accent-pink.png',
  pink: '/images/textures/flowy-hair-bg-ivory.png',
} as const

type Variant = keyof typeof TEXTURES

type Corner =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'center-right'
  | 'center-left'

const cornerStyles: Record<Corner, string> = {
  'top-right':
    'right-[-3%] top-[4%] w-[38%] max-w-[360px] rotate-[8deg]',
  'top-left':
    'left-[-4%] top-[10%] w-[32%] max-w-[300px] -rotate-[6deg] scale-x-[-1]',
  'bottom-right':
    'right-[-2%] bottom-[2%] w-[34%] max-w-[320px] rotate-[-4deg]',
  'bottom-left':
    'left-[-5%] bottom-[6%] w-[36%] max-w-[340px] -rotate-[3deg] scale-x-[-1]',
  'center-right':
    'right-[-6%] top-[38%] w-[30%] max-w-[280px] rotate-[14deg]',
  'center-left':
    'left-[-7%] top-[32%] w-[28%] max-w-[260px] -rotate-[10deg] scale-x-[-1]',
}

interface TextureAccentsProps {
  /** Pink artwork on ivory sections, or ivory artwork on pink sections */
  variant?: Variant
  /** 1–2 corners per section — keeps empty space feeling natural, not tiled */
  corners?: Corner[]
  /** Slightly stronger on large empty sections (default subtle) */
  intensity?: 'subtle' | 'soft'
  className?: string
}

export default function TextureAccents({
  variant = 'light',
  corners = ['top-right'],
  intensity = 'subtle',
  className = '',
}: TextureAccentsProps) {
  const opacity = intensity === 'soft' ? 'opacity-[0.07]' : 'opacity-[0.055]'
  const blend = variant === 'light' ? 'mix-blend-multiply' : 'mix-blend-soft-light'

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}
      aria-hidden
    >
      {corners.map(corner => (
        <img
          key={corner}
          src={TEXTURES[variant]}
          alt=""
          draggable={false}
          className={`absolute hidden md:block object-contain select-none ${opacity} ${blend} ${cornerStyles[corner]}`}
        />
      ))}
    </div>
  )
}
