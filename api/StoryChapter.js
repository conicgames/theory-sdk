/**
 * Properties of an in-game story chapter
 */
export class StoryChapter {
    /**
     * @returns {number} Unique id
     */
    get id();
    
    /**
     * @returns {boolean}
     */
    get isUnlocked();
    
    /**
     * @returns {String}
     */
    get title();
    
    /**
     * @returns {String}
     */
    get text();
}