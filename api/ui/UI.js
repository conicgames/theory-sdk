import { ActivityIndicator } from "./ActivityIndicator";

/**
 * Class to create UI elements
 */
 export class UI {

    /**
     * @param {Object.<string,Object>}
     * @returns {ActivityIndicator}
     */
    createActivityIndicator(parameters);
    createBox(parameters);
    createButton(parameters);
    createCheckBox(parameters);
    createEntry(parameters);
    createFrame(parameters);
    createGrid(parameters);
    createImage(parameters);
    createLabel(parameters);
    createLatexLabel(parameters);
    createPopup(parameters);
    createProgressBar(parameters);
    createScrollView(parameters);
    createStackLayout(parameters);
    createSwitch(parameters);
}

/**
 * Instance of the UI.
 * @type {UI}
 */
export var ui;