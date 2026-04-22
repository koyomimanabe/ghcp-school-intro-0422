/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        deco: {
          pink: '#ff3ea5',
          mint: '#6bf2c6',
          lemon: '#fff25a',
          lavender: '#c9a7ff',
          electric: '#2bd9ff',
          ink: '#0c0a1a',
          cream: '#fff7ec',
        },
      },
      fontFamily: {
        comic: ['"Bangers"', '"Comic Sans MS"', '"Zen Maru Gothic"', 'system-ui', 'sans-serif'],
        pop: ['"Rampart One"', '"Zen Maru Gothic"', 'system-ui', 'sans-serif'],
        body: ['"Zen Maru Gothic"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.3)' },
        },
        popin: {
          '0%': { transform: 'scale(0) rotate(-30deg)', opacity: '0' },
          '70%': { transform: 'scale(1.2) rotate(10deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.8s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2.4s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        rainbow: 'rainbow 6s linear infinite',
        sparkle: 'sparkle 1.6s ease-in-out infinite',
        popin: 'popin 0.5s cubic-bezier(.68,-0.55,.27,1.55) forwards',
        shake: 'shake 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
