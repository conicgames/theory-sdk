/**
 * Font family of a UIButton, a UIEntry, or a UILabel
 */
 export class FontFamily {
    /** 
     * Default OS Font
     * @returns {FontFamily}
     */
    static get DEFAULT();

    /** 
     * LaTeX font for text
     * @returns {FontFamily}
     */
    static get CMU_REGULAR();

    /** 
     * Specialized LaTeX font for numbers
     * @returns {FontFamily}
     */
     static get CMU_NUMBERS();

    /** 
     * Bold LaTeX font for text
     * @returns {FontFamily}
     */
     static get CMU_BOLD();
}