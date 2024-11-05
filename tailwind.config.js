import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    defaultTheme: 'light',
    themes: {
      dark: {
        colors: {
            background: '#1C1F23',
            primaryLight: '#337FCC',
            primary: '#4DABF7',
            primaryDark: '#1A5B92',
            secondary: '#29D19C',
            secondaryLight: '#235D49',
            text: '#E4E6EB',
            textSecondary: '#A4A9AF',
            divider: '#3A3D42'
        }
      },
      light: {
        colors: {
          background: '#F8F9FA',
          primaryLight: '#E0F2FF',
          primary: '#007BFF',
          primaryDark: '#0056B3',
          secondary: '#20C997',
          secondaryLight: '#D1F5E8',
          text: '#333333',
          textSecondary: '#6C757D',
          divider: '#E9ECEF'
        }
      }
    }
  })],
}
