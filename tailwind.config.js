/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{js,jsx,ts,tsx}' // Incluye todos los archivos de React
];
export const theme = {
  extend: {
    colors: {
      colorFooter: '#a493d3',
      colorText: '#c1ff72'
    }
  }
};
export const plugins = [require('@tailwindcss/forms')];
