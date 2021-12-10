import { BigNumber } from "./BigNumber";

/**
 * Generic cost model
 */
export class Cost{
    /**
     * @param {number} level - Starts at 0 for the cost of the first level
     * @returns {BigNumber} Cost of a single level, i.e., not cumulative
     */
    getCost(level);
}

/**
 * Cost model for a free upgrade
 */
export class FreeCost extends Cost {
    /**
     * It's free. Did you expect parameters?
     * @constructor
     */
    constructor();
}

/**
 * Cost model for an upgrade for which the first level is free.
 * The cost after the first level is provided by another cost model.
 */
export class FirstFreeCost extends Cost {
    /**
     * @constructor
     * @param {Cost} costModel - Cost model to use after the first level
     */
    constructor(costModel);
}

/**
 * Cost model for an upgrade that always has the same cost, regardless of its level.
 * If the cost is less or equal to zero, it will behave as FreeCost.
 */
export class ConstantCost extends Cost {
    /**
     * @constructor
     * @param {number|BigNumber} cost - The cost of the upgrade
     */
    constructor(cost);
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
    constructor(initialCost, progress);
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
    constructor(initialCost, progress);
}

/**
 * Cost model for an upgrade that repeats the same cost
 * before going to the next level. The implementation
 * is equivalent to cost.getCost(Math.floor(level/stepSize)).
 */
export class StepwiseCost extends Cost {
    /**
     * @constructor
     * @param {Cost} cost - Cost model
     * @param {number} stepSize - Number of repetition of the same cost level
     */
    constructor(cost, stepSize);
}

/**
 * Cost model for an upgrade that initially follows a cost
 * model, and then switches to another one.
 * Note that when level == maxFirstCostLevel, the second cost
 * model will be called as if the level was 0. For example:
 *   let firstCost = new FreeCost()
 *   let secondCost = new LinearCost(1, 1)
 *   let cost = new CompositeCost(10, firstCost, secondCost)
 * cost.getCost(10) is equivalent to secondCost.getCost(0).
 */
 export class CompositeCost extends Cost {
    /**
     * @constructor
     * @param {number} maxfirstCostLevel - Amount of level used for the first cost model
     * @param {Cost} firstCost - Cost model to use when level < maxfirstCostLevel
     * @param {Cost} secondCost - Cost model to use when level >= maxfirstCostLevel
     */
    constructor(maxfirstCostLevel, firstCost, secondCost);
}

/**
 * Cost model for an upgrade that increases following a custom cost function.
 * Note: Upgrades using this cost model will enforce a maxLevel of 2000.
 */
export class CustomCost extends Cost {
    /**
     * @constructor
     * @param {function(number):BigNumber} costFunction - Function returning the cost of a given level (not cumulative).
     */
    constructor(costFunction);
}