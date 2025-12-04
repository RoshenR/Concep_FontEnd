/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    500: '#22d3ee',
                    600: '#0891b2',
                },
            },
            backgroundImage: {
                'grid-slate':
                    'linear-gradient(to right, rgb(30 41 59 / 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgb(30 41 59 / 0.6) 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid-s': '24px 24px',
            },
            boxShadow: {
                'soft':
                    '0 18px 45px rgba(15,23,42,0.9)',
            },
            keyframes: {
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                'fade-in-up': {
                    '0%': { opacity: 0, transform: 'translateY(12px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                'float-slow': 'float 6s ease-in-out infinite',
                'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
            },
        },
    },
    plugins: [],
}
