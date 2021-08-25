import { BigNumber } from "./BigNumber";

/**
 * Defines the accepted modes for auto-reset features.
 */
export class AutoResetMode {
    /** @returns {AutoResetMode} */ static get RATIO();
    /** @returns {AutoResetMode} */ static get TIME();
    /** @returns {AutoResetMode} */ static get EXPRESSION();
}

/**
 * Properties of an in-game auto-reset (Prestige/Supremacy).
 */
export class AutoReset {
    constructor() {
        /**
         * @type {boolean} Is the auto-reset toggle "on"?
         * @public
         */
        this.isActive;
    
        /**
         * @type {AutoResetMode} Mode: Ratio/Time/Expression
         * @public
         */
        this.mode;
    
        /**
         * @type {BigNumber} db/b ratio (if the mode is set to "Ratio")
         * @public
         */
        this.ratio;
    
        /**
         * @type {number} Time, in seconds, for reset (if the mode is set to "Time")
         * @public
         */
        this.time;
    
        /**
         * @type {String} Math expression (if the mode is set to "Math Expression")
         * @public
         */
        this.expression;
    }

    /**
     * @returns {boolean} Is the auto-reset purchased?
     */
    get isAvailable();
 }