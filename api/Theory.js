import { Currency, FreeCost, FirstFreeCost, ConstantCost, LinearCost, ExponentialCost } from "./CostAndCurrency.js";
import { BigNumber } from "./Numerics.js";

/** @class */
export class QuaternaryEntry {
    /** @constructor
     * @param {string} name
     * @param {string} value
     */
    constructor(name, value) {}
}

/** @class */
export class Upgrade {
    constructor() {
        /**
         * @type {function(number):string}
         * @public
         */
        this.getDescription;
        
        /**
         * @type {function(number):string}
         * @public
         */
        this.getInfo;
    
        /**
         * @type {function(number):boolean}
         * @public
         */
        this.canBeRefunded;
    
        /**
         * @type {function(number):void}
         * @public
         */
        this.bought;
    
        /**
         * @type {function(number):void}
         * @public
         */
        this.refunded;
    
        /**
         * @type {function(number):void}
         * @public
         */
        this.boughtOrRefunded;
    }

    /**
     * @returns {number}
     */
    get level() {}

    /**
     * @returns {number}
     */
    get maxLevel() {}

    /**
     * @returns {boolean}
     */
    get isAvailable() {}
}

/** @class */
export class Theory {
    constructor() {
        /**
         * @type {number}
         * @public
         */
        this.primaryEquationScale;

        /**
         * @type {number}
         * @public
         */
         this.primaryEquationHeight;

        /**
         * @type {number}
         * @public
         */
         this.secondaryEquationScale;

        /**
         * @type {number}
         * @public
         */
         this.secondaryEquationHeight;
    }

    /**
     * @returns {Currency}
     */
    addCurrency() {}
    
    /**
     * @param {number} id
     * @param {Currency} currency
     * @param {FreeCost|FirstFreeCost|ConstantCost|LinearCost|ExponentialCost} cost
     * @returns {Upgrade}
     */
    createUpgrade(id, currency, cost) {}
    
    /**
     * @param {number} id
     * @param {Currency} currency
     * @param {FreeCost|FirstFreeCost|ConstantCost|LinearCost|ExponentialCost} cost
     * @returns {Upgrade}
     */
    createPermanentUpgrade(id, currency, cost) {}
    
    /**
     * @param {number} id
     * @param {number} maxLevel
     * @returns {Upgrade}
     */
    createMilestoneUpgrade(id, maxLevel) {}
    
    /**
     * @param {number} id
     * @param {Currency} currency
     * @param {BigNumber} cost
     * @returns {Upgrade}
     */
    createPublicationUpgrade(id, currency, cost) {}
    
    /**
     * @param {number} id
     * @param {Currency} currency
     * @param {BigNumber} cost
     * @returns {Upgrade}
     */
    createBuyAllUpgrade(id, currency, cost) {}
    
    /**
     * @param {number} id
     * @param {Currency} currency
     * @param {BigNumber} cost
     * @returns {Upgrade}
     */
    createAutoBuyerUpgrade(id, currency, cost) {}
    
    /**
     * @param {BigNumber} firstTarget
     */
    setMilestoneProgress(firstTarget) {}
    
    /**
     * @param {BigNumber} firstTarget
     * @param {BigNumber} step
     */
    setMilestoneProgress(firstTarget, step) {}
    
    /**
     */
    invalidatePrimaryEquation() {}
    
    /**
     */
    invalidateSecondaryEquation() {}
    
    /**
     */
    invalidateTertiaryEquation() {}
    
    /**
     */
    invalidateQuaternaryValues() {}

    /**
     * @returns {string}
     */
    get latexSymbol() {}

    /**
     * @returns {BigNumber}
     */
    get publicationMultiplier() {}
}

/**
 * @type {Theory}
 */
export var theory;