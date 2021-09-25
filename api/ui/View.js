import { Color } from "./properties/Color";
import { LayoutOptions } from "./properties/LayoutOptions";
import { Thickness } from "./properties/Thickness";
import { TouchEvent } from "./properties/TouchEvent";

/**
 * Base view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view
 */
 export class View {
    constructor() {
        /**
         * @type {number}
         * @public
         */
        this.anchorX;
        
        /**
         * @type {number}
         * @public
         */
        this.anchorY;
        
        /**
         * @type {Color}
         * @public
         */
        this.backgroundColor;
        
        /**
         * @type {boolean}
         * @public
         */
        this.inputTransparent;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isEnabled;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isVisible;
        
        /**
         * @type {Thickness}
         * @public
         */
        this.margin;
        
        /**
         * @type {LayoutOptions}
         * @public
         */
        this.horizontalOptions;
        
        /**
         * @type {LayoutOptions}
         * @public
         */
        this.verticalOptions;
        
        /**
         * @type {number}
         * @public
         */
        this.widthRequest;
        
        /**
         * @type {number}
         * @public
         */
        this.heightRequest;
        
        /**
         * @type {number}
         * @public
         */
        this.minimumWidthRequest;
        
        /**
         * @type {number}
         * @public
         */
        this.minimumHeightRequest;
        
        /**
         * @type {number}
         * @public
         */
        this.rotation;
        
        /**
         * @type {number}
         * @public
         */
        this.rotationX;
        
        /**
         * @type {number}
         * @public
         */
        this.rotationY;
        
        /**
         * @type {number}
         * @public
         */
        this.scale;
        
        /**
         * @type {number}
         * @public
         */
        this.scaleX;
        
        /**
         * @type {number}
         * @public
         */
        this.scaleY;
        
        /**
         * @type {number}
         * @public
         */
        this.translationX;
        
        /**
         * @type {number}
         * @public
         */
        this.translationY;
        
        /**
         * @type {number}
         * @public
         */
        this.row;
        
        /**
         * @type {number}
         * @public
         */
        this.column;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onAppearing;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onDisappearing;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onSizeAllocated;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onSizeChanged;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onLayoutChanged;
        
        /**
         * @type {function(TouchEvent):void}
         * @public
         */
        this.onTouched;
    }
    
    /**
     * @returns {number}
     */
    get width();

    /**
     * @returns {number}
     */
    get height();
    
    /**
     * @returns {number}
     */
    get x();

    /**
     * @returns {number}
     */
    get y();
}