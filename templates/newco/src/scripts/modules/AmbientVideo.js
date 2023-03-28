import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class AmbientVideo {
  static defaults = {
    inViewClass: 'in-viewport',
    triggeredClass: 'viewport-triggered',
    controlTargets: '[data-video-control]',
    pauseIcons: '[data-control-pause]',
    playIcons: '[data-control-play]',
    textTargets: '[data-text-target]',
    videoSource: 'data-video-source',
    videoTarget: '[data-video-target]',
  };

  constructor(element, options) {
    this.element = element;
    this.options = { ...AmbientVideo.defaults, ...options };
    this.isPlaying = false;
    this.isFirstEntry = true;
    this.hasIntervention = false;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion)').matches;

    gsap.registerPlugin(ScrollTrigger);

    this.init();
  }

  init() {
    this.createChildRefs().enable();

    return this;
  }

  createChildRefs() {
    this.controlTargets = this.element.querySelectorAll(
      this.options.controlTargets
    );

    this.pauseIcons = this.element.querySelectorAll(this.options.pauseIcons);
    this.playIcons = this.element.querySelectorAll(this.options.playIcons);
    this.textTargets = this.element.querySelectorAll(this.options.textTargets);
    this.videoTarget = this.element.querySelector(this.options.videoTarget);
    this.videoSource = this.videoTarget.dataset.videoSrc;
    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.element,
      onEnter: this.handleViewportEnter,
      onToggle: scrollTrigger => {
        this.handleViewportToggle(scrollTrigger.isActive);
      },
      start: 'top bottom',
      toggleClass: this.options.inViewClass,
    });

    return this;
  }

  enable() {
    this.controlTargets.forEach(element => {
      element.addEventListener('click', this.handleControlClick);
    });
    return this;
  }

  handleControlClick = () => {
    this.hasIntervention = !this.hasIntervention;
    this.toggleVideoState();
  };

  handleViewportEnter = () => {
    this.element.classList.add(this.options.triggeredClass);
    if (this.isFirstEntry) {
      if (this.reduceMotion) {
        this.videoTarget.removeAttribute('autoplay');
        this.swapIconPlay();
      } else {
        this.isPlaying = true;
      }
      this.videoTarget.setAttribute('src', this.videoSource);
      this.isFirstEntry = false;
    }
  };

  handleViewportToggle = isActive => {
    if (this.isFirstEntry) {
      return;
    }

    if (isActive && !this.reduceMotion && !this.hasIntervention) {
      this.play();
    } else {
      this.pause();
    }
  };

  toggleVideoState = () => {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  };

  play = () => {
    this.swapIconPause();
    this.videoTarget.play();
    this.isPlaying = true;
  };

  pause = () => {
    this.swapIconPlay();
    this.videoTarget.pause();
    this.isPlaying = false;
  };

  swapIconPlay = () => {
    this.textTargets.forEach(element => {
      element.innerText = 'Play';
    });

    this.playIcons.forEach(element => {
      element.style.display = 'block';
    });

    this.pauseIcons.forEach(element => {
      element.style.display = 'none';
    });
  };

  swapIconPause = () => {
    this.textTargets.forEach(element => {
      element.innerText = 'Pause';
    });

    this.playIcons.forEach(element => {
      element.style.display = 'none';
    });

    this.pauseIcons.forEach(element => {
      element.style.display = 'block';
    });
  };
}
