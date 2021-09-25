import { Color } from "./properties/Color";

/**
 * Switch view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.switch
 */
 export class Switch extends View {
    constructor() {
        /**
         * @type {Color}
         * @public
         */
        this.onColor;
        
        /**
         * @type {Color}
         * @public
         */
        this.thumbColor;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isToggled;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onToggled;
    }
}