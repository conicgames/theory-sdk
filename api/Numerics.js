/**
  * @param {string} value
  * @returns {BigNumber}
  */
 export function parseBigNumber(value) { }

 /** @class */
 export class Rounding {
     /** @returns {Rounding} */ static get UP() { }
     /** @returns {Rounding} */ static get DOWN() { }
     /** @returns {Rounding} */ static get NEAREST() { }
 }
 
 /** @class */
 export class BigNumber {
     /** @returns {BigNumber} */ static get ZERO() {}
     /** @returns {BigNumber} */ static get ONE() {}
     /** @returns {BigNumber} */ static get TWO() {}
     /** @returns {BigNumber} */ static get TEN() {}
     /** @returns {BigNumber} */ static get HUNDRED() {}
     /** @returns {BigNumber} */ static get E() {}
     /** @returns {BigNumber} */ static get PI() {}
 
     /**
      * @param {number|string} value
      * @returns {BigNumber}
      */
     static from(value) {}
 
     /**
      * @param {string} value
      * @param {BigNumber} out_result
      * @returns {boolean}
      */
     static tryParse(value, out_result) {}
 
     /**
      * @returns {BigNumber}
      */
     clone() {}
 
     /**
      * @param {BigNumber} power
      * @returns {BigNumber}
      */
     pow(value) {}
 
     /**
      * @returns {BigNumber}
      */
     log() {}
 
     /**
      * @returns {BigNumber}
      */
     log2() {}
 
     /**
      * @returns {BigNumber}
      */
     log10() {}
 
     /**
      * @returns {BigNumber}
      */
     exp() {}
 
     /**
      * @returns {BigNumber}
      */
     exp10() {}
 
     /**
      * @returns {BigNumber}
      */
     sqrt() {}
 
     /**
      * @param {BigNumber} value
      * @returns {BigNumber}
      */
     min(value) {}
 
     /**
      * @param {BigNumber} value
      * @returns {BigNumber}
      */
     max(value) {}
 
     /**
      * @returns {BigNumber}
      */
     abs() {}
 
     /**
      * @returns {BigNumber}
      */
     round() {}
 
     /**
      * @returns {BigNumber}
      */
     floor() {}
 
     /**
      * @returns {BigNumber}
      */
     ceil() {}
 
     /**
      * @returns {number}
      */
     toNumber() {}
 
     /**
      * @param {number} [decimals]
      * @param {number} [maxDepth]
      * @param {Rounding} [rounding]
      * @returns {string}
      */
     toString(decimals, maxDepth, rounding) {}
 }
 
 /** @class */
 export class Vector3 {
	/** @constructor
	  * @param {number} x
	  * @param {number} y
	  * @param {number} z
	  */
	constructor(x, y, z) {
		/** @member {number} */
		this.x = x;
		/** @member {number} */
		this.y = y;
		/** @member {number} */
		this.z = z;
	}
	
    /**
     * @param {Vector3} value
     * @returns {Vector3}
     */
    min(value) {}
	
    /**
     * @param {Vector3} value
     * @returns {Vector3}
     */
    max(value) {}
	
    /**
     * @returns {number}
     */
    get length() {}
	
    /**
     * @returns {number}
     */
    get minComponent() {}
	
    /**
     * @returns {number}
     */
    get maxComponent() {}
}