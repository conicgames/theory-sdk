/**
 * Properties of an in-game achievement
 */
export class Achievement {
    constructor() {
        /**
         * Can only be modified if you own the achievement.
         * Will not trigger the achievement popup when set to 'true'.
         * Only the unlock condition can trigger the achievement popup.
         * @type {boolean}
         * @public
         */
         this.isUnlocked;
    }

    /**
     * @returns {number} Unique id
     */
    get id();
    
    /**
     * @returns {boolean}
     */
    get isSecret();
    
    /**
     * @returns {String}
     */
    get category();
    
    /**
     * @returns {String}
     */
    get name();
    
    /**
     * @returns {String}
     */
    get description();
    
    /**
     * @returns {String}
     */
    get hint();
    
    /**
     * @returns {number} Number of rewarded stars when unlocking the achievement
     */
    get stars();
    
    /**
     * @returns {Date} Date in UTC timezone. Null if not unlocked.
     */
    get dateUnlocked();
    
    /**
     * @returns {number} A number in [0, 1] representing the progress. 1 is 100%/unlocked.
     */
    get progress();
}