import { Color } from "./properties/Color";
import { FontAttributes } from "./properties/FontAttributes";
import { FontFamily } from "./properties/FontFamily";
import { Thickness } from "./properties/Thickness";

/**
 * Button view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button
 */
 export class Button extends View {
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
        this.borderWidth;
        
        /**
         * @type {number}
         * @public
         */
        this.cornerRadius;
        
        /**
         * @type {FontAttributes}
         * @public
         */
        this.fontAttributes;
        
        /**
         * @type {FontFamily}
         * @public
         */
        this.fontFamily;
        
        /**
         * @type {number}
         * @public
         */
        this.fontSize;
        
        /**
         * @type {Thickness}
         * @public
         */
        this.padding;
        
        /**
         * @type {string}
         * @public
         */
        this.text;
        
        /**
         * @type {Color}
         * @public
         */
        this.textColor;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onClicked;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onPressed;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onReleased;
    }
}