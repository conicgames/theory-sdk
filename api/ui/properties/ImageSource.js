/**
 * Image source for a UIImage
 */
 export class ImageSource {
    /** @returns {ImageSource} */ static get ASPECT_FILL();
    /** @returns {ImageSource} */ static get ACCELERATE();
    /** @returns {ImageSource} */ static get ACHIEVEMENTS();
    /** @returns {ImageSource} */ static get ARROW_120();
    /** @returns {ImageSource} */ static get ARROW_90();
    /** @returns {ImageSource} */ static get CHANGE();
    /** @returns {ImageSource} */ static get CHECKLIST();
    /** @returns {ImageSource} */ static get CLOSE();
    /** @returns {ImageSource} */ static get COPY();
    /** @returns {ImageSource} */ static get ELLIPSIS();
    /** @returns {ImageSource} */ static get EYE();
    /** @returns {ImageSource} */ static get FAST_FORWARD();
    /** @returns {ImageSource} */ static get FUNCTION();
    /** @returns {ImageSource} */ static get INFO();
    /** @returns {ImageSource} */ static get LANGUAGE();
    /** @returns {ImageSource} */ static get LOCK();
    /** @returns {ImageSource} */ static get MINUS();
    /** @returns {ImageSource} */ static get PLUS();
    /** @returns {ImageSource} */ static get PRESTIGE();
    /** @returns {ImageSource} */ static get PUBLISH();
    /** @returns {ImageSource} */ static get REFUND();
    /** @returns {ImageSource} */ static get RESET();
    /** @returns {ImageSource} */ static get REWARDS();
    /** @returns {ImageSource} */ static get SECRET();
    /** @returns {ImageSource} */ static get SETTINGS();
    /** @returns {ImageSource} */ static get STAR_EMPTY();
    /** @returns {ImageSource} */ static get STAR_FULL();
    /** @returns {ImageSource} */ static get STUDENTS();
    /** @returns {ImageSource} */ static get ENTRY();
    /** @returns {ImageSource} */ static get THEORY();
    /** @returns {ImageSource} */ static get UP_DOWN_ARROWS();
    /** @returns {ImageSource} */ static get UPGRADES();
    /** @returns {ImageSource} */ static get WARNING();

    /**
     * @param {string} uri - The URI of the image
     * @param {number} [useCache] - Specifies is the image can be cached. Default: true.
     * @returns {ImageSource}
     */
    fromUri(uri, useCache);
}