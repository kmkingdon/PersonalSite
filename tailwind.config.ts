import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 1)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity:'0' },
          '100%': { opacity:'1' },
        }
      },
      
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
export default config
