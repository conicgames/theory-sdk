/**
 * Properties of an in-game achievement
 */
export class Achievement {
    /**
     * @returns {number} Unique id
     */
    get id();
    
    /**
     * @returns {boolean}
     */
    get isUnlocked();
    
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
     * @returns {Date} Date in UTC timezone
     */
    get dateUnlocked();
    
    /**
     * @returns {number} A number in [0, 1] representing the progress. 1 is 100%/unlocked.
     */
    get progress();
}