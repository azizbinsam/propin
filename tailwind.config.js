/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF6E9',
          100: '#F5E8C8',
          200: '#EAD49B',
          300: '#DDBD6E',
          400: '#CDA347',
          500: '#C0972F',
          600: '#B08A2E', // primary brand
          700: '#8E6E22',
          800: '#6B531A',
          900: '#493812',
        },
        green: {
          50: '#EAF6EF',
          100: '#CDEBD9',
          300: '#7FC79E',
          600: '#1F8A55', // secondary
          700: '#166B41',
          800: '#0F4D2E',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#FAF9F6',
          100: '#F1EFE9',
          200: '#E4E0D6',
          400: '#9C9587',
          600: '#635C4E',
          800: '#332F26',
          900: '#1E1B15',
        },
        danger: '#C0392B',
        info: '#2E6F9E',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(30,27,21,0.06)',
        goldGlow: '0 4px 12px rgba(176,138,46,0.25)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C0972F 0%, #8E6E22 100%)',
        'green-gradient': 'linear-gradient(135deg, #1F8A55 0%, #0F4D2E 100%)',
      },
    },
  },
  plugins: [],
}