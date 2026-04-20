export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FAFAF8',
        surface: '#FFFFFF',
        ink: '#1A1A1A',
        muted: '#6B6B68',
        subtle: '#8A8A87',
        border: '#E5E4E0',
        'border-dark': '#D1D0CC',
        space: { DEFAULT: '#3C5488', light: '#E8EDF5', mid: '#8491B4' },
        deepsea: { DEFAULT: '#4DBBD5', light: '#E4F5F9', mid: '#91D1C2' },
        polar: { DEFAULT: '#00A087', light: '#E0F5F0', mid: '#7DCDB8' },
        bio: { DEFAULT: '#E64B35', light: '#FDEEEB', mid: '#F39B7F' },
        accent: '#F39B7F',
        danger: '#DC0000',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"Source Han Sans SC"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
