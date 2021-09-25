import { Aspect } from "./properties/Aspect";
import { ImageSource } from "./properties/ImageSource";

/**
 * Image view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.image
 */
 export class Image extends View {
    constructor() {
        /**
         * @type {Aspect}
         * @public
         */
        this.aspect;
        
        /**
         * @type {ImageSource}
         * @public
         */
        this.source;
        
        /**
         * @type {boolean}
         * @public
         */
        this.useTint;
    }
}