import { Color } from "./properties/Color";
import { FontAttributes } from "./properties/FontAttributes";
import { FontFamily } from "./properties/FontFamily";
import { LineBreakMode } from "./properties/LineBreakMode";
import { TextAlignment } from "./properties/TextAlignment";
import { TextDecorations } from "./properties/TextDecorations";
import { Thickness } from "./properties/Thickness";

/**
 * Label view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.label
 */
 export class Label extends View {
    constructor() {
        /**
         * @type {number}
         * @public
         */
        this.characterSpacing;
        
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
         * @type {TextAlignment}
         * @public
         */
        this.horizontalTextAlignment;
        
        /**
         * @type {LineBreakMode}
         * @public
         */
        this.lineBreakMode;
        
        /**
         * @type {number}
         * @public
         */
        this.lineHeight;
        
        /**
         * @type {number}
         * @public
         */
        this.maxLines;
        
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
         * @type {TextDecorations}
         * @public
         */
        this.textDecorations;
        
        /**
         * @type {TextAlignment}
         * @public
         */
        this.verticalTextAlignment;
    }
}