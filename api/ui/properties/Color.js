/**
 * Color Properties
 */
 export class Color {
    /** @returns {Color} */ static get DEFAULT();
    /** @returns {Color} */ static get TRANSPARENT();
    /** @returns {Color} */ static get DARK_BACKGROUND();
    /** @returns {Color} */ static get MEDIUM_BACKGROUND();
    /** @returns {Color} */ static get LIGHT_BACKGROUND();
    /** @returns {Color} */ static get BORDER();
    /** @returns {Color} */ static get TEXT();
    /** @returns {Color} */ static get TEXT_MEDIUM();
    /** @returns {Color} */ static get TEXT_DARK();
    /** @returns {Color} */ static get DEACTIVATED_UPGRADE();
    /** @returns {Color} */ static get MINIGAME_TILE_DARK();
    /** @returns {Color} */ static get MINIGAME_TILE_LIGHT();
    /** @returns {Color} */ static get MINIGAME_TILE_BORDER();
    /** @returns {Color} */ static get SELECTION_DESELECTED();
    /** @returns {Color} */ static get SELECTION_SELECTED();
    /** @returns {Color} */ static get SWITCH_BACKGROUND();
    /** @returns {Color} */ static get ACHIEVEMENT_CATEGORY();

    /**
     * @param {number} r - Red value in [0,1]
     * @param {number} g - Green value in [0,1]
     * @param {number} b - Blue value in [0,1]
     * @returns {Color}
     * */
    static fromRgb(r, g, b);

    /**
     * @param {number} r - Red value in [0,1]
     * @param {number} g - Green value in [0,1]
     * @param {number} b - Blue value in [0,1]
     * @param {number} a - Alpha value in [0,1]
     * @returns {Color}
     * */
    static fromRgba(r, g, b, a);
    
    /**
     * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color.fromhex?view=xamarin-forms#Xamarin_Forms_Color_FromHex_System_String_
     * @param {string} hex - Hexadecimal value
     * @returns {Color}
     * */
     static fromHex(hex);
}