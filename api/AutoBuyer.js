/**
 * Properties of an in-game auto-buyer
 */
export class AutoBuyer {
    constructor() {
        /**
         * @type {boolean} Is the auto-buyer toggle "on"?
         * @public
         */
        this.isActive;
    }

    /**
     * @returns {boolean} Is the auto-buyer purchased?
     */
    get isAvailable();
}