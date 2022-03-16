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

    /**
     * @param {number} fromLevel - The current level of the upgrade
     * @param {number} toLevel - The target level of the upgrade
     * @returns {BigNumber} Cumulative cost of all levels to reach toLevel from fromLevel
     */
    getSum(fromLevel, toLevel);

    /**
     * @param {number} fromLevel - The current level of the upgrade
     * @param {number|BigNumber} currency - How much currency you can spend
     * @returns {number} How many additional levels you can afford
     */
    getMax(fromLevel, currency);
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
 * Note: Upgrades using this cost model will enforce a maxLevel of 2000 if no
 * cumulative and max functions are provided.
 */
export class CustomCost extends Cost {
    /**
     * @constructor
     * @param {function(number):BigNumber} costFunction - Function returning the cost of a given level (not cumulative).
     */
    constructor(costFunction);
    
    /**
     * @constructor
     * @param {function(number):BigNumber} costFunction - Function returning the cost of a given level (not cumulative).
     * @param {function(number, number):BigNumber} cumulativeFunction - cumulativeFunction(10, 5) should return the cumulative cost if the current level is 10 and you want to buy 5 more levels.
     * @param {function(number, Bignumber):number} maxFunction - maxFunction(5, BigNumber.from(100)) should return the number of levels that can be bought if you're currently at level 5 and have 100 units of currency to spend.
     */
     constructor(costFunction, cumulativeFunction, maxFunction);

     /**
      * A sanity check to ensure that the provided cumulative and max functions are
      * correct. The check assumes that the cost function is correct, and calculate
      * all combinations of levels and amount up to a given max level to make sure
      * that the brute force calculation matches the results from the provided functions.
      * The function stops at the first error. If maxLevel is above 50, the check will skip
      * some combinations to ensure a reasonable calculation time, while still performing
      * checks across the whole range.
      * @param {function(string):void} log - A function for logging messages (info or error) sent during the check.
      * @param {number} maxLevel - The maximum level to test.
      */
     performsChecks(log, maxLevel);
}