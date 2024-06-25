import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      gridTemplateColumns: {
        responsive: 'repeat(auto-fit, minmax(250px, 1fr))',
        rates: 'repeat(2, 1fr)'
      },
      keyframes: {
        appear: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'appear-fast': 'appear 175ms'
      },
      boxShadow: {
        sm: 'inset 0 0px 5px 0 rgba(0, 0, 0, .5),inset 0 0px 10px 0 rgba(0, 0, 0, .5)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.07)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)'
        // inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        // none: 'none',
        // buttonPrimary: '0 0 2px #a16f4e, 0 0 5px #a16f4e, 0 0 10px #a16f4e, 0 0 20px #a16f4e',
        // buttonSecondary: '0 0 2px #351f14, 0 0 5px #351f14, 0 0 10px #351f14, 0 0 20px #351f14'
        // dropDown: ' 0px 20px 40px 0px #0002',
        // wppButton: '0px 5px 40px 0px #42ca19',
        // contactButton: '0px 5px 40px 0px #0c71c3'
      }
    }
  },
  plugins: []
}
export default config
