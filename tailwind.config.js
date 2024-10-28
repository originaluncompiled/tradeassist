/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Green
        green: {
          1: '#CEFCE4',
          2: '#A2F1C9',
          3: '#85D78C',
          4: '#67BC4E',
          5: '#4E9A44',
          6: '#357739',
        },
        // Accent colors
        accent: {
          green: '#32922A',
          red: '#C7221E',
        },
        // light: {
        //
        // },
        // Dark mode neutral scale
        dark: {
          1: '#FFFBF0',
          2: '#DBDAD8',
          3: '#AAAAAA',
          4: '#717273',
          5: '#545657',
          6: '#373A3B',
          7: '#282B2C',
          8: '#1C1C1C',
        }
      }
    },
  },
  plugins: [],
};