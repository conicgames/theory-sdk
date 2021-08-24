import { AutoBuyer } from "./AutoBuyer";
import { AutoReset } from "./AutoReset";

/**
 * Gather all automation features of the main game.
 * Automation features of theories are contained in the theories themselves.
 */
export class Automation {
    /**
     * @returns {AutoBuyer} Variable auto-buyer
     */
    get variables();
    
    /**
     * @returns {AutoBuyer} Upgrade auto-buyer
     */
    get upgrades();
    
    /**
     * @returns {AutoReset} Auto-Prestige
     */
    get prestige();
    
    /**
     * @returns {AutoReset} Auto-Supremacy
     */
    get supremacy();
    
    /**
     * @returns {number} The number of times the automation features trigger per second.
     */
    get rate();
 }