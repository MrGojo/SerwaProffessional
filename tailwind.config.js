/** @type {import('tailwindcss').Config} */

// SERWA Professional brand colors:
// Primary: #f5f3f1 (ivory)
// Secondary: #2E2E4A (deep navy — ink, primary buttons after pink↔navy swap)
// Accent: #FF007F (hot pink — highlights, full-bleed panels after swap)
// Gold: #F9DC5C

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SERWA brand palette
        serwa: {
          primary: '#f5f3f1',
          secondary: '#2E2E4A',
          accent: '#FF007F',
          gold: '#F9DC5C',
        },
      },
      fontFamily: {
        serwa: ['Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'], // BIOTOP-inspired elegant typography
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
