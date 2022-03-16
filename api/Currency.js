import { BigNumber } from "./BigNumber";

/**
 * Holds a single currency
 */
export class Currency {
    constructor() {
        /**
         * The current value of currency
         * Note: Can only be set within a custom theory.
         * @type {BigNumber}
         * @public
         */
        this.value;
    }

    /**
     * The symbol of currency
     * @returns {string}
     */
    get symbol();
}