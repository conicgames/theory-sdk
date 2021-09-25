import { Color } from "./properties/Color";

/**
 * CheckBox view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.checkbox
 */
 export class CheckBox extends View {
    constructor() {
        /**
         * @type {Color}
         * @public
         */
        this.color;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isChecked;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onCheckedChanged;
    }
}