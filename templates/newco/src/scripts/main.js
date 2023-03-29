import 'lazysizes';

import AmbientVideo from './modules/AmbientVideo';
import App from './App';
import Cards from './modules/Cards';

document.documentElement.classList.remove('no-js');

const InitialModules = { AmbientVideo, Cards };

const DynamicModules = ['Navigation'];

// eslint-disable-next-line no-unused-vars
const app = new App({
  DynamicModules,
  InitialModules,
});
