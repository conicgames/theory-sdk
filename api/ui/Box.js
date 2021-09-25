import { Color } from "./properties/Color";
import { CornerRadius } from "./properties/CornerRadius";

/**
 * Box view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.boxview
 */
 export class Box extends View {
    constructor() {
        /**
         * @type {CornerRadius}
         * @public
         */
        this.cornerRadius;
        
        /**
         * @type {Color}
         * @public
         */
        this.color;
    }
}