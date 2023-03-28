import 'lazysizes';

import AmbientVideo from './modules/AmbientVideo';
import App from './App';
import Cards from './modules/Cards';
import Navigation from './modules/Navigation';

document.documentElement.classList.remove('no-js');

const InitialModules = { AmbientVideo, Cards, Navigation };

const DynamicModules = [];

// eslint-disable-next-line no-unused-vars
const app = new App({
  DynamicModules,
  InitialModules,
});
