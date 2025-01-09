import forms from '@tailwindcss/forms';
/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{js,jsx,ts,tsx}' // Incluye todos los archivos de React
];
export const theme = {
  extend: {
    screens: {
      xs: '300px', // Nuevo tamaño personalizado
      '3xl': '1920px' // Tamaño extra grande
    },
    colors: {
      colorFooter: '#8c52ff',
      colorText: '#c1ff72',
      colorBackground: '#d2c4f8',
      colorBackgroundMain: '#d9d9d9',
      colorInput: '#8c52ff'
    },
    maxHeight: {
      '1000px': '1000px'
    },
    keyframes: {
      slide: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(-100%)' }
      }
    },
    animation: {
      slide: 'slide 20s linear infinite'
    }
  },
  variants: {
    extend: {
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
    }
  }
};
export const plugins = [forms];
