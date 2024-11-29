/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{js,jsx,ts,tsx}' // Incluye todos los archivos de React
];
export const theme = {
  extend: {
    colors: {
      colorFooter: '#8c52ff',
      colorText: '#c1ff72',
      colorBackground: '#d2c4f8',
      colorBackgroundMain: '#d9d9d9'
    }
  }
};
export const plugins = [require('@tailwindcss/forms')];
