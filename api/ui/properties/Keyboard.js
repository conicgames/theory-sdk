/**
 * Keyboard type of a UIEntry
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.keyboard
 */
 export class Keyboard {
    /** @returns {Keyboard} */ static get PLAIN();
    /** @returns {Keyboard} */ static get CHAT();
    /** @returns {Keyboard} */ static get DEFAULT();
    /** @returns {Keyboard} */ static get EMAIL();
    /** @returns {Keyboard} */ static get NUMERIC();
    /** @returns {Keyboard} */ static get TELEPHONE();
    /** @returns {Keyboard} */ static get TEXT();
    /** @returns {Keyboard} */ static get URL();
}