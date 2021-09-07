import { BigNumber } from "./BigNumber";
import { Cost } from "./Costs";
import { Currency } from "./Currency";
import { Upgrade } from "./Upgrades";

/**
 * Holds a single row of the list of values that are
 * displayed on the right of the equation. 
 */
export class QuaternaryEntry {
    /** @constructor
     * @param {String} name - Left side of the equality sign
     * @param {String} value - Right side of the equality sign
     */
    constructor(name, value);
}

/**
 * Properties of a theory.
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
     * @returns {number} Unique ID
     */
    get id();

    /**
     * @returns {String} Name of the theory, as shown below the summary bar
     */
    get name();

    /**
     * @returns {String} The symbol of the theory in ASCII, e.g., τ₁
     */
    get symbol();

    /**
     * @returns {String} The symbol of the theory in LaTeX, e.g., \tau_1
     */
    get latexSymbol();

    /**
     * @returns {bool}
     */
    get isUnlocked();

    /**
     * @returns {Currency[]}
     */
    get currencies();

    /**
     * @returns {Upgrade[]} Upgrades from the first panel
     */
    get upgrades();

    /**
     * @returns {Upgrade[]} Upgrades from the second panel
     */
    get permanentUpgrades();

    /**
     * @returns {Upgrade[]} Upgrades from the publication panel
     */
    get milestoneUpgrades();

    /**
     * This upgrade is also in "permanentUpgrades"
     * @returns {Upgrade}
     */
    get publicationUpgrade();

    /**
     * This upgrade is also in "permanentUpgrades"
     * @returns {Upgrade}
     */
    get buyAllUpgrade();

    /**
     * This upgrade is also in "permanentUpgrades"
     * @returns {Upgrade}
     */
    get autoBuyerUpgrade();

    /**
     * @returns {boolean} Was the publication upgrade purchased? Equivalent to "publicationUpgrade.level > 0"
     */
    get isPublicationAvailable();

    /**
     * @returns {boolean} Was the "buy all" upgrade purchased? Equivalent to "buyAllUpgrade.level > 0"
     */
    get isBuyAllAvailable();

    /**
     * @returns {boolean} Was the auto-buyer upgrade purchased? Equivalent to "autoBuyerUpgrade.level > 0"
     */
    get isAutoBuyerAvailable();

    /**
     * @returns {boolean} Is the toggle "on"?
     */
    get isAutoBuyerActive();

    /**
     * @returns {BigNumber} The value of tau, as shown in the currency bar
     */
    get tau();

    /**
     * @returns {BigNumber} The value of tau at the last publication
     */
    get tauPublished();

    /**
     * @returns {BigNumber} The income multiplier, as shown in the publication popup
     */
    get publicationMultiplier();

    /**
     * @returns {boolean} Equivalent to "tau > tauPublished"
     */
    get canPublish();

    /**
     * @returns {number} The amount of milestones left that can be spent on milestone upgrades
     */
    get milestonesUnused();

    /**
     * @returns {number} The total amount of milestones done so far
     */
    get milestonesTotal();

    /**
     * @returns {BigNumber} The value of tau required to get another milestone upgrade
     */
    get nextMilestone();

    /**
     * @returns {String} LaTeX string of the primary equation
     */
    get primaryEquation();

    /**
     * @returns {String} LaTeX string of the secondary equation
     */
    get secondaryEquation();

    /**
     * @returns {String} LaTeX string of the tertiary equation
     */
    get tertiaryEquation();

    /**
     * @returns {number} Amount of quaternary values
     */
    get quaternaryCount();

    /**
     * @param {number} index - Index of the quaternary entry, starting at 0
     * @returns {String} LaTeX string of the name of the quaternary entry 
     */
    quaternaryName(index);

    /**
     * @param {number} index - Index of the quaternary entry, starting at 0
     * @returns {String} LaTeX string of the value of the quaternary entry 
     */
    quaternaryValue(index);

    /**
     * Creates a new currency
     * Note: If multiple currency use the same symbol, the game will append a subscript
     * @param {string} [symbol] - The ASCII symbol for the currency - Default: "ρ"
     * @param {string} [latexSymbol] - The LaTeX symbol for the currency - Default: "\\rho"
     * @returns {Currency}
     */
    createCurrency(symbol, latexSymbol);
    
    /**
     * @param {number} id - Unique ID among regular upgrades
     * @param {Currency} currency - Currency to use for this upgrade
     * @param {Cost} cost - Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createUpgrade(id, currency, cost);
    
    /**
     * @param {number} id - Unique ID among permanent upgrades
     * @param {Currency} currency - Currency to use for this upgrade
     * @param {Cost} cost - Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createPermanentUpgrade(id, currency, cost);
    
    /**
     * @param {number} id - Unique ID among milestone upgrades
     * @param {number} maxLevel - Max level of this upgrade
     * @returns {Upgrade}
     */
    createMilestoneUpgrade(id, maxLevel);
    
    /**
     * A singular upgrade is an upgrade shown separately at the
     * top of the regular upgrades, like the "Prove Lemma" upgrade
     * in the theory "Convergence Test"
     * @param {number} id - Unique ID among singular upgraades
     * @param {Currency} currency - Currency to use for this upgrade
     * @param {Cost} cost - Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createSingularUpgrade(id, currency, cost);
    
    /**
     * @param {number} id - Unique ID among permanent upgrades
     * @param {Currency} currency - Currency to use for this upgrade
     * @param {number|BigNumber} cost - Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createPublicationUpgrade(id, currency, cost);
    
    /**
     * @param {number} id - Unique ID among permanent upgrades
     * @param {Currency} currency - Currency to use for this upgrade
     * @param {number|BigNumber} cost - Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createBuyAllUpgrade(id, currency, cost);
    
    /**
     * @param {number} id - Unique ID among permanent upgrades
     * @param {Currency} currency - Currency to use for this upgrade
     * @param {number|BigNumber} cost - Cost model to use for this upgrade
     * @returns {Upgrade}
     */
    createAutoBuyerUpgrade(id, currency, cost);
    
    /**
     * Sets the progress needed to buy milestones in logarithmic space.
     * The nth milestones will cost 10^cost.getCost(n-1).
     * For example, use "new LinearCost(25, 20)" to get
     * milestones at 1e25, 1e45, 1e65, etc.
     * @param {Cost} cost - Cost model for milestone upgrades.
     */
    setMilestoneCost(cost);
    
    /**
     * Force refresh the primary equation. (Main formula)
     */
    invalidatePrimaryEquation();
    
    /**
     * Force refresh the secondary equation. (Formula right below the main one)
     */
    invalidateSecondaryEquation();
    
    /**
     * Force refresh the tertiary equation. (Formula at the bottom of the equation area)
     */
    invalidateTertiaryEquation();
    
    /**
     * Force refresh the quaternary value list. (List of values on the right side, e.g., Differential Calculus)
     */
    invalidateQuaternaryValues();

    /**
     * Clears the graph
     */
    clearGraph();

    /**
     * Performs a "Publication".
     * Does nothing if publications are not available or the tau value is lower than the previous publication.
     */
    publish();

    /**
     * Completely resets the theory. Only available within its own custom theory.
     */
    reset();
}

/**
 * Instance of the current custom theory. Only available within a custom theory.
 * @type {Theory}
 */
export var theory;