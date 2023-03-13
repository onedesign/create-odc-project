/** @type {import('tailwindcss').Config} */
const fontFamily = require('./theme/fontFamily');
const plugins = require('./theme/config/plugins');

module.exports = {
  content: ['./app/templates/**/*.{html,twig}', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily,
    },
  },
  plugins,
};
