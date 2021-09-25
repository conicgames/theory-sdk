import { Color } from "./properties/Color";

/**
 * Frame layout
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame
 */
 export class Frame extends Layout {
    constructor() {
        /**
         * @type {Color}
         * @public
         */
        this.borderColor;
        
        /**
         * @type {number}
         * @public
         */
        this.cornerRadius;
        
        /**
         * @type {boolean}
         * @public
         */
        this.hasShadow;
        
        /**
         * @type {View}
         * @public
         */
        this.content;
    }
}