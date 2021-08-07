import { BigNumber } from "./Numerics.js";

/**
 * Holds a single currency of the theory
 */
export class Currency {
    constructor() {
        /**
         * The current value of currency
         * @type {BigNumber}
         * @public
         */
        this.value;
    }
}

/**
 * Cost model for a free upgrade
 */
export class FreeCost {
    /**
     * It's free. Did you expect parameters?
     * @constructor
     */
    constructor() { }

    /**
     * @param {number} level Starts at 0 for the cost of the first level
     * @returns {BigNumber} Cost of a single level, i.e., not cumulative
     */
    getCost(level) { }
}

/**
 * Cost model for an upgrade that always has the same cost, regardless of its level.
 * If the cost is less or equal to zero, it will behave as FreeCost.
 */
export class ConstantCost {
    /**
     * @constructor
     * @param {number|BigNumber} cost The cost of the upgrade
     */
    constructor(cost) {}

    /**
     * @param {number} level Starts at 0 for the cost of the first level
     * @returns {BigNumber} Cost of a single level, i.e., not cumulative
     */
    getCost(level) { }
}

/**
 * Cost model for an upgrade that increases linearly.
 * Cost formula: cost = progress * level + initialCost
 */
export class LinearCost {
    /**
     * Cost formula: cost = progress * level + initialCost
     * @constructor
     * @param {number|BigNumber} initialCost
     * @param {number|BigNumber} progress
     */
    constructor(initialCost, progress) {}

    /**
     * @param {number} level Starts at 0 for the cost of the first level
     * @returns {BigNumber} Cost of a single level, i.e., not cumulative
     */
    getCost(level) { }
}

/**
 * Cost model for an upgrade for which the first level is free.
 * The cost after the first level is provided by another cost model.
 */
export class FirstFreeCost {
    /**
     * @constructor
     * @param {FreeCost|FirstFreeCost|ConstantCost|LinearCost|ExponentialCost} costModel Cost model to use after the first level
     */
    constructor(costModel) {}

    /**
     * @param {number} level Starts at 0 for the cost of the first level
     * @returns {BigNumber} Cost of a single level, i.e., not cumulative
     */
    getCost(level) { }
}

/**
 * Cost model for an upgrade that increases exponentially.
 * Cost formula: initialCost * 2^(progress * level).
 */
export class ExponentialCost {
    /**
     * Cost formula: initialCost * 2^(progress * level)
     * @constructor
     * @param {number|BigNumber} initialCost
     * @param {number|BigNumber} progress
     */
    constructor(initialCost, progress) {}

    /**
     * @param {number} level Starts at 0 for the cost of the first level
     * @returns {BigNumber} Cost of a single level, i.e., not cumulative
     */
    getCost(level) { }
}