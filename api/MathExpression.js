/**
 * Math Expressions, as used in the game.
 * Note that everything that Math Expressions do can be done in directly in JS.
 * This class exists to provide the player a way to enter its own expression
 * for any purpose relevant to the current theory.
 */
 export class MathExpression {
    /**
     * @param {String} expression - The expression to parse.
     * @returns {MathExpression} A new instance of MathExpression
     */
    static parse(expression);

    /**
     * Creates a new MathExpression instance based on the previous state of the expression.
     * @param {String} state - The base64 state string, as return by 'serialize'.
     * @returns {MathExpression}
     */
    static deserialize(state);

    /**
     * Serialize the current state of the expression into a base64 string.
     * The state contains the expression itself and all internal values
     * that encodes the current state of smoothing operators, time, d(), etc.
     * @returns {String} The base64 state string.
     */
    serialize();

    /**
     * Evaluates the expression and returns the result.
     * If the result is null and 'error' is also null, it simply means that
     * the current expression needs more evaluation steps to provide a meaningful
     * result. For example, the operator d() needs at least two evaluation steps
     * to be calculated. This function should be called every tick to ensure that
     * the result is ready when needed.
     * 'getVariable' example:
     *   evaluate(s => {
     *       switch(s) {
     *           case 'a': return BigNumber.ONE;
     *           case 'b': return BigNumber.TWO;
     *       }
     *       return null;
     *   })
     * @param {function(string):BigNumber} [getVariable] - Function to provide custom varibles.
     * @returns {BigNumber} Evaluated result of the expression. Can be null.
     */
    evaluate(getVariable);

    /**
     * Resets the state of the expression, i.e., the smoothed values, d() operator, etc.
     * Usage in the game: The state of the Prestige expression is reset at every Prestige. 
     */
    reset();

    /**
     * @returns {String} Parsing or evaluation error message. Null if there are no errors.
     */
    get error();

    /**
     * A critical error is an error during parsing or evaluation that cannot be
     * resolved with more evaluations, e.g., a missing parenthesis or a unknown variable.
     * A non-critical error is when the expression could not be evaluated due
     * to undefined math operators, e.g., a division by zero, that could potentially
     * be resolved with more evaluation steps or with slightly different values.
     * Usage in the game: In the "Test an Expression" popup, non-critical error are
     * reported. However, they are not reported in the Auto-Prestige/Supremacy popups.
     * @returns {boolean} If there is an error, is it critical? 
     */
    get isErrorCritical();
}