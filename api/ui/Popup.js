/**
 * Popup view
 */
 export class Popup extends View {
    constructor() {
        /**
         * @type {string}
         * @public
         */
        this.title;

        /**
         * @type {boolean}
         * @public
         */
        this.closeOnBackgroundClicked;

        /**
         * @type {boolean}
         * @public
         */
        this.closeOnBackButtonClicked;

        /**
         * @type {boolean}
         * @public
         */
        this.isPeekable;
        
        /**
         * @type {View}
         * @public
         */
        this.content;
        
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
    }

    /**
     * Display the popup
     */
    show();

    /**
     * Hide the popup
     */
    hide();
}