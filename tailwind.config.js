/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#8B5CF6',
                    dark: '#6B46C1',
                    light: '#d8b4fe',
                },
                background: {
                    light: '#FEFCF9',
                    dark: '#1F2937',
                    night: '#0F172A',
                },
                card: {
                    light: '#FFFFFF',
                    dark: '#374151',
                    night: '#1E293B',
                },
                surface: {
                    light: '#f9fafb',
                    dark: '#2d2438',
                },
                success: '#10B981',
                error: '#EF4444',
                warning: '#F59E0B',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                xl: '16px',
                '2xl': '24px',
            },
            animation: {
                'slide-up': 'slideUp 0.3s ease-out',
                'fade-in': 'fadeIn 0.2s ease-in',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'bounce-in': 'bounceIn 0.5s ease-out',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0)' },
                    '50%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
            boxShadow: {
                soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                glow: '0 0 15px rgba(139, 92, 246, 0.3)',
                modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
            backgroundImage: {
                'grid-pattern': 'radial-gradient(#e5e7eb 1px, transparent 1px)',
                'grid-pattern-dark': 'radial-gradient(#3a3045 1px, transparent 1px)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
