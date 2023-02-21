export default class Goodbye {
  static defaults = {
    name: 'skater',
  };

  constructor(element, options) {
    this.element = element;
    this.options = { ...Goodbye.defaults, ...options };

    this.init();
  }

  init() {
    this.enable();
  }

  enable() {
    this.element.innerText = `Later ${this.options.name}!`;

    return this;
  }
}
