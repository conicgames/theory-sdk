import { Color } from "./properties/Color";
import { Easing } from "./properties/Easing";

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

    /**
     * @param {number} value - Target value of 'progress'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    progressTo(value, length, easing);
}