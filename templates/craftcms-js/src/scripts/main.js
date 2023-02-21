import App from './App';
import getModuleOptions from './utilities/getModuleOptions';

document.documentElement.classList.remove('no-js');

// eslint-disable-next-line no-unused-vars
const app = new App();

// Goodbyes
const goodbyes = document.querySelectorAll('[data-module="Goodbye"]');

if (goodbyes.length) {
  import('./modules/Goodbye')
    .then(({ default: Goodbye }) => {
      goodbyes.forEach(element => {
        new Goodbye(element, getModuleOptions(element));
      });
    })
    // eslint-disable-next-line no-console
    .catch(console.error);
}
