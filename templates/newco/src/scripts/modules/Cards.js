/*
 * See: https://inclusive-components.design/cards/ for why this JS is
 * needed/recommended.
 */
export default class Cards {
  static defaults = {
    card: '[data-card]',
    link: '[data-card-link]',
  };

  constructor(element, options) {
    this.element = element;
    this.options = { ...Cards.defaults, ...options };
    this.clickStart = undefined;

    this.init();
  }

  init() {
    this.createChildren().enable();

    return this;
  }

  createChildren() {
    this.cards = this.element.querySelectorAll(`${this.options.card}`);

    return this;
  }

  enable() {
    this.cards.forEach(card => {
      card.addEventListener('mousedown', this.handleMouseDown);

      card.addEventListener('mouseup', event => {
        this.handleMouseUp(event, card);
      });
    });

    return this;
  }

  handleMouseDown = () => {
    this.clickStart = new Date();
  };

  handleMouseUp = (event, card) => {
    const link = card.querySelector(`${this.options.link}`);
    const upStamp = new Date();
    if (upStamp - this.clickStart < 200) {
      // Avoid double firing click events
      if (link !== event.target) {
        link.click();
      }
    }
  };
}
