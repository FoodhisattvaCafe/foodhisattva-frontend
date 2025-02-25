import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '375px',     // Extra small devices
      'sm': '640px',     // Small devices
      'md': '768px',     // Medium devices
      'lg': '1024px',    // Large devices
      'xl': '1280px',    // Extra large devices
      '2xl': '1536px',   // 2X large devices
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'accent-primary': '#94C973',
        'accent-dark': '#7bab5a',
        'accent-light': '#b6e095',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%', // Ensures typography doesn't have fixed width
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
} satisfies Config;