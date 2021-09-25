/**
 * Grid layout
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.grid
 */
 export class Grid extends Layout {
    constructor() {
        /**
         * @type {Array.<number>}
         * @public
         */
        this.columnDefinitions;
        
        /**
         * @type {number}
         * @public
         */
        this.columnSpacing;
        
        /**
         * @type {Array.<number>}
         * @public
         */
        this.rowDefinitions;
        
        /**
         * @type {number}
         * @public
         */
        this.rowSpacing;
    }
}