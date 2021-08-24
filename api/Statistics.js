import { BigNumber } from "./BigNumber";

/**
 * Gathers most statistics of the Statistics popup
 */
export class Statistics {
    /**
     * @returns {number}
     */
    get equationTapCount();
    
    /**
     * @returns {number}
     */
    get tickCount();
    
    /**
     * @returns {number}
     */
    get prestigeCount();
    
    /**
     * @returns {number}
     */
    get supremacyCount();
    
    /**
     * @returns {number}
     */
    get graduationCount();
    
    /**
     * @returns {number}
     */
    get timeSinceLastPrestige();
    
    /**
     * @returns {number}
     */
    get timeSinceLastSupremacy();
    
    /**
     * @returns {number}
     */
    get timeSinceLastGraduation();
    
    /**
     * @returns {number}
     */
    get durationOfLastPrestige();
    
    /**
     * @returns {number}
     */
    get durationOfLastSupremacy();
    
    /**
     * @returns {number}
     */
    get onlineTime();
    
    /**
     * @returns {number}
     */
    get gameTime();
    
    /**
     * @returns {BigNumber}
     */
    get lifetimeF();
    
    /**
     * @returns {BigNumber}
     */
    get graduationF();
    
    /**
     * @returns {BigNumber}
     */
    get supremacyF();
    
    /**
     * @returns {BigNumber}
     */
    get prestigeF();
    
    /**
     * @returns {BigNumber}
     */
    get previousB();
    
    /**
     * @returns {BigNumber}
     */
    get maxDt();
    
    /**
     * @returns {number}
     */
    get rewardCount();
}