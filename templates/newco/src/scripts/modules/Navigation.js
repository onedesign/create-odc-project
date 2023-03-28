import * as focusTrap from 'focus-trap';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { MediaQueries } from '../util/MediaQueries';
import { ResizeTransitions } from '../util/ResizeTransitions';

export default class Navigation {
  static defaults = {
    container: '[data-nav-container]',
    content: '[data-nav-content]',
    trigger: '[data-nav-trigger]',
    animated: false,
    breakpoint: 'MD',
  };

  constructor(element, options) {
    this.element = element;
    this.options = { ...Navigation.defaults, ...options };
    this.isOpen = false;

    this.init();
  }

  init() {
    this.createChildRefs().layout().enable();

    return this;
  }

  createChildRefs() {
    this.container = this.element.querySelector(this.options.container);
    this.content = this.element.querySelector(this.options.content);
    this.trigger = this.element.querySelector(this.options.trigger);
    this.textForShow = this.trigger.getAttribute('data-text-for-show');
    this.textForHide = this.trigger.getAttribute('data-text-for-hide');
    this.focusTrap = focusTrap.createFocusTrap(this.element, {});

    return this;
  }

  enable() {
    this.resetStatus();
    this.trigger.addEventListener('click', this.handleTriggerClick);
    ResizeTransitions.disable([this.container]);

    MediaQueries[this.options.breakpoint].addEventListener('change', () => {
      this.resetStatus();

      if (this.isOpen && MediaQueries.MD.matches) {
        this.close();
      }
    });

    return this;
  }

  layout() {
    this.trigger.setAttribute('aria-label', this.textForShow);

    return this;
  }

  handleKeydown = e => {
    if (e.keyCode === 27) {
      if (!this.isOpen) {
        return;
      }

      this.close();
    }
  };

  handleTriggerClick = e => {
    e.preventDefault();
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  open = () => {
    this.isOpen = true;
    if (this.options.animated) {
      this.container.removeEventListener('transitionend', this.onTransitionEnd);
    }
    this.container.setAttribute('aria-hidden', 'false');
    disableBodyScroll(this.container);
    window.addEventListener('keyup', this.handleKeydown);
    this.trigger.setAttribute('aria-expanded', 'true');
    this.trigger.setAttribute('aria-label', this.textForHide);
    this.focusTrap.activate();
  };

  close = () => {
    this.isOpen = false;
    if (this.options.animated) {
      this.container.addEventListener('transitionend', this.onTransitionEnd);
    } else {
      this.container.setAttribute('aria-hidden', 'true');
    }
    enableBodyScroll(this.container);
    window.removeEventListener('keyup', this.handleKeydown);
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.setAttribute('aria-label', this.textForShow);
    this.focusTrap.deactivate();
  };

  onTransitionEnd = () => {
    this.container.setAttribute('aria-hidden', 'true');
    this.container.removeEventListener('transitionend', this.onTransitionEnd);
  };

  resetStatus = () => {
    if (MediaQueries[this.options.breakpoint].matches) {
      this.container.classList.remove('header-navigation--small-screen');
      this.container.setAttribute('aria-hidden', 'false');
      this.trigger.classList.add('hidden');
      this.trigger.setAttribute('aria-hidden', 'true');
    } else if (!this.isOpen) {
      this.container.classList.add('header-navigation--small-screen');
      this.container.setAttribute('aria-hidden', 'true');
      this.trigger.classList.remove('hidden');
      this.trigger.setAttribute('aria-hidden', 'false');
    }
  };
}
