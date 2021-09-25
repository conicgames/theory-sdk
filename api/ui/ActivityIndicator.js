import { Color } from "./properties/Color";

/**
 * Activity Indicator view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.activityindicator
 */
 export class ActivityIndicator extends View {
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
        this.isRunning;
    }
}