import { BigNumber } from "./BigNumber";

/**
  * Similar to console.log, but sends a message to the SDK.
  * @param {Object} message
  */
export function log(message);

/**
 * Various formatting and calculation methods.
 */
export class Utils {
    /**
     * Adds '\(' and '\)' for inline LaTeX math display.
     * @param {String} value
     * @returns {String}
     */
    static getMath(value);

    /**
     * Adds '\(' and '\)' for inline LaTeX math display and an LaTeX arrow between the values.
     * @param {String} valueLeft
     * @param {String} valueRight
     * @returns {String}
     */
    static getMathTo(valueLeft, valueRight);

    /**
     * A value that increases exponentially using repeated steps.
     * For example, the difference in value for basePower=2, stepLength=3 will be
     * 1, 1, 1, 2, 2, 2, 4, 4, 4, 8, 8, 8, ...
     * @param {number} level - Level of the upgrade
     * @param {number} basePower - How the value difference increases
     * @param {number} stepLength - How many times the same difference is used
     * @param {number} offset - Value when the level is 0
     * @returns {BigNumber}
     */
    static getStepwisePowerSum(level, basePower, stepLength, offset) { 
        // Pseudo code
        let intPart = level / stepLength;
        let modPart = level - intPart * stepLength;
        let d = stepLength / (basePower - 1);
        return (d + modPart) * (basePower ^ intPart) - d + offset;
    }

    /**
     * Calculates the value of s_n(x) = x * Π_i^n (1 - (x/(k*π))^2)
     * @param {number} n
     * @param {BigNumber|number} x
     * @returns {BigNumber}
     */
    static getWeierstrassSineProd(m, x) { 
        // Pseudo code
        let result = 1;
        for(let i = 1; i <= m; ++i)
            result *= 1 - (x / (Math.PI * k))^2;
        return x * result;
    }
}