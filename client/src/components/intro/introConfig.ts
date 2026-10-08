export const INTRO_CONFIG = {
  totalDuration: 1.0, // Snappy 1.0s entrance for high-speed hero loading
  timeline: {
    darkAmbientEnd:      0.15,
    particleFormationEnd: 0.4,
    coreIlluminatedEnd:  0.65,
    logoRevealEnd:       0.8,
    taglineRevealEnd:    0.9,
    exitExpansionStart:  0.9,
    completeEnd:         1.0,
  },
  // ── ZANSTA Official Color Identity ─────────────────────────────────────
  colors: {
    baseBg:         '#0B0B0B',
    crimsonAccent:  '#8B0D1A',   // primary brand accent
    offwhiteAccent: '#F5F2ED',   // logo, tagline, highlight particles
    darkSurface:    '#0E0E0E',
  },
  mobileParticleCount:  150,
  desktopParticleCount: 220,
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
