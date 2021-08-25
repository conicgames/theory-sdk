 /**
 * Similar to parseFloat, decode a string into a BigNumber.
 * Accepted format are one of the following forms:
 *   123.456
 *   1.234e56
 *   1.234e-12
 *   e56
 *   ee123.456
 * Note: Number can be negative.
 * @param {String} value
 * @returns {BigNumber}
 */
export function parseBigNumber(value);

/**
 * Defines the accepted rounding rules for converting a BigNumber
 * to a string using the 'toString' method.
 */
export class Rounding {
    /** @returns {Rounding} */ static get UP();
    /** @returns {Rounding} */ static get DOWN();
    /** @returns {Rounding} */ static get NEAREST();
}
 
/**
 * Holds a representation of an arbitrarily large number.
 */
export class BigNumber {
    /** @returns {BigNumber} */ static get ZERO();
    /** @returns {BigNumber} */ static get ONE();
    /** @returns {BigNumber} */ static get TWO();
    /** @returns {BigNumber} */ static get TEN();
    /** @returns {BigNumber} */ static get HUNDRED();
    /** @returns {BigNumber} */ static get E();
    /** @returns {BigNumber} */ static get PI();

    /**
     * Converts a native number or a string to a BigNumber
     * @param {number|string} value
     * @returns {BigNumber}
     */
    static from(value);

    /**
     * Tries to convert a string to a BigNumber.
     * Alternative: parseBigNumber(value).
     * @param {String} value
     * @param {BigNumber} out_result This value will be overwritten
     * @returns {boolean} Success = true, Failure = false
     */
    static tryParse(value, out_result);

    /**
     * @returns {BigNumber} A copy of the instance
     */
    clone();

    /**
     * @param {BigNumber} value
     * @returns {BigNumber} this^value
     */
    pow(value);

    /**
     * @returns {BigNumber} Natural logarithm of 'this'
     */
    log();

    /**
     * @returns {BigNumber} Base 2 logarithm of 'this'
     */
    log2();

    /**
     * @returns {BigNumber} Base 10 logarithm of 'this'
     */
    log10();

    /**
     * @returns {BigNumber} e^this
     */
    exp();

    /**
     * @returns {BigNumber} 10^this
     */
    exp10();

    /**
     * @returns {BigNumber} Square root of 'this'
     */
    sqrt();

    /**
     * @param {BigNumber} value
     * @returns {BigNumber} Minimum between 'this' and value
     */
    min(value);

    /**
     * @param {BigNumber} value
     * @returns {BigNumber} Maximum between 'this' and value
     */
    max(value);

    /**
     * @returns {BigNumber} Absolute value of 'this'
     */
    abs();

    /**
     * This only applies to values less than 1e6.
     * @returns {BigNumber} Nearest integer
     */
    round();

    /**
     * This only applies to values less than 1e6
     * @returns {BigNumber} Greatest integer less than or equal to 'this'
     */
    floor();

    /**
     * This only applies to values less than 1e6
     * @returns {BigNumber} Least integer greater than or equal to 'this'
     */
    ceil();

    /**
     * Convert a BigNumber to a native number. If 'this' cannot be contained
     * in a native number, 'infinity' is returned.
     * @returns {number}
     */
    toNumber();

    /**
     * Converts a BigNumber to a string.
     * @param {number} [decimals] The maximum number of decimals when below 1e6.
     * @param {number} [maxDepth] The maximum of 'e' to use, e.g., 1 means that it shows 1e1000000 instead of ee6.
     * @param {Rounding} [rounding] The rounding rule for decimals at any scale.
     * @returns {String}
     */
    toString(decimals, maxDepth, rounding);
}