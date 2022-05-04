/**
 * Holds a representation of a 3D vector.
 */
export class Vector3 {
    /** @constructor
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} z - Z coordinate
     */
    constructor(x, y, z) {
        /**
         * @type {number} X coordinate
         * @public
         */
        this.x = x;

        /**
         * @type {number} Y coordinate
         * @public
         */
        this.y = y;

        /**
         * @type {number} Z coordinate
         * @public
         */
        this.z = z;
    }
    
    /**
     * @param {Vector3} value
     * @returns {Vector3} Component-wise minimum between 'this' and value
     */
    min(value);
    
    /**
     * @param {Vector3} value
     * @returns {Vector3} Component-wise maximum between 'this' and value
     */
    max(value);
    
    /**
     * @returns {number} Norm of the vector
     */
    get length();
    
    /**
     * @returns {number} Minimum component of the vector
     */
    get minComponent();
    
    /**
     * @returns {number} Maximum component of the vector
     */
    get maxComponent();
}