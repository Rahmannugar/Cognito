/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4F46E5',
                    dark: '#3730A3',
                    light: '#A5B4FC',
                },
                background: {
                    light: '#F8FAFC',
                    dark: '#0F172A',
                    night: '#020617',
                },
                card: {
                    light: '#FFFFFF',
                    dark: '#1E293B',
                    night: '#0F172A',
                },
                surface: {
                    light: '#f9fafb',
                    dark: '#1e1b4b',
                },
                success: '#10B981',
                error: '#EF4444',
                warning: '#F59E0B',
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                xl: '16px',
                '2xl': '24px',
                '3xl': '32px',
            },
            animation: {
                'slide-up': 'slideUp 0.3s ease-out',
                'fade-in': 'fadeIn 0.2s ease-in',
                'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
                'bounce-in': 'bounceIn 0.5s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'gradient-x': 'gradientX 15s ease infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
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
                    '0%, 100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(79, 70, 229, 0.8)' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0)' },
                    '50%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            boxShadow: {
                soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                glow: '0 0 15px rgba(79, 70, 229, 0.3)',
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
