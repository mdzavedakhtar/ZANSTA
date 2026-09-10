/**
 * ZANSTA Centralized Design Tokens
 * Official Palette: Black · Crimson · Off-White
 */

export const colors = {
  // ── Core Identity ──────────────────────────────────────────────────────
  nexora: {
    black:    '#0B0B0B',
    crimson:  '#8B0D1A',
    offwhite: '#F5F2ED',
  },

  // ── Surface Tiers (opacity-only depth, not new colors) ─────────────────
  background: {
    main:      '#0B0B0B',
    secondary: '#0D0D0D',
    tertiary:  '#101010',
  },
  surface: {
    s100: '#0B0B0B',
    s200: '#0E0E0E',
    s300: '#111111',
    s400: '#141414',
  },

  // ── Border System ────────────────────────────────────────────────────────
  border: {
    subtle:  'rgba(245, 242, 237, 0.06)',
    default: 'rgba(245, 242, 237, 0.10)',
    hover:   'rgba(245, 242, 237, 0.18)',
    crimson: 'rgba(139, 13, 26, 0.35)',
  },

  // ── Off-White Text Hierarchy ─────────────────────────────────────────────
  text: {
    primary:   '#F5F2ED',
    secondary: 'rgba(245, 242, 237, 0.70)',
    muted:     'rgba(245, 242, 237, 0.45)',
    dark:      '#0B0B0B',
  },

  // ── Crimson Glow System ──────────────────────────────────────────────────
  glow: {
    soft:   'rgba(139, 13, 26, 0.20)',
    mid:    'rgba(139, 13, 26, 0.35)',
    strong: 'rgba(139, 13, 26, 0.55)',
  },
} as const;

export const spacing = {
  unit: 8,
  xs:   '4px',
  sm:   '8px',
  md:   '16px',
  lg:   '24px',
  xl:   '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

export const animation = {
  fast:   0.15,
  normal: 0.3,
  slow:   0.6,
  stagger: 0.08,
  ease: [0.16, 1, 0.3, 1], // Custom smooth ease-out curve
} as const;
