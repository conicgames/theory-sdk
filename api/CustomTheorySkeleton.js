/**
 * A unique ID for the theory.
 * @global {string}
 */
let id;

/**
 * Name of the theory. Displayed on the top of the equation.
 * @global {string}
 */
let name;

/**
 * The API level used by this script.
 * @global {string}
 */
let api;

/**
 * The version of the script. Used for backward compatibility.
 * @global {string}
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
 * @returns {string} LaTeX equation
 */
function getPrimaryEquation() { }

/**
 * Formula right below the main one.
 * @returns {string} LaTeX equation
 */
function getSecondaryEquation() { }

/**
 * Formula at the bottom of the equation area.
 * @returns {string} LaTeX equation
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
 * @param {string} symbol LaTeX symbol to use in this formula instead of theory.latexSymbol
 * @returns {string} LaTeX representation of the publication multiplier formula
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
 */
function postPublish() { }

/**
 * You may have to keep track of some internal variables to help calculations.
 * If some values needs to be preserved when reloading the game, serialize
 * these values in the form of a string so that it is part of the save file.
 * @returns {string}
 */
function getInternalState() { }

/**
 * Given the string that you provided with getInternalState, set the internal
 * state of the theory. This function needs to support empty/corrupted strings.
 * @param {string} state
 */
function setInternalState(state) { }

/**
 * Resets the internal state of the theory.
 * Automatically called when resetting a theory.
 * Consider calling this function manually in postPublish.
 */
function resetInternalState() { }

/**
 * The game resets most values (currencies & all upgrades) and calls
 * resetInternalState(). If you have more values to reset, for example,
 * values that were not reset in resetInternalState, do it here.
 * Note: Most theories don't need this function.
 */
function reset() { }