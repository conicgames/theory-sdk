/**
 * Return type of a UIEntry
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.returntype
 */
 export class ReturnType {
    /** @returns {ReturnType} */ static get DEFAULT();
    /** @returns {ReturnType} */ static get DONE();
    /** @returns {ReturnType} */ static get GO();
    /** @returns {ReturnType} */ static get NEXT();
    /** @returns {ReturnType} */ static get SEARCH();
    /** @returns {ReturnType} */ static get SEND();
}