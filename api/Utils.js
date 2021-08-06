import { BigNumber } from "./Numerics.js";

/**
  * @param {Object} message
  */
export function log(message) {}

/** @class */
export class Utils {
    /**
     * @param {string} value
     * @returns {string}
     */
    static getMath(value) { }

    /**
     * @param {string} valueLeft
     * @param {string} valueRight
     * @returns {string}
     */
    static getMathTo(valueLeft, valueRight) { }

    /**
     * @param {number} level
     * @param {number} basePower
     * @param {number} stepLength
     * @param {number} offset
     * @returns {BigNumber}
     */
    static getStepwisePowerSum(level, basePower, stepLength, offset) { }
}

/** @class */
export class Localization {
    /**
     * @param {string} text
     * @param {...object} args
     * @returns {string}
     */
    static format(text, args) { }

    /**
     * @param {string} key
     * @returns {string}
     */
     static get(key) { }

    /**
     * @param {string} term
     * @returns {string}
     */
     static getUpgradeUnlock(term)

    /**
     * @param {string} term
     * @returns {string}
     */
     static getUpgradeUnlockDesc(term)

    /**
     * @param {string} term
     * @returns {string}
     */
     static getUpgradeAddTerm(term)

    /**
     * @param {string} term
     * @returns {string}
     */
     static getUpgradeAddTermDesc(term)

    /**
     * @returns {string}
     */
     static getUpgradeAddDimension()

    /**
     * @returns {string}
     */
     static getUpgradeAddDimensionDesc()

    /**
     * @returns {string}
     */
     static getUpgradePublication()

    /**
     * @returns {string}
     */
     static getUpgradePublicationDesc()

    /**
     * @returns {string}
     */
     static getUpgradeBuyAll()

    /**
     * @returns {string}
     */
     static getUpgradeBuyAllDesc()

    /**
     * @returns {string}
     */
     static getUpgradeAutoBuyer()

    /**
     * @returns {string}
     */
     static getUpgradeAutoBuyerDesc()

    /**
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeIncCustom(paramName, amount)

    /**
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeIncCustomDesc(paramName, amount)

    /**
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeMultCustom(paramName, amount)

    /**
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeMultCustomDesc(paramName, amount)

    /**
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeIncCustomExp(paramName, amount)

    /**
     * @param {string} paramName
     * @param {string} amount
     * @returns {string}
     */
     static getUpgradeIncCustomExpDesc(paramName, amount)

    /**
     * @returns {string}
     */
     static getUpgradeChenAttractor()

    /**
     * @returns {string}
     */
     static getUpgradeRosslerAttractor()

    /**
     * @param {number} lemma
     * @returns {number}
     */
     static getUpgradeProveLemma(lemma)

    /**
     * @returns {string}
     */
     static getConvergenceTestTheorem()

    /**
     * @param {number} lemma
     * @returns {number}
     */
     static getConvergenceTestLemma(lemma)

    /**
     * @returns {string}
     */
     static getConvergenceTestQED()

    /**
     * @param {number} completion
     * @returns {string}
     */
     static getConvergenceTestCompletion(completion)
}