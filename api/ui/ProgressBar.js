import { Color } from "./properties/Color";

/**
 * Progress bar view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.progressbar
 */
 export class ProgressBar extends View {
    constructor() {
        /**
         * @type {Color}
         * @public
         */
        this.progressColor;
        
        /**
         * @type {number}
         * @public
         */
        this.progress;
    }
}