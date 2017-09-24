/* flow */
import EventEmitter from "events";

/**
 * Class representing Component
 *
 * @class Component
 * @extends EventEmitter
 * @param {Object} [settings={}] - user settings
 */
export class Component extends EventEmitter {
  /**
   * Default settings
   *
   * @member {Object} defaultSettings
   * @memberof Component
   * @static
   * @public
   */
  static defaultSettings = {};

  /**
   * Package version
   *
   * @member {String} version
   * @memberof Component
   * @static
   * @public
   */
  static version = VERSION;

  /**
   * Component DOMElement references placeholder
   *
   * @member {Object} el
   * @memberof Component
   * @private
   * @instance
   */
  el = {};

  /**
   * Gets component DOMElement reference
   *
   * @member {DOMElement}
   * @memberof Component
   * @readonly
   * @instance
   * @throws {ReferenceError} Element with such "id" attribute must exist in the document.
   */
  get component() {
    const component =
      this.el.component ||
      (this.el.component = document.getElementById(this.config.componentId));

    if (component) {
      return component;
    }

    throw new ReferenceError(
      "Error: componentId not specified or element doesn't exist"
    );
  }

  /**
   * Constructor
   *
   * @param {Object} settings - User settings
   */
  constructor(settings) {
    super(settings);

    this.config = { ...Component.defaultSettings, ...settings };
  }

  /**
   * Destroys the component instance
   *
   * @memberof Component
   * @instance
   * @public
   * @method destroy
   * @returns {void}
   */
  destroy() {
    this.onDestroy();
    this.el = {};
    this.component.innerHTML = "";
  }

  /**
   * Performs before destroy cleanup of the component
   *
   * @memberof Component
   * @instance
   * @private
   * @method onDestroy
   * @returns {void}
   */
  onDestroy() {
    this.removeAllListeners();
  }
}
