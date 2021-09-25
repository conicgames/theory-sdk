/**
 * Special length properties for UIGrid rows and columns
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.gridlength
 */
 export class GridLength {
    /**
     * See: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.gridlength.star?view=xamarin-forms#Xamarin_Forms_GridLength_Star
     * @returns {number}
     */
    static get STAR();

    /**
     * Reference: https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.gridlength.auto?view=xamarin-forms#Xamarin_Forms_GridLength_Auto
     * @returns {number}
     */
    static get AUTO();
}