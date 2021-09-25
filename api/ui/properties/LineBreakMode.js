/**
 * Line break mode of a UILabel
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.linebreakmode
 */
 export class LineBreakMode {
    /** @returns {LineBreakMode} */ static get NO_WRAP();
    /** @returns {LineBreakMode} */ static get WORD_WRAP();
    /** @returns {LineBreakMode} */ static get CHARACTER_WRAP();
    /** @returns {LineBreakMode} */ static get HEAD_TRUNCATION();
    /** @returns {LineBreakMode} */ static get MIDDLE_TRUNCATION();
    /** @returns {LineBreakMode} */ static get TAIL_TRUNCATION();
}