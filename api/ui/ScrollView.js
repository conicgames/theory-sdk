import { ScrollBarVisibility } from "./properties/ScrollBarVisibility";
import { ScrollOrientation } from "./properties/ScrollOrientation";

/**
 * Scroll area view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.scrollview
 */
 export class ScrollView extends View {
    constructor() {
        /**
         * @type {View}
         * @public
         */
        this.content;
        
        /**
         * @type {ScrollBarVisibility}
         * @public
         */
        this.horizontalScrollBarVisibility;
        
        /**
         * @type {ScrollBarVisibility}
         * @public
         */
        this.verticalScrollBarVisibility;
        
        /**
         * @type {ScrollOrientation}
         * @public
         */
        this.orientation;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onScrolled;
    }

    /**
     * @returns {number}
     */
    get scrollX();

    /**
     * @returns {number}
     */
    get scrollY();
}