import { Thickness } from "./properties/Thickness";

/**
 * Layout view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout
 */
 export class Layout extends View {
    constructor() {
        /**
         * @type {boolean}
         * @public
         */
        this.cascadeInputTransparent;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isClippedToBounds;
        
        /**
         * @type {Thickness}
         * @public
         */
        this.padding;
        
        /**
         * @type {Array.<View>}
         * @public
         */
        this.children;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onLayoutChanged;
    }
}