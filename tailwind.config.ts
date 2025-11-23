import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Ocean Dark Mode Palette
        'navy-dark': '#0F0E28',      // Background - Main canvas
        'blue-deep': '#203F8D',      // Surface/Cards - Component background
        'teal-primary': '#3AAC95',   // Primary Action - Buttons, Active States, "Ava is talking"
        'white-pure': '#FFFFFF',     // Text - Pure White
        'red-alert': '#C71F46',      // Alerts - Failed calls
      },
      fontFamily: {
        // Headers: Bold, geometric
        'header': ['Garet', 'Montserrat', 'sans-serif'],
        // Data/Metrics: Sensor Spec Sheet aesthetic
        'data': ['DIN Next Condensed', 'Oswald', 'sans-serif'],
        // Body/Transcripts: High readability
        'body': ['Verdana', 'Open Sans', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
export default config

