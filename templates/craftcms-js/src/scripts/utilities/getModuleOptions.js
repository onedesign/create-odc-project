const CONFIG = {
  moduleAttribute: 'data-module',
  optionsAttribute: 'data-module-options',
};

/**
 * @param {Element} module
 * @returns {Object}
 */
function getModuleOptions(module) {
  let options = {};

  if (module.hasAttribute(CONFIG.optionsAttribute)) {
    const optionString = module.getAttribute(CONFIG.optionsAttribute);

    try {
      options = JSON.parse(optionString);
    } catch (error) {
      const name = module.getAttribute(CONFIG.moduleAttribute);
      // eslint-disable-next-line no-console
      console.error(`Error parsing module options for "${name}"`, {
        error,
        options: optionString,
      });
    }
  }

  return options;
}

export default getModuleOptions;
