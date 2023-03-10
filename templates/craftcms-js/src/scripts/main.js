import App from './App';
import Hello from './modules/Hello';

document.documentElement.classList.remove('no-js');

const InitialModules = {
  Hello,
};

const DynamicModules = [
  'Goodbye',
];

// eslint-disable-next-line no-unused-vars
const app = new App({
  DynamicModules,
  InitialModules,
});
