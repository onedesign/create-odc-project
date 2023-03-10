export default class App {
  static Attributes = {
    MODULE: 'data-module',
    MODULE_OPTIONS: 'data-module-options',
  };

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
    const allElements = this.options.scope.querySelectorAll(
      `[${App.Attributes.MODULE}]`
    );

    allElements.forEach(element => {
      const name = element.getAttribute(App.Attributes.MODULE);

      // Initial modules are already imported and can be initialized now.
      if (this.options.InitialModules[name]) {
        this.initModule(this.options.InitialModules[name], element);

        return;
      }

      // If this module is in the dynamic manifest, import and initialize it.
      if (this.options.DynamicModules.includes(name)) {
        import(`./modules/${name}.js`)
          .then(({ default: Module }) => {
            this.initModule(Module, element);
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error(`Error importing module "${name}"`, { error });
          });

        return;
      }

      // eslint-disable-next-line no-console
      console.error(
        `Module "${name}" is not in the App manifest. Did you forget to add it?`
      );
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

    if (element.hasAttribute(App.Attributes.MODULE_OPTIONS)) {
      const optionString = element.getAttribute(App.Attributes.MODULE_OPTIONS);

      try {
        options = JSON.parse(optionString);
      } catch (error) {
        const name = element.getAttribute(App.Attributes.MODULE);
        // eslint-disable-next-line no-console
        console.error(`Error parsing module options for "${name}"`, {
          error,
          options: optionString,
        });
      }
    }

    return options;
  }
}
