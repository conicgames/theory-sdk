import { Achievement } from "./Achievement";
import { Automation } from "./Automation";
import { BuyAmounts } from "./BuyAmounts";
import { BigNumber } from "./BigNumber";
import { Statistics } from "./Statistics";
import { StoryChapter } from "./StoryChapter";
import { Theory } from "./Theory";
import { Upgrade, Variable } from "./Upgrades";

/**
 * Properties of the game.
 */
export class Game {
    constructor() {
        /**
         * @type {Theory} The currently active theory. Can be set to null.
         * @public
         */
        this.activeTheory;
    }

    /**
     * @returns {BigNumber} f(t)
     */
    get f();
    
    /**
     * @returns {BigNumber}
     */
    get t();
    
    /**
     * @returns {BigNumber}
     */
    get dt();
    
    /**
     * @returns {BigNumber}
     */
    get b();
    
    /**
     * @returns {BigNumber}
     */
    get db();
    
    /**
     * @returns {BigNumber}
     */
    get x();
    
    /**
     * @param {number} index - Index of the x_i value. Starts at 0. 
     * @returns {BigNumber}
     */
    xi(index);
    
    /**
     * @returns {BigNumber} μ
     */
    get mu();
    
    /**
     * @returns {BigNumber} dμ
     */
    get dmu();
    
    /**
     * @returns {BigNumber} ψ
     */
    get psi();
    
    /**
     * @returns {BigNumber} dψ
     */
    get dpsi();
    
    /**
     * @returns {BigNumber} The unspent amount of stars
     */
    get stars();
    
    /**
     * @returns {BigNumber} The total amount of stars
     */
    get starsTotal();
    
    /**
     * @returns {BigNumber} φ
     */
    get phi();
    
    /**
     * @returns {BigNumber} The combined tau (τ) values, as shown in the summary bar. 
     */
    get tau();
    
    /**
     * @returns {BigNumber} The unspent amount of students (σ)
     */
    get sigma();
    
    /**
     * @returns {BigNumber} The total amount of students (σ)
     */
    get sigmaTotal();
    
    /**
     * @returns {boolean} Is there a reward (via ad or purchase) active at the moment?
     */
    get isRewardActive();
    
    /**
     * @returns {Variable[]} List of all variables
     */
    get variables();
    
    /**
     * @returns {Upgrade[]} List of all regular upgrades
     */
    get regularUpgrades();
    
    /**
     * @returns {Upgrade[]} List of all prestige upgrades
     */
    get prestigeUpgrades();
    
    /**
     * @returns {Upgrade[]} List of all supremacy upgrades
     */
    get supremacyUpgrades();
    
    /**
     * @returns {Upgrade[]} List of all star bonuses
     */
    get starBonuses();
    
    /**
     * @returns {Upgrade[]} List of all research upgrades
     */
    get researchUpgrades();
    
    /**
     * @returns {Theory[]} List of all theories
     */
    get theories();
    
    /**
     * @returns {Achievement[]} List of all achievements
     */
    get achievements();
    
    /**
     * @returns {StoryChapter[]} List of all story chapters
     */
    get storyChapters();
    
    /**
     * @returns {Automation} Automation features
     */
    get automation();
    
    /**
     * @returns {BuyAmounts} All buy amounts of the game
     */
    get buyAmounts();
    
    /**
     * @returns {Statistics} Statistics of the game (Statistics popup)
     */
    get statistics();

    /**
     * Performs a "Prestige"
     */
    prestige();

    /**
     * Performs a "Supremacy"
     * Does nothing if f(t) < ee50
     */
    supremacy();

    /**
     * Performs a "Graduation"
     * Does nothing if f(t) < ee2000 or if dσ = 0
     */
    graduate();

    /**
     * Buy the specified amount of level of all provided upgrades following
     * the same buying pattern as the "Buy All" button. For example, if the amount
     * is set to 10 and it could afford 25, it will buy 20 (2x10).
     * Use -1 or 1 for maximum.
     * For more control, use the 'buy' method of each independent upgrade.
     * @param {Upgrade[]} upgrades List of upgrades to buy
     * @param {number} [bulkAmount] Will buy a multiple of this amount of each upgrade. Default: -1 (max)
     * @param {boolean} [ignoreToggle] If true, buy all upgrade regardless of the checkbox. Default: false
     */
    buy(upgrades, bulkAmount, ignoreToggle);

    /**
     * Refund the specified amount of level of all provided upgrades.
     * If the amount is greater that the current level, it will refund all levels.
     * Use -1 for maximum.
     * @param {Upgrade[]} upgrades List of upgrades to refund
     * @param {number} amount Amount to refund
     */
    refund(upgrades, amount);
}

/**
 * Instance of the game.
 * @type {Game}
 */
export var game;