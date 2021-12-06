import { ClearButtonVisibility } from "./properties/ClearButtonVisibility";
import { FontAttributes } from "./properties/FontAttributes";
import { FontFamily } from "./properties/FontFamily";
import { Keyboard } from "./properties/Keyboard";
import { ReturnType } from "./properties/ReturnType";
import { TextAlignment } from "./properties/TextAlignment";

/**
 * Entry view
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entry
 */
 export class Entry extends View {
    constructor() {
        /**
         * @type {number}
         * @public
         */
        this.characterSpacing;
        
        /**
         * @type {ClearButtonVisibility}
         * @public
         */
        this.clearButtonVisibility;
        
        /**
         * @type {number}
         * @public
         */
        this.cursorPosition;
        
        /**
         * @type {FontAttributes}
         * @public
         */
        this.fontAttributes;
        
        /**
         * @type {FontFamily}
         * @public
         */
        this.fontFamily;
        
        /**
         * @type {number}
         * @public
         */
        this.fontSize;
        
        /**
         * @type {TextAlignment}
         * @public
         */
        this.horizontalTextAlignment;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isPassword;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isReadOnly;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isSpellCheckEnabled;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isTextPredictionEnabled;
        
        /**
         * @type {Keyboard}
         * @public
         */
        this.keyboard;
        
        /**
         * @type {number}
         * @public
         */
        this.maxLength;
        
        /**
         * @type {function(void):void}
         * @public
         */
        this.onCompleted;
        
        /**
         * @type {function(string, string):void} Parameters: (oldTextValue, newTextValue) 
         * @public
         */
        this.onTextChanged;
        
        /**
         * @type {string}
         * @public
         */
        this.placeholder;
        
        /**
         * @type {Color}
         * @public
         */
        this.placeholderColor;
        
        /**
         * @type {ReturnType}
         * @public
         */
        this.returnType;
        
        /**
         * @type {number}
         * @public
         */
        this.selectionLength;
        
        /**
         * @type {string}
         * @public
         */
        this.text;
        
        /**
         * @type {Color}
         * @public
         */
        this.textColor;
        
        /**
         * @type {TextAlignment}
         * @public
         */
        this.verticalTextAlignment;
    }
}