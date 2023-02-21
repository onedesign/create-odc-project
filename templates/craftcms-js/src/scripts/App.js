import getModuleOptions from './utilities/getModuleOptions';
import ModuleManifest from './ModuleManifest';

export default class App {
  static moduleAttribute = 'data-module';
  static optionsAttribute = 'data-module-options';
  /**
   * @param {HTMLElement} scope
   * @param {Object} config
   * @returns {App}
   */
  constructor(scope = document.documentElement, config = {}) {
    this.config = { ...App.defaults, ...config };
    this.registerModules(scope);

    return this;
  }

  /**
   * Loop over all modules in the defined scope, get any option values,
   * and initialize each module if it exists in the `ModuleManifest` object.
   *
   * @param {HTMLElement} scope
   * @returns void
   */
  registerModules(scope) {
    const modules = scope.querySelectorAll(`[${App.moduleAttribute}]`);

    modules.forEach(module => {
      const name = module.getAttribute(App.moduleAttribute);
      if (!ModuleManifest[name]) {
        return;
      }

      const Constructor = ModuleManifest[name];
      new Constructor(module, getModuleOptions(module));
    });
  }
}
