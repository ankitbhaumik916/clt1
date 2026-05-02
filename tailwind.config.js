/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          white: 'rgba(255,255,255,0.06)',
          border: 'rgba(255,255,255,0.12)',
          hover: 'rgba(255,255,255,0.10)',
          strong: 'rgba(255,255,255,0.14)',
        },
        teal: {
          bright: '#2dd4bf',
          mid: '#0d9488',
          dim: '#134e4a',
          glow: 'rgba(45,212,191,0.25)',
        },
        bio: {
          green: '#4ade80',
          violet: '#a78bfa',
          amber: '#fbbf24',
        },
        dark: {
          base: '#020c0e',
          surface: '#041214',
          card: '#061a1d',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(45,212,191,0.4), 0 0 30px rgba(45,212,191,0.2)' },
          '50%': { boxShadow: '0 0 8px rgba(45,212,191,0.2), 0 0 20px rgba(45,212,191,0.1)' },
        },
        'blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
}
