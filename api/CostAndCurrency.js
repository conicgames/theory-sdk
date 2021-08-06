import { BigNumber } from "./Numerics.js";

export class Currency {
    constructor() {
        /**
         * @type {BigNumber}
         * @public
         */
        this.value;
    }
}

export class FreeCost {
    /** @constructor */
    constructor() { }

    /**
      * @param {number} level
      * @returns {BigNumber}
      */
    getCost(level) { }
}

export class ConstantCost {
    /**
      * @constructor
      * @param {BigNumber} cost
      */
    constructor(cost) {}

    /**
      * @param {number} level
      * @returns {BigNumber}
      */
    getCost(level) { }
}

export class LinearCost {
    /**
      * @constructor
      * @param {BigNumber} initialCost
      * @param {number} progress
      */
    constructor(initialCost, progress) {}

    /**
      * @param {number} level
      * @returns {BigNumber}
      */
    getCost(level) { }
}

export class FirstFreeCost {
    /**
      * @constructor
      * @param {FreeCost|FirstFreeCost|ConstantCost|LinearCost|ExponentialCost} costModel
      */
    constructor(costModel) {}

    /**
      * @param {number} level
      * @returns {BigNumber}
      */
    getCost(level) { }
}

export class ExponentialCost {
    /**
      * @constructor
      * @param {BigNumber|number} initialCost
      * @param {number} progress
      */
    constructor(initialCost, progress) {}

    /**
      * @param {number} level
      * @returns {BigNumber}
      */
    getCost(level) { }
}