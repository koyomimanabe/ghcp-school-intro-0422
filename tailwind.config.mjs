/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'hot-pink': '#FF69B4',
        'electric-blue': '#00FFFF',
        'lime-green': '#39FF14',
        'neon-yellow': '#FFF01F',
        'vivid-purple': '#BF5FFF',
      },
      boxShadow: {
        'neon-pink': '0 0 5px #FF69B4, 0 0 20px #FF69B4, 0 0 60px #FF69B4',
        'neon-blue': '0 0 5px #00FFFF, 0 0 20px #00FFFF, 0 0 60px #00FFFF',
        'neon-green': '0 0 5px #39FF14, 0 0 20px #39FF14, 0 0 60px #39FF14',
        'neon-yellow': '0 0 5px #FFF01F, 0 0 20px #FFF01F, 0 0 60px #FFF01F',
        'neon-purple': '0 0 5px #BF5FFF, 0 0 20px #BF5FFF, 0 0 60px #BF5FFF',
      },
      backgroundImage: {
        'rainbow-gradient': 'linear-gradient(135deg, #FF69B4, #00FFFF, #39FF14, #FFF01F, #BF5FFF)',
        'harajuku-gradient': 'linear-gradient(135deg, #FF69B4 0%, #BF5FFF 25%, #00FFFF 50%, #39FF14 75%, #FFF01F 100%)',
      },
      fontFamily: {
        gothic: ['"DotGothic16"', 'monospace'],
        noto: ['"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-fast': 'pulse 0.8s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(3px, -3px)' },
          '60%': { transform: 'translate(-3px, -3px)' },
          '80%': { transform: 'translate(3px, 3px)' },
        },
      },
    },
  },
  plugins: [],
};
