/**
 * Provide localization support for sentences that are already translated in the game.
 */
export class Localization {
    /**
     * Provides safe formatting using C# syntax.
     * @param {String} text - Templated literal, e.g., "Increase {0} by {1}"
     * @param {...object} args - Values to use in place of {0} and {1}
     * @returns {String}
     */
    static format(text, args);

    /**
     * Access to the translation service of the game.
     * @param {String} id - ID from the translation source document
     * @returns {String} Translated sentence from the game
     */
    static get(id);

    /**
     * @returns {string} Language code of the game selected by the player
     */
    static get language();

    /**
     * @returns {boolean} Is the current active language Right-to-Left?
     */
    static get isRTL();

    /**
     * Sentence: "Unlock {term}"
     * @param {String} term
     * @returns {String}
     */
    static getUpgradeUnlockDesc(term)

    /**
     * Sentence: "Unlocks {term}"
     * @param {String} term
     * @returns {String}
     */
    static getUpgradeUnlockInfo(term)

    /**
     * Sentence: "Add the term {term}"
     * @param {String} term
     * @returns {String}
     */
    static getUpgradeAddTermDesc(term)

    /**
     * Sentence: "Adds term {term} to the equation"
     * @param {String} term
     * @returns {String}
     */
    static getUpgradeAddTermInfo(term)

    /**
     * Sentence: "Add a new dimension"
     * @returns {String}
     */
    static getUpgradeAddDimensionDesc()

    /**
     * Sentence: "Adds a new dimension to the linear space"
     * @returns {String}
     */
    static getUpgradeAddDimensionInfo()

    /**
     * Sentence: "Unlock Publications"
     * @returns {String}
     */
    static getUpgradePublicationDesc()

    /**
     * Sentence: "Unlocks a Prestige layer for theories"
     * @returns {String}
     */
    static getUpgradePublicationInfo()

    /**
     * Sentence: '"Buy All" button'
     * @returns {String}
     */
    static getUpgradeBuyAllDesc()

    /**
     * Sentence: "Allows to buy all theory upgrades"
     * @returns {String}
     */
    static getUpgradeBuyAllInfo()

    /**
     * Sentence: "Upgrade auto-buyer"
     * @returns {String}
     */
    static getUpgradeAutoBuyerDesc()

    /**
     * Sentence: "Automatically purchases theory upgrades"
     * @returns {String}
     */
    static getUpgradeAutoBuyerInfo()

    /**
     * Sentence: "\\uparrow {paramName} by {amount}"
     * @param {String} paramName
     * @param {String} amount
     * @returns {String}
     */
    static getUpgradeIncCustomDesc(paramName, amount)

    /**
     * Sentence: "Increases {paramName} by {amount}"
     * @param {String} paramName
     * @param {String} amount
     * @returns {String}
     */
    static getUpgradeIncCustomInfo(paramName, amount)

    /**
     * Sentence: "\\times {paramName} by {amount}"
     * @param {String} paramName
     * @param {String} amount
     * @returns {String}
     */
    static getUpgradeMultCustomDesc(paramName, amount)

    /**
     * Sentence: "Multiplies {paramName} by {amount}"
     * @param {String} paramName
     * @param {String} amount
     * @returns {String}
     */
    static getUpgradeMultCustomInfo(paramName, amount)

    /**
     * Sentence: "\\downarrow {paramName} by {amount}"
     * @param {String} paramName
     * @param {String} amount
     * @returns {String}
     */
    static getUpgradeDecCustomDesc(paramName, amount)

    /**
     * Sentence: "Decreases {paramName} by {amount}"
     * @param {String} paramName
     * @param {String} amount
     * @returns {String}
     */
    static getUpgradeDecCustomInfo(paramName, amount)

    /**
     * Sentence: "\\uparrow {paramName} exponent by {amount}"
     * @param {String} paramName
     * @param {String} amount
     * @returns {String}
     */
    static getUpgradeIncCustomExpDesc(paramName, amount)

    /**
     * Sentence: "Increases {paramName} exponent by {amount}"
     * @param {String} paramName
     * @param {String} amount
     * @returns {String}
     */
    static getUpgradeIncCustomExpInfo(paramName, amount)

    /**
     * Sentence: 'Unlock "Chen Attractor"'
     * @returns {String}
     */
    static getUpgradeChenAttractor()

    /**
     * Sentence: 'Unlock "Rössler Attractor"'
     * @returns {String}
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
     * @returns {String}
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
     * @returns {String}
     */
    static getConvergenceTestQED()

    /**
     * Sentence: "Completion: {completion}%"
     * @param {number} completion
     * @returns {String}
     */
    static getConvergenceTestCompletion(completion)
}