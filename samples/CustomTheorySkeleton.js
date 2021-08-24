/**
 * A unique ID for the theory.
 * @global {String}
 */
let id;

/**
 * Name of the theory. Displayed on the top of the equation.
 * @global {String}
 */
let name;

/**
 * The API level used by this script.
 * @global {String}
 */
let api;

/**
 * The version of the script. Used for backward compatibility.
 * @global {String}
 */
let version;

/**
 * Update the availability of each upgrade using their dependencies.
 */
function updateAvailability() { }

/**
 * Performs a single update tick by updating all currencies.
 * @param {number} elapsedTime Real elapsed time since last tick
 * @param {number} multiplier Multiplier to the elapsed time to account for rewards. (either 1 or 1.5)
 */
function tick(elapsedTime, multiplier) { }

/**
 * Main formula.
 * @returns {String} LaTeX equation
 */
function getPrimaryEquation() { }

/**
 * Formula right below the main one.
 * @returns {String} LaTeX equation
 */
function getSecondaryEquation() { }

/**
 * Formula at the bottom of the equation area.
 * @returns {String} LaTeX equation
 */
function getTertiaryEquation() { }

/**
 * List of values on the right side, e.g., Differential Calculus
 * @returns {Array.<QuaternaryEntry>} List of Quaternary entries
 */
function getQuaternaryValues() { }

/**
 * Some currencies might only be visible when specific milestones are purchased.
 * @param {number} index Index of the currency, starting at 0
 * @returns {boolean}
 */
function isCurrencyVisible(index) { }

/**
 * Informs the game to use the 3D visualization instead of the 2D graph.
 * @returns {boolean}
 */
function use3DGraph() { }

/**
 * When using the 3D visualization, returns the current point to display.
 * Rescale your points to stay as much as possible in the range [-1,1]^3
 * @returns {Vector3}
 */
function get3DGraphPoint() { }

/**
 * @param {String} symbol LaTeX symbol to use in this formula instead of theory.latexSymbol
 * @returns {String} LaTeX representation of the publication multiplier formula
 */
function getPublicationMultiplierFormula(symbol) { }

/**
 * @param {BigNumber} tau Tau value at which the publication multiplier should be calculated
 * @returns {BigNumber} Publication multiplier
 */
function getPublicationMultiplier(tau) { }

/**
 * Given the current state of the game, returns the value that tau should have.
 * The game keeps the maximum between the current value of tau and the value
 * returned by this function.
 * @returns {BigNumber}
 */
function getTau() { }

/**
 * Called right before publishing.
 */
function prePublish() { }

/**
 * Called right after publishing.
 * A good place to reset your internal state.
 */
function postPublish() { }

/**
 * You may have to keep track of some internal variables to help calculations.
 * If some values needs to be preserved when reloading the game, serialize
 * these values in the form of a string so that it is part of the save file.
 * @returns {String}
 */
function getInternalState() { }

/**
 * Given the string that you provided with getInternalState, set the internal
 * state of the theory. This function needs to support empty/corrupted strings.
 * @param {String} state
 */
function setInternalState(state) { }