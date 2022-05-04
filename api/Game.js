import { Achievement } from "./Achievement";
import { Automation } from "./Automation";
import { BuyAmounts } from "./BuyAmounts";
import { BigNumber } from "./BigNumber";
import { Settings } from "./Settings";
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
         * @type {Theory} The currently active theory. Set to null to stop the current theory.
         * @public
         */
        this.activeTheory;

        /**
         * Callback to know right before doing a Prestige
         * @type {function(void):void}
         * @public
         */
        this.prePrestige;

        /**
         * Callback to know right after doing a Prestige
         * @type {function(void):void}
         * @public
         */
        this.postPrestige;

        /**
         * Callback to know right before doing a Supremacy
         * @type {function(void):void}
         * @public
         */
        this.preSupremacy;

        /**
         * Callback to know right after doing a Supremacy
         * @type {function(void):void}
         * @public
         */
        this.postSupremacy;

        /**
         * Callback to know right before doing a Graduation
         * @type {function(void):void}
         * @public
         */
        this.preGraduation;

        /**
         * Callback to know right after doing a Graduation
         * @type {function(void):void}
         * @public
         */
        this.postGraduation;

        /**
         * Callback to know right before changing the active theory
         * @type {function(void):void}
         * @public
         */
        this.activeTheoryChanging;

        /**
         * Callback to know right after changing the active theory
         * @type {function(void):void}
         * @public
         */
        this.activeTheoryChanged;
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
     * The value of dt shown in the summary bar, i.e., including rewards and acceleration.
     * @returns {BigNumber}
     */
    get dt();
    
    /**
     * @returns {BigNumber}
     */
    get acceleration();
    
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
     * @param {number} index - Index of the x_i value. Starts at 0. For example, x is xi(0), x_1 is xi(1), etc.
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
     * @returns {Story} Story chapters
     */
    get story();
    
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
     * @returns {Settings} Settings of the game (Settings popup)
     */
    get settings();
    
    /**
     * @returns {boolean} Is there a reward (via ad or purchase) currently active?
     */
    get isRewardActive();
    
    /**
     * @returns {boolean} Is the game currently in the offline progress screen?
     */
     get isCalculatingOfflineProgress();

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
     * @param {Upgrade[]} upgrades - List of upgrades to buy
     * @param {number} [bulkAmount] - Will buy a multiple of this amount of each upgrade. Default: -1 (max)
     * @param {boolean} [ignoreToggle] - If true, buy all upgrades regardless of the checkbox. Default: false
     */
    buy(upgrades, bulkAmount, ignoreToggle);

    /**
     * Refund the specified amount of level of all provided upgrades.
     * If the amount is greater that the current level, it will refund all levels.
     * Use -1 for maximum.
     * @param {Upgrade[]} upgrades - List of upgrades to refund
     * @param {number} amount - Amount to refund
     */
    refund(upgrades, amount);
}

/**
 * Instance of the game.
 * @type {Game}
 */
export var game;
