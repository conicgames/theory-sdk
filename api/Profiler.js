/**
 * Profiling utilities
 */

/**
 * Class for profiling a single part of code.
 * Use the 'profilers' instance to create a profiler.
 */
 export class Profiler {
    /**
     * @returns {string}
     */
    get name();

    /**
     * @returns {number}
     */
    get mean();

    /**
     * @returns {number}
     */
    get min();

    /**
     * @returns {number}
     */
    get max();

    /**
     * @returns {number}
     */
    get variance();

    /**
     * @returns {number} Standard Deviation
     */
    get stddev();

    /**
     * @returns {number} The last recorded value
     */
    get latest();

    /**
     * @returns {number} The number of times that the code was executed
     */
    get count();

    /**
     * @param {function(void):void} f - The function to execute
     */
    exec(f);
}

/**
 * Class that contains a set of profilers.
 */
 export class Profilers {
    /**
     * Creates or reuses an instance of the profiler with the given name
     * and execute the function 'f'. This is equivalent to
     * 'profilers.get(name).exec(f)'
     * @param {string} name - The name of the profiler
     * @param {function(void):void} f - The function to execute
     */
    exec(name, f);

    /**
     * Creates or reuses an instance of the profiler with the given name
     * and returns the instance.
     * @param {string} name - The name of the profiler
     * @return {Profiler} The new or existing profiler
     */
    get(name);
}

/**
 * Instance of Profilers.
 * @type {Profilers}
 */
export var profilers;