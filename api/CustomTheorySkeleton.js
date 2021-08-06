/** @global {string} */
let id;

/** @global {string} */
let name;

/** @global {number} */
let api;

/** @global {number} */
let version;

/**  */
function updateAvailability() { }

/**
 * @param {number} elapsedTime
 * @param {number} multiplier
 */
function tick(elapsedTime, multiplier) { }

/**
 * @returns {string} LaTeX equation
 */
function getPrimaryEquation() { }

/**
 * @returns {string} LaTeX equation
 */
function getSecondaryEquation() { }

/**
 * @returns {string} LaTeX equation
 */
function getTertiaryEquation() { }

/**
 * @returns {Array.<QuaternaryEntry>} List of Quaternary entries
 */
function getQuaternaryEquation() { }

/**
 * @param {number} index
 * @returns {boolean}
 */
function isCurrencyVisible(index) { }

/**
 * @returns {boolean}
 */
function use3DGraph() { }

/**
 * @returns {Vector3}
 */
function get3DGraphPoint() { }

/**
 * @returns {Array.<Vector3, Vector3>}
 */
function get3DGraphBoundingBox() { }

/**
 * @param {string} symbol
 * @returns {string}
 */
function getPublicationMultiplierFormula(symbol) { }

/**
 * @param {BigNumber} tau
 * @returns {BigNumber}
 */
function getPublicationMultiplier(tau) { }

/**
 * @returns {BigNumber}
 */
function getTau() { }

/** */
function prePublish() { }

/** */
function postPublish() { }

/**
 * @returns {string}
 */
function getInternalState() { }

/**
 * @param {string} state
 */
function setInternalState(state) { }

/** */
function resetInternalState() { }

/** */
function reset() { }