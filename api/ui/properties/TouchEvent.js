import { TouchType } from "./TouchType";

/**
 * Properties of a touch event
 */
 export class TouchEvent {
    constructor() {
        /**
         * @type {TouchType}
         * @public
         */
        this.type;
        
        /**
         * The x position of the touch event relative to its parent
         * @type {number}
         * @public
         */
        this.x;
        
        /**
         * The y position of the touch event relative to its parent
         * @type {number}
         * @public
         */
        this.y;
        
        /**
         * The x position of the touch event relative to the whole app
         * @type {number}
         * @public
         */
        this.absoluteX;
        
        /**
         * The x position of the touch event relative to the whole app
         * @type {number}
         * @public
         */
        this.absoluteY;
    }
}