import { ActivityIndicator } from "./ActivityIndicator";
import { Box } from "./Box";
import { Button } from "./Button";
import { CheckBox } from "./CheckBox";
import { Entry } from "./Entry";
import { Frame } from "./Frame";
import { Grid } from "./Grid";
import { Image } from "./Image";
import { Label } from "./Label";
import { LatexLabel } from "./LatexLabel";
import { Popup } from "./Popup";
import { ProgressBar } from "./ProgressBar";
import { ScrollView } from "./ScrollView";
import { StackLayout } from "./StackLayout";
import { Switch } from "./Switch";

/**
 * Class to create UI elements
 */
 export class UI {

    /**
     * @param {Object.<string,Object>} parameters
     * @returns {ActivityIndicator}
     */
    createActivityIndicator(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Box}
     */
    createBox(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Button}
     */
    createButton(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {CheckBox}
     */
    createCheckBox(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Entry}
     */
    createEntry(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Frame}
     */
    createFrame(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Grid}
     */
    createGrid(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Image}
     */
    createImage(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Label}
     */
    createLabel(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {LatexLabel}
     */
    createLatexLabel(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Popup}
     */
    createPopup(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {ProgressBar}
     */
    createProgressBar(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {ScrollView}
     */
    createScrollView(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {StackLayout}
     */
    createStackLayout(parameters);
    
    /**
     * @param {Object.<string,Object>} parameters
     * @returns {Switch}
     */
    createSwitch(parameters);

    /**
     * @returns {number}
     */
    get screenWidth();

    /**
     * @returns {number}
     */
    get screenHeight();
    
    /**
     * Display a popup with the custom theory achievement.
     * Cannot be display while calculating offline progress or
     * if there are no achievements.
     */
    showCustomTheoryAchievements();
    
     /**
      * Display a popup with the custom theory story chapters.
      * Cannot be display while calculating offline progress or
      * if there are no story chapters.
      */
    showCustomTheoryStory();
}

/**
 * Instance of the UI.
 * @type {UI}
 */
export var ui;