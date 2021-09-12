/**
 * Properties of an in-game story chapter
 */
export class StoryChapter {
    constructor() {
        /**
         * Can only be modified if you own the story chapter.
         * Will not trigger the chapter when set to 'true'.
         * Only the unlock condition can trigger the chapter.
         * @type {boolean}
         * @public
         */
         this.isUnlocked;
    }
    
    /**
     * @returns {number} Unique id
     */
    get id();
    
    /**
     * @returns {String}
     */
    get title();
    
    /**
     * @returns {String}
     */
    get text();
}