/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── NEXORA Official Palette ────────────────────────────────────────
        nexora: {
          black:    '#0B0B0B',
          crimson:  '#8B0D1A',
          offwhite: '#F5F2ED',
        },
        // ── Surface Tiers (black-based depth) ─────────────────────────────
        background: {
          DEFAULT:   '#0B0B0B',
          secondary: '#0D0D0D',
          tertiary:  '#101010',
        },
        surface: {
          100: '#0B0B0B',
          200: '#0E0E0E',
          300: '#111111',
          400: '#141414',
        },
        // ── Border System ──────────────────────────────────────────────────
        border: {
          subtle:  'rgba(245, 242, 237, 0.06)',
          DEFAULT: 'rgba(245, 242, 237, 0.10)',
          hover:   'rgba(245, 242, 237, 0.18)',
          crimson: 'rgba(139, 13, 26, 0.35)',
        },
        // ── Text Hierarchy ─────────────────────────────────────────────────
        text: {
          primary:   '#F5F2ED',
          secondary: 'rgba(245, 242, 237, 0.70)',
          muted:     'rgba(245, 242, 237, 0.45)',
          dark:      '#0B0B0B',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
      },
      boxShadow: {
        // Crimson glow tiers
        'glow-crimson':      '0 0 25px -5px rgba(139, 13, 26, 0.35)',
        'glow-crimson-soft': '0 0 20px -8px rgba(139, 13, 26, 0.20)',
        'glow-crimson-hard': '0 0 30px -3px rgba(139, 13, 26, 0.50)',
        // Surface shadows (black-based)
        'surface-flat':      '0 4px 20px -2px rgba(0, 0, 0, 0.8)',
        'glass':             '0 8px 32px 0 rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'crimson-ping': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
