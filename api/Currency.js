import { BigNumber } from "./BigNumber";

/**
 * Holds a single currency of the theory
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
}