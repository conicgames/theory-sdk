import { Currency, FreeCost, FirstFreeCost, ConstantCost, LinearCost, ExponentialCost } from "./CostAndCurrency.js";
import { BigNumber } from "./Numerics.js";

/**
 * Holds a single row of the list of values that are
 * displayed on the right of the equation. 
 */
export class QuaternaryEntry {
    /** @constructor
     * @param {string} name Left side of the equality sign
     * @param {string} value Right side of the equality sign
     */
    constructor(name, value) {}
}

/**
 * Theory upgrade
 */
export class Upgrade {
    constructor() {
        /**
         * Holds a function to call to get the description of the upgrade given a buy amount.
         * The amount is always positive and relative to the current level.
         * @type {function(number):string}
         * @public
         */
        this.getDescription;

        /**
         * Holds the static description of the upgrade. For dynamic descriptions, use getDescription.
         * @type {string}
         * @public
         */
        this.description;
        
        /**
         * Holds a function to call to get the info of the upgrade ('i' button) given a buy amount.
         * The amount is always positive and relative to the current level.
         * @type {function(number):string}
         * @public
         */
        this.getInfo;

        /**
         * Holds the static info of the upgrade. For dynamic info, use getInfo.
         * @type {string}
         * @public
         */
        this.info;
    
        /**
         * Holds a function that returns whether a given amount of upgrade level can be refunded.
         * The amount is always positive and relative to the current level.
         * @type {function(number):boolean}
         * @public
         */
        this.canBeRefunded;
    
        /**
         * Holds a function to call when the level increases of a given amount.
         * The amount is always positive and relative to the current level.
         * @type {function(number):void}
         * @public
         */
        this.bought;
    
        /**
         * Holds a function to call when the level decreases of a given amount.
         * The amount is always positive and relative to the current level.
         * @type {function(number):void}
         * @public
         */
        this.refunded;
    
        /**
         * Holds a function to call when the level increases or decreases of a given amount.
         * The amount is always positive and relative to the current level.
         * @type {function(number):void}
         * @public
         */
        this.boughtOrRefunded;

        /**
         * Maximum level of the upgrade. Default: Max integer.
         * @type {number}
         * @public
         */
        this.maxLevel;
    
        /**
         * Is the upgrade available to buy (in the list). Default: true.
         * @type {boolean}
         * @public
         */
        this.isAvailable;
    }

    /**
     * @returns {number} Current level of the upgrade.
     */
    get level() {}
}

/**
 * Class to build and control the theory.
 */
export class Theory {
    constructor() {
        /**
         * @type {number} Relative scale of the primary equation. Default: 1
         * @public
         */
        this.primaryEquationScale;

        /**
         * @type {number} Absolute height of the primary equation. Default: 40
         * @public
         */
         this.primaryEquationHeight;

        /**
         * @type {number} Relative scale of the secondary equation. Default: 1
         * @public
         */
         this.secondaryEquationScale;

        /**
         * @type {number} Absolute height of the secondary equation. Default: 30
         * @public
         */
         this.secondaryEquationHeight;
    }

    /**
     * Creates a new currency
     * @returns {Currency}
     */
    createCurrency() {}
    
    /**
     * @param {number} id Unique ID among regular upgrades
     * @param {Currency} currency Currency to use for this upgrade
     * @param {FreeCost|FirstFreeCost|ConstantCost|LinearCost|ExponentialCost} cost Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createUpgrade(id, currency, cost) {}
    
    /**
     * @param {number} id Unique ID among permanent upgrades
     * @param {Currency} currency Currency to use for this upgrade
     * @param {FreeCost|FirstFreeCost|ConstantCost|LinearCost|ExponentialCost} cost Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createPermanentUpgrade(id, currency, cost) {}
    
    /**
     * @param {number} id Unique ID among milestone upgrades
     * @param {number} maxLevel Max level of this upgrade
     * @returns {Upgrade}
     */
    createMilestoneUpgrade(id, maxLevel) {}
    
    /**
     * @param {number} id Unique ID among permanent upgrades
     * @param {Currency} currency Currency to use for this upgrade
     * @param {number|BigNumber} cost Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createPublicationUpgrade(id, currency, cost) {}
    
    /**
     * @param {number} id Unique ID among permanent upgrades
     * @param {Currency} currency Currency to use for this upgrade
     * @param {number|BigNumber} cost Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createBuyAllUpgrade(id, currency, cost) {}
    
    /**
     * @param {number} id Unique ID among permanent upgrades
     * @param {Currency} currency Currency to use for this upgrade
     * @param {number|BigNumber} cost Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createAutoBuyerUpgrade(id, currency, cost) {}
    
    /**
     * Sets the progress needed to buy milestones.
     * The nth milestones will cost n*firstTarget
     * @param {BigNumber} firstTarget Cost of the first milestone
     */
    setMilestoneProgress(firstTarget) {}
    
    /**
     * Sets the progress needed to buy milestones.
     * The nth milestones will cost firstTarget + (n-1) * step
     * @param {BigNumber} firstTarget Cost of the first milestone
     * @param {BigNumber} step Difference between subsequent milestones
     */
    setMilestoneProgress(firstTarget, step) {}
    
    /**
     * Force refresh the primary equation. (Main formula)
     */
    invalidatePrimaryEquation() {}
    
    /**
     * Force refresh the secondary equation. (Formula right below the main one)
     */
    invalidateSecondaryEquation() {}
    
    /**
     * Force refresh the tertiary equation. (Formula at the bottom of the equation area)
     */
    invalidateTertiaryEquation() {}
    
    /**
     * Force refresh the quaternary value list. (List of values on the right side, e.g., Differential Calculus)
     */
    invalidateQuaternaryValues() {}

    /**
     * Each theory has it's own symbol depending on it's index in the list.
     * For example, Recurrency Relation has the symbol "\tau_1".
     * @returns {string}
     */
    get latexSymbol() {}

    /**
     * @returns {BigNumber} Publication multiplier has shown in the Publication window
     */
    get publicationMultiplier() {}
}

/**
 * Instance of the theory.
 * @type {Theory}
 */
export var theory;