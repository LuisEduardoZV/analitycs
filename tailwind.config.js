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
      gridTemplateRows: {
        'grid-byCountry': 'min-content 1fr 1fr'
      }
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
          primary: {
            50: "#e3f2fd",
            100: "#bbdefb",
            200: "#90caf9",
            300: "#64b5f6",
            400: "#42a5f5",
            500: "#007BFF",
            600: "#1976d2",
            700: "#1565c0",
            800: "#0d47a1",
            900: "#083175",
            DEFAULT: "#007BFF",
            foreground: "#ffffff"
          },
          primaryDark: '#0056B3',
          secondary: '#20C997',
          secondaryLight: '#D1F5E8',
          text: '#333333',
          textSecondary: '#6C757D',
          divider: '#E9ECEF',
          aquaBlue: {
            50: '#e0f7f7',
            100: '#b3eeee',
            200: '#80e5e5',
            300: '#4ddcdc',
            400: '#26d6d6',
            500: '#00D1D1',
            600: '#00bcbc',
            700: '#00a3a3',
            800: '#008a8a',
            900: '#005e5e',
            textDark: '#003838',
            textLight: '#e0ffff'
          },
          limeGreen: {
            50: '#f3fae6',
            100: '#e3f4c4',
            200: '#d0ee9d',
            300: '#bce776',
            400: '#ace454',
            500: '#A4E534',
            600: '#94d42f',
            700: '#7bbb27',
            800: '#63a31f',
            900: '#458414',
            textDark: '#385d10',
            textLight: '#f4fff0'
          },
          electricPurple: {
            50: '#f7f1ff',
            100: '#eadbff',
            200: '#d9bfff',
            300: '#c8a2ff',
            400: '#b98aff',
            500: '#B482FF',
            600: '#a06de6',
            700: '#8b5bcc',
            800: '#764ab3',
            900: '#5a3d8a',
            textDark: '#4a2571',
            textLight: '#f8f0ff'
          },
          softCoral: {
            50: '#fff0ed',
            100: '#ffdad6',
            200: '#ffb9b0',
            300: '#ff998b',
            400: '#ff7f72',
            500: '#ff6559',
            600: '#ff4a3f',
            700: '#e13b34',
            800: '#c22c29',
            900: '#9e1f1d',
            textDark: '#7a1210',
            textLight: '#ffeae8'
          },
          warmYellow: {
            50: '#fffaf0',
            100: '#fff3d6',
            200: '#ffe9a8',
            300: '#ffe079',
            400: '#ffd659',
            500: '#FFC94A',
            600: '#e6b240',
            700: '#cc9a35',
            800: '#b2842a',
            900: '#8a651e',
            textDark: '#7a5d1c',
            textLight: '#fffae6'
          },
          deepIndigo: {
            50: '#f0ebf7',
            100: '#dbcef0',
            200: '#b59de6',
            300: '#8f6cdb',
            400: '#7a4fcd',
            500: '#5A3D8A',
            600: '#4b3373',
            700: '#3c295d',
            800: '#2d1e46',
            900: '#1f1430',
            textDark: '#140f21',
            textLight: '#f0ebff'
          },
          blushPink: {
            50: '#ffeaf0',
            100: '#ffd3e0',
            200: '#ffa9c3',
            300: '#ff7fa6',
            400: '#ff6290',
            500: '#FF9BBA',
            600: '#e55c83',
            700: '#c3466d',
            800: '#9f3057',
            900: '#7c1a40',
            textDark: '#621330',
            textLight: '#ffe0eb'
          }
        }
      }
    }
  })],
}
