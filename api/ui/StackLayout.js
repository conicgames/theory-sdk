import { StackOrientation } from "./properties/StackOrientation";

/**
 * Stack layout
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.stacklayout
 */
 export class StackLayout extends Layout {
    constructor() {
        /**
         * @type {StackOrientation}
         * @public
         */
        this.orientation;
        
        /**
         * @type {number}
         * @public
         */
        this.spacing;
    }
}