/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bugs: {
          orange: '#F7941D',
          'orange-dark': '#D97D0C',
          black: '#0A0A0A',
          white: '#FFFFFF',
          yellow: '#FFC709',
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Arial Black"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        hard: '4px 4px 0 0 #0A0A0A',
        'hard-lg': '8px 8px 0 0 #0A0A0A',
      },
    },
  },
  plugins: [],
}
