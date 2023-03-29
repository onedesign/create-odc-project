import * as focusTrap from 'focus-trap';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default class PrimaryNav {
  static defaults = {
    breakpoint: 'MD',
    container: 'primary-nav-container',
    overlay: 'site-overlay',
    trigger: '[data-nav-trigger]',
  };

  constructor(element, options) {
    this.element = element;
    this.options = { ...PrimaryNav.defaults, ...options };
    this.isVisible = false;
    this.mql = window.matchMedia('(min-width: 768px)');
    this.container = document.getElementById(this.options.container);

    if (!this.container) {
      return;
    }

    this.init();
  }

  init() {
    this.createChildren().layout().enable();
  }

  createChildren() {
    this.openTrigger = document.querySelector(this.options.openTrigger);
    this.overlay = document.getElementById(this.options.overlay);
    this.trigger = document.querySelector(this.options.trigger);
    this.openLabel = this.trigger.innerText;
    this.dismissLabel = this.trigger.dataset.navDismissLabel;
    this.focusTrap = focusTrap.createFocusTrap('header');

    return this;
  }

  layout() {
    this.trigger.setAttribute('aria-controls', this.options.container);
    this.trigger.setAttribute('aria-expanded', false);

    return this;
  }

  enable() {
    document.addEventListener('keydown', this.handleKeydown);
    this.trigger.addEventListener('click', this.handleTriggerClick);
    this.mql.addEventListener('change', this.handleMediaQueryChange);

    return this;
  }

  handleKeydown = e => {
    if (e.keyCode === 27) {
      if (!this.isVisible) {
        return;
      }

      this.isOpen = !this.isVisible;
      this.close();
    }
  };

  handleTriggerClick = e => {
    e.preventDefault();
    if (this.isVisible) {
      this.close();
    } else {
      this.open();
    }
  };

  handleMediaQueryChange = () => {
    if (this.mql.matches) {
      this.close();
    }
  };

  open = () => {
    this.isVisible = true;
    disableBodyScroll(this.container);
    this.trigger.setAttribute('aria-expanded', true);
    this.overlay.classList.remove('opacity-0');
    this.overlay.classList.add('opacity-10000');
    this.trigger.innerText = this.dismissLabel;
    this.enterFade(this.container);
    this.focusTrap.activate();
  };

  close = () => {
    this.isVisible = false;
    enableBodyScroll(this.container);
    this.trigger.setAttribute('aria-expanded', false);
    this.trigger.innerText = this.openLabel;
    this.exitFade(this.container);
    this.focusTrap.deactivate();
  };

  afterTransition = element => {
    return new Promise(resolve => {
      const duration =
        Number(getComputedStyle(element).transitionDuration.replace('s', '')) *
        1000;

      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  enterFade = async element => {
    element.classList.remove('hidden');
    element.classList.add('delay-200');
    element.classList.add('duration-700');
    element.classList.add('ease-in-out');
    element.classList.add('transition-opacity');
    element.classList.add('opacity-0');

    await this.getNextFrame();

    element.classList.remove('opacity-0');
    element.classList.add('opacity-100');

    await this.afterTransition(element);

    element.classList.remove('opacity-100');
    element.classList.remove('delay-200');
    element.classList.remove('duration-700');
    element.classList.remove('ease-in-out');
    element.classList.remove('transition-opacity');
  };

  exitFade = async element => {
    element.classList.add('opacity-0');
    element.classList.add('duration-150');
    element.classList.add('ease-in-out');
    element.classList.add('transition-opacity');

    await this.afterTransition(element);

    element.classList.add('hidden');
    this.overlay.classList.remove('opacity-100');
    this.overlay.classList.add('opacity-0');
    element.classList.remove('opacity-0');
    element.classList.remove('duration-150');
    element.classList.remove('ease-in-out');
    element.classList.remove('transition-opacity');
  };

  getNextFrame = () => {
    return new Promise(resolve => {
      requestAnimationFrame(resolve);
    });
  };
}
