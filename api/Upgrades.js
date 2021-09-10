import { Currency } from "./Currency";

/**
 * Generic upgrade
 */
export class Upgrade {
    constructor() {
        /**
         * Holds a function to call to get the description of the upgrade given a buy amount.
         * The amount is always positive and relative to the current level.
         * Note: Can only be modified within a custom theory
         * @type {function(number):string}
         * @public
         */
        this.getDescription;

        /**
         * Holds the static description of the upgrade. For dynamic descriptions, use getDescription.
         * Note: Can only be modified within a custom theory
         * @type {String}
         * @public
         */
        this.description;
        
        /**
         * Holds a function to call to get the info of the upgrade ('i' button) given a buy amount.
         * The amount is always positive and relative to the current level.
         * Note: Can only be modified within a custom theory
         * @type {function(number):string}
         * @public
         */
        this.getInfo;

        /**
         * Holds the static info of the upgrade. For dynamic info, use getInfo.
         * Note: Can only be modified within a custom theory
         * @type {String}
         * @public
         */
        this.info;
    
        /**
         * Holds a function that returns whether a given amount of upgrade level can be refunded.
         * The amount is always positive and relative to the current level.
         * Note: Can only be modified within a custom theory
         * @type {function(number):boolean}
         * @public
         */
        this.canBeRefunded;

        /**
         * Current level of the upgrade. Default: 0.
         * Notes:
         *  - Can only be modified within a custom theory.
         *  - Cannot be negative or lower than maxLevel 
         *  - When set, 'bought', 'refunded', 'boughtOrRefunded'
         *    will be called depending on the previous level.
         * @type {number}
         * @public
         */
        this.level;

        /**
         * Maximum level of the upgrade. Default: Max integer.
         * Notes:
         *  - Can only be modified within a custom theory.
         *  - Cannot be negative or lower than the current level 
         * @type {number}
         * @public
         */
        this.maxLevel;
    
        /**
         * Is the upgrade available to buy (in the list)? Default: true.
         * Note: Can only be modified within a custom theory
         * @type {boolean}
         * @public
         */
        this.isAvailable;
    
        /**
         * Is the upgrade considered by the auto-buyer and the "buy all" button? Default: true.
         * @type {boolean}
         * @public
         */
        this.isAutoBuyable;
    }

    /**
     * @returns {number} Unique ID
     */
    get id();

    /**
     * @returns {Currency} Currency model associated to the upgrade
     */
    get currency();

    /**
     * @returns {Cost} Cost model associated to the upgrade
     */
    get cost();

    /**
     * Sets a function to call when the level increases of a given amount.
     * The amount is always positive and relative to the current level.
     * @param {function(number):void} onBought
     */
    set bought(onBought);

    /**
     * Sets a function to call when the level decreases of a given amount.
     * The amount is always positive and relative to the current level.
     * @param {function(number):void} onRefunded
     */
    set refunded(onRefunded);

    /**
     * Sets a function to call when the level increases or decreases of a given amount.
     * The amount is always positive and relative to the current level.
     * @param {function(number):void} onBoughtOrRefunded
     */
    set boughtOrRefunded(onBoughtOrRefunded);

    /**
     * Buys a specified amount of this upgrade. Does nothing if it cannot afford it.
     * Enter a negative value to buy the maximum amount.
     * @param {number} amount - Number of levels to purchase
     */
    buy(amount);

    /**
     * Refunds a specified amount of this upgrade. Does nothing if it cannot refund it.
     * Enter a negative value to refund all levels.
     * @param {number} amount - Number of levels to refund
     */
    refund(amount);
}

/**
 * Variable
 */
export class Variable extends Upgrade {
    /**
     * @returns {number} Power of the variable. In [0, 1].
     */
    get power();
}

/**
 * Research Upgrade
 */
export class Research extends Upgrade {
    /**
     * @returns {number} Power of the research upgrade. In [0, 1].
     */
    get power();
}