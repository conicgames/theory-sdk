import { Color } from "./properties/Color";
import { ImageSource } from "./properties/ImageSource";

/**
 * Slider view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.slider
 */
 export class Slider extends View {
    constructor() {
        /**
         * @type {number}
         * @public
         */
        this.minimum;
        
        /**
         * @type {number}
         * @public
         */
        this.maximum;

        /**
         * @type {number}
         * @public
         */
        this.value;
        
        /**
         * @type {Color}
         * @public
         */
        this.minimumTrackColor;
        
        /**
         * @type {Color}
         * @public
         */
        this.maximumTrackColor;
        
        /**
         * @type {Color}
         * @public
         */
        this.thumbColor;
        
        /**
         * @type {ImageSource}
         * @public
         */
        this.thumbImageSource;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onValueChanged;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onDragStarted;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onDragCompleted;
    }
}