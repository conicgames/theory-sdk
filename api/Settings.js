export class Theme {
    /** @returns {Theme} */ static get STANDARD();
    /** @returns {Theme} */ static get DARK();
    /** @returns {Theme} */ static get LIGHT();
}

export class GraphQuality {
    /** @returns {GraphQuality} */ static get LOW();
    /** @returns {GraphQuality} */ static get MEDIUM();
    /** @returns {GraphQuality} */ static get HIGH();
}

export class AcceleratorPosition {
    /** @returns {AcceleratorPosition} */ static get BOTTOM();
    /** @returns {AcceleratorPosition} */ static get TOP();
}

/**
 * Settings of the game.
 */
 export class Settings {
    constructor() {
        /**
         * @type {Theme}
         * @public
         */
        this.theme;
        
        /**
         * @type {GraphQuality}
         * @public
         */
        this.graphQuality;
        
        /**
         * @type {AcceleratorPosition}
         * @public
         */
        this.acceleratorPosition;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isOfflineProgressEnabled;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isSoundEnabled;
        
        /**
         * @type {boolean}
         * @public
         */
        this.isMusicEnabled;
    }
}