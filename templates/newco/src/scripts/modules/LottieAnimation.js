import bodymovin from 'lottie-web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MediaQueries } from '../util/MediaQueries';
gsap.registerPlugin(ScrollTrigger);

export default class LottieAnimation {
  static defaults = {
    animationPath: undefined,
    start: 'top 75%',
    end: 'bottom 25%',
    freezeFrame: 0,
  };

  constructor(element, options) {
    this.element = element;
    this.options = { ...LottieAnimation.defaults, ...options };

    this.init().enable();
  }

  init() {
    this.anim = bodymovin.loadAnimation({
      container: this.element,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: this.options.animationPath,
    });

    return this;
  }

  enable() {
    this.anim.addEventListener('data_ready', () => {
      // If prefers reduced motion is enabled, just go to the first, or specified frame and pause
      if (MediaQueries.MOTION_QUERY.matches) {
        this.anim.goToAndStop(parseInt(this.options.freezeFrame), true);
      } else {
        this.createScrollTrigger();
      }

      this.element.classList.remove('opacity-0');
    });

    return this;
  }

  createScrollTrigger() {
    this.timeline = new gsap.core.Timeline({
      scrollTrigger: {
        trigger: this.element,
        start: this.options.start,
        end: this.options.end,
        onEnter: () => {
          this.anim.play();
        },
        onEnterBack: () => {
          this.anim.play();
        },
        onLeave: () => {
          this.anim.pause();
        },
        onLeaveBack: () => {
          this.anim.pause();
        },
      },
    });
  }
}
