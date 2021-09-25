/**
 * Touch type of a TouchEvent
 */
 export class TouchType {
    /** @returns {TouchType} */ static get ENTERED();
    /** @returns {TouchType} */ static get EXITED();
    /** @returns {TouchType} */ static get MOVED();
    /** @returns {TouchType} */ static get PRESSED();
    /** @returns {TouchType} */ static get SHORTPRESS_RELEASED();
    /** @returns {TouchType} */ static get LONGPRESS();
    /** @returns {TouchType} */ static get LONGPRESS_RELEASED();
    /** @returns {TouchType} */ static get CANCELLED();

    /**
     * @returns {boolean} true if the type is either SHORTPRESS_RELEASED, LONGPRESS_RELEASED, or CANCELLED.
     */
    isReleased();
}