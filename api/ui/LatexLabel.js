import { Color } from "./properties/Color";
import { TextAlignment } from "./properties/TextAlignment";
import { Thickness } from "./properties/Thickness";

/**
 * LaTeX label view
 * Reference: https://github.com/verybadcat/CSharpMath
 */
 export class LatexLabel extends View {
    constructor() {
        /**
         * @type {number}
         * @public
         */
        this.displacementX;
        
        /**
         * @type {number}
         * @public
         */
        this.displacementY;
        
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
         * @type {number}
         * @public
         */
        this.magnification;
        
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
         * @type {TextAlignment}
         * @public
         */
        this.verticalTextAlignment;
    }
}