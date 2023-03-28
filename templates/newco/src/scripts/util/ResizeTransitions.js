import { MediaQueries } from './MediaQueries';

let resizeTimer;

export const ResizeTransitions = {
  disable(elements, breakpoint = 'MD') {
    MediaQueries[breakpoint].addEventListener('change', () => {
      elements.forEach(element => {
        this.handleDisable(element);
      });

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        elements.forEach(element => {
          this.enable(element);
        });
      }, 250);
    });
  },

  handleDisable(element) {
    element.setAttribute('data-resize-transition', 'disable');
  },

  enable(element) {
    element.removeAttribute('data-resize-transition');
  },
};
