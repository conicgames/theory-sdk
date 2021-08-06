import { BigNumber } from "./Numerics.js";

/**
  * Similar to console.log, but sends a message to the SDK.
  * @param {Object} message
  */
export function log(message) {}

/**
 * Various formatting and calculation methods.
 */
export class Utils {
    /**
     * Adds '\(' and '\)' for inline LaTeX math display.
     * @param {string} value
     * @returns {string}
     */
    static getMath(value) { }

    /**
     * Adds '\(' and '\)' for inline LaTeX math display and an LaTeX arrow between the values.
     * @param {string} valueLeft
     * @param {string} valueRight
     * @returns {string}
     */
    static getMathTo(valueLeft, valueRight) { }

    /**
     * A value that increases exponentially using repeated steps.
     * For example, the difference in value for basePower=2, stepLength=3 will be
     * 1, 1, 1, 2, 2, 2, 4, 4, 4, 8, 8, 8, ...
     * @param {number} level Level of the upgrade
     * @param {number} basePower How the value difference increases
     * @param {number} stepLength How many times the same difference is used
     * @param {number} offset Value when the level is 0
     * @returns {BigNumber}
     */
    static getStepwisePowerSum(level, basePower, stepLength, offset) { 
        // Pseudo code
        let intPart = level / stepLength;
        let modPart = level - intPart * stepLength;
        let d = stepLength / (basePower - 1);
        return (d + modPart) * (basePower ^ intPart) - d + offset;
    }
}

/**
 * Provide localization support for sentences that are already translated in the game.
 */
export class Localization {
    /**
     * Provides safe formatting using C# syntax.
     * @param {string} text Templated literal, e.g., "Increase {0} by {1}"
     * @param {...object} args Values to use in place of {0} and {1}
     * @returns {string}
     */
    static format(text, args) { }

    /**
     * Access to the translation service of the game.
     * @param {string} id ID from the translation source document
     * @returns {string} Translated sentence from the game
     */
     static get(id) { }

    /**
     * Sentence: "Unlock {term}"
     * @param {string} term
     * @returns {string}
     */
     static getUpgradeUnlockDesc(term)

    /**
     * Sentence: "Unlocks {term}"
     * @param {string} term
     * @returns {string}
     */
     static getUpgradeUnlockInfo(term)

    /**
     * Sentence: "Add the term {term}"
     * @param {string} term
     * @returns {string}
     */
     static getUpgradeAddTermDesc(term)

    /**
     * Sentence: "Adds term {term} to the equation"
     * @param {string} term
     * @returns {string}
     */
     static getUpgradeAddTermInfo(term)

    /**
     * Sentence: "Add a new dimension"
     * @returns {string}
     */
     static getUpgradeAddDimensionDesc()

    /**
     * Sentence: "Adds a new dimension to the linear space"
     * @returns {string}
     */
     static getUpgradeAddDimensionInfo()

    /**
     * Sentence: "Unlock Publications"
     * @returns {string}
     */
     static getUpgradePublicationDesc()

    /**
     * Sentence: "Unlocks a Prestige layer for theories"
     * @returns {string}
     */
     static getUpgradePublicationInfo()

    /**
     * Sentence: '"Buy All" button'
     * @returns {string}
     */
     static getUpgradeBuyAllDesc()

    /**
     * Sentence: "Allows to buy all theory upgrades"
     * @returns {string}
     */
     static getUpgradeBuyAllInfo()

    /**
     * Sentence: "Upgrade auto-buyer"
     * @returns {string}
     */
     static getUpgradeAutoBuyerDesc()

    /**
     * Sentence: "Automatically purchases theory upgrades"
     * @returns {string}
     */
     static getUpgradeAutoBuyerInfo()

    /**
     * Sentence: "\\uparrow {paramName} by {amount}"
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeIncCustomDesc(paramName, amount)

    /**
     * Sentence: "Increases {paramName} by {amount}"
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeIncCustomInfo(paramName, amount)

    /**
     * Sentence: "\\times {paramName} by {amount}"
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeMultCustomDesc(paramName, amount)

    /**
     * Sentence: "Multiplies {paramName} by {amount}"
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeMultCustomInfo(paramName, amount)

    /**
     * Sentence: "\\uparrow {paramName} exponent by {amount}"
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeIncCustomExpDesc(paramName, amount)

    /**
     * Sentence: "Increases {paramName} exponent by {amount}"
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeIncCustomExpInfo(paramName, amount)

    /**
     * Sentence: 'Unlock "Chen Attractor"'
     * @returns {string}
     */
     static getUpgradeChenAttractor()

    /**
     * Sentence: 'Unlock "Rössler Attractor"'
     * @returns {string}
     */
     static getUpgradeRosslerAttractor()

    /**
     * Sentence: "Prove lemma {lemma}"
     * @param {number} lemma
     * @returns {number}
     */
     static getUpgradeProveLemma(lemma)

    /**
     * Sentence: "Theorem:"
     * @returns {string}
     */
     static getConvergenceTestTheorem()

    /**
     * Sentence: "Lemma {lemma}:"
     * @param {number} lemma
     * @returns {number}
     */
     static getConvergenceTestLemma(lemma)

    /**
     * Sentence: "Q.E.D."
     * @returns {string}
     */
     static getConvergenceTestQED()

    /**
     * Sentence: "Completion: {completion}%"
     * @param {number} completion
     * @returns {string}
     */
     static getConvergenceTestCompletion(completion)
}