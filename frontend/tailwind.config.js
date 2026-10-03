/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f8faf9',
        brand: {
          DEFAULT: '#17734a',
          hover: '#135f3c',
          light: '#eef7f2',
        },
        'brand-hover': '#135f3c',
        ink: '#13231d',
        muted: '#66736d',
        border: '#e5eae7',
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f4f7f5',
          tint: '#eef7f2',
        },
        // Backwards compatibility tokens
        sage: '#eaf3ed',
        offwhite: '#f8faf9',
        accent: '#f3a54a',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        'card': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(19, 35, 29, 0.04), 0 4px 12px rgba(19, 35, 29, 0.03)',
        card: '0 2px 8px rgba(19, 35, 29, 0.04), 0 12px 24px -4px rgba(19, 35, 29, 0.04)',
        hover: '0 8px 24px -4px rgba(19, 35, 29, 0.08), 0 2px 6px rgba(19, 35, 29, 0.04)',
        modal: '0 20px 48px -8px rgba(19, 35, 29, 0.16)',
        soft: '0 4px 20px rgba(19, 35, 29, 0.05)',
        lift: '0 12px 32px rgba(19, 35, 29, 0.08)',
      },
      maxWidth: {
        content: '1240px',
      },
    },
  },
  plugins: [],
};
