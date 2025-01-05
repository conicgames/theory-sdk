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
         * @type {number}
         * @public
         */
        this.opacity;
        
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
        this.onSizeChanged;
        
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

    /**
     * @param {number} value - Target value of 'opacity'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    fadeTo(value, length, easing);

    /**
     * @param {number} value - Relative target value of 'scale' (target = scale * value)
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    relScaleTo(value, length, easing);

    /**
     * @param {number} value - Target value of 'scale'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    scaleTo(value, length, easing);

    /**
     * @param {number} value - Target value of 'scaleX'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    scaleXTo(value, length, easing);

    /**
     * @param {number} value - Target value of 'scaleY'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    scaleYTo(value, length, easing);

    /**
     * @param {number} value - Target value of 'rotation' (target = rotation + value)
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    relRotateTo(value, length, easing);

    /**
     * @param {number} value - Target value of 'rotation'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    rotateTo(value, length, easing);

    /**
     * @param {number} value - Target value of 'rotationX'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    rotateXTo(value, length, easing);

    /**
     * @param {number} value - Target value of 'rotationY'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    rotateYTo(value, length, easing);

    /**
     * @param {number} valueX - Target value of 'translationX'
     * @param {number} valueY - Target value of 'translationY'
     * @param {number} length - Time milliseconds to reach the target value
     * @param {Easing} [easing] - Type of smoothing to apply to the transition. Default: Easing.LINEAR
     */
    translateTo(valueX, valueY, length, easing);
}