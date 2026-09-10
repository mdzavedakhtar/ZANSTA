export const INTRO_CONFIG = {
  totalDuration: 4.0, // seconds for initial intro
  timeline: {
    darkAmbientEnd:      0.5,
    particleFormationEnd: 1.3,
    coreIlluminatedEnd:  2.0,
    logoRevealEnd:       2.6,
    taglineRevealEnd:    3.2,
    exitExpansionStart:  3.2,
    completeEnd:         4.0,
  },
  // ── NEXORA Official Color Identity ─────────────────────────────────────
  colors: {
    baseBg:         '#0B0B0B',
    crimsonAccent:  '#8B0D1A',   // primary brand accent
    offwhiteAccent: '#F5F2ED',   // logo, tagline, highlight particles
    darkSurface:    '#0E0E0E',
  },
  mobileParticleCount:  120,
  desktopParticleCount: 350,
  // Section spatial camera Z-depth mapping
  sectionDepths: {
    hero:      5,
    statement: 0,
    problem:  -5,
    workflow: -10,
    features: -15,
    team:     -20,
    projects: -25,
    demo:     -30,
    vision:   -35,
    cta:      -40,
  }
};
