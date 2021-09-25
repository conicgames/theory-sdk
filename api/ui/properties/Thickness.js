/**
 * Thickness of "padding" and "margin" properties
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.thickness
 */
 export class Thickness {
    /**
     * If 1 parameter is provided, the value is used for all sides.
     * If 2 parameters are provided, the first value is used for left/right
     * and the second value is used for top/bottom.
     * You must provide either 1, 2, or 4 parameters.
     * @param {number} left
     * @param {number} [top] 
     * @param {number} [right] 
     * @param {number} [bottom] 
     */
    constructor(left, top, right, bottom) {
        /**
         * @type {number}
         * @public
         */
        this.left;
        
        /**
         * @type {number}
         * @public
         */
        this.top;
        
        /**
         * @type {number}
         * @public
         */
        this.right;
        
        /**
         * @type {number}
         * @public
         */
        this.bottom;
    }
}