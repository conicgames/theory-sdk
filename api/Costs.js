import { BigNumber } from "./BigNumber";

/**
 * Generic cost model
 */
export class Cost{
    /**
     * @param {number} level Starts at 0 for the cost of the first level
     * @returns {BigNumber} Cost of a single level, i.e., not cumulative
     */
    getCost(level) { }
}

/**
 * Cost model for a free upgrade
 */
export class FreeCost extends Cost {
    /**
     * It's free. Did you expect parameters?
     * @constructor
     */
    constructor() { }
}

/**
 * Cost model for an upgrade for which the first level is free.
 * The cost after the first level is provided by another cost model.
 */
export class FirstFreeCost extends Cost {
    /**
     * @constructor
     * @param {Cost} costModel Cost model to use after the first level
     */
    constructor(costModel) {}
}

/**
 * Cost model for an upgrade that always has the same cost, regardless of its level.
 * If the cost is less or equal to zero, it will behave as FreeCost.
 */
export class ConstantCost extends Cost {
    /**
     * @constructor
     * @param {number|BigNumber} cost The cost of the upgrade
     */
    constructor(cost) {}
}

/**
 * Cost model for an upgrade that increases linearly.
 * Cost formula: cost = progress * level + initialCost
 */
export class LinearCost extends Cost {
    /**
     * Cost formula: cost = progress * level + initialCost
     * @constructor
     * @param {number|BigNumber} initialCost
     * @param {number|BigNumber} progress
     */
    constructor(initialCost, progress) {}
}

/**
 * Cost model for an upgrade that increases exponentially.
 * Cost formula: initialCost * 2^(progress * level).
 */
export class ExponentialCost extends Cost {
    /**
     * Cost formula: initialCost * 2^(progress * level)
     * @constructor
     * @param {number|BigNumber} initialCost
     * @param {number|BigNumber} progress
     */
    constructor(initialCost, progress) {}
}