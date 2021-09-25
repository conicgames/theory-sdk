/**
 * Corner radius of a UIBox
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.cornerradius
 */
 export class CornerRadius {
    /**
     * If only one parameter is provided, the value is used for all corners.
     * You must provide either 1 or 4 parameters.
     * @param {number} topLeft
     * @param {number} [topRight] 
     * @param {number} [bottomLeft] 
     * @param {number} [bottomRight] 
     */
    constructor(topLeft, topRight, bottomLeft, bottomRight) {
        /**
         * @type {number}
         * @public
         */
        this.topLeft;
        
        /**
         * @type {number}
         * @public
         */
        this.topRight;
        
        /**
         * @type {number}
         * @public
         */
        this.bottomLeft;
        
        /**
         * @type {number}
         * @public
         */
        this.bottomRight;
    }
}