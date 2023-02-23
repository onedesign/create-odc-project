export default class App {
  static moduleAttribute = 'data-module';
  static optionsAttribute = 'data-module-options';

  static defaults = {
    DynamicModules: [],
    InitialModules: {},
    scope: document.documentElement,
  };

  /**
   * @param {Object} options
   */
  constructor(options = {}) {
    this.options = { ...App.defaults, ...options };
    this.init();
  }

  /**
   * @returns {App}
   */
  init() {
    this.registerModules();
    return this;
  }

  /**
   * Loop over all elements with a module attribute, get any option values,
   * and initialize each module if it is found in an existing manifest.
   *
   * @returns {void}
   */
  registerModules() {
    const allElements = this.options.scope.querySelectorAll(`[${App.moduleAttribute}]`);

    allElements.forEach((element) => {
      const name = element.getAttribute(App.moduleAttribute);

      // Initial modules are already imported and can be initialized now.
      if (this.options.InitialModules[name]) {
        this.initModule(this.options.InitialModules[name], element);
        return;
      }

      // If this module is in the dynamic manifest, import and initialize it.
      if (this.options.DynamicModules.includes(name)) {
        import(`./modules/${name}`)
          .then(({ default: Module }) => {
            this.initModule(Module, element);
          })
          .catch(error => {
            console.error(`Error importing module "${name}"`, { error });
          });
      }
    });
  }

  /**
   * @param {Function} Constructor
   * @param {Element} element
   * @returns {void}
   */
  initModule(Constructor, element) {
    const options = this.getModuleOptions(element);
    new Constructor(element, options);
  }

  /**
   * @param {Element} element
   * @returns {Object}
   */
  getModuleOptions(element) {
    let options = {};

    if (element.hasAttribute(App.optionsAttribute)) {
      const optionString = element.getAttribute(App.optionsAttribute);

      try {
        options = JSON.parse(optionString);
      } catch (error) {
        const name = element.getAttribute(App.moduleAttribute);
        console.error(`Error parsing module options for "${name}"`, {
          error,
          options: optionString,
        });
      }
    }

    return options;
  }
}
