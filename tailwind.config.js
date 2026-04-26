/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cmt: {
          navy:    '#1a2744',
          navyDark:'#111c35',
          navyMid: '#1e2f56',
          gold:    '#c8a45e',
          goldLight:'#e0b96e',
          cream:   '#f8f4ee',
          offwhite:'#fdfaf6',
          gray:    '#5a6475',
          lightgray:'#eef0f4',
          red:     '#e63c3c',
          green:   '#2e7d32',
        }
      },
      fontFamily: {
        heading: ['Roboto', 'system-ui', 'sans-serif'],
        subheading: ['Roboto', 'system-ui', 'sans-serif'],
        body:    ['Roboto', 'system-ui', 'sans-serif'],
        sans:    ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
