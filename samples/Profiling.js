import { profilers } from "../api/Profiler";

// Profilers measure performance of a piece of code.
// An instance of a profiler accumulate data every time
// it executes a function. Later on, you can query the
// instance to get statistics about the execution time
// of the code, e.g., mean, min, max, latest, variance.

var id = "profiling";
var name = "Profiling";
var description = "An example of how to use profilers to measure performance of a piece of code.";
var authors = "Gilles-Philippe Paillé";
var version = 1;

// Method 1: create a profiler and use it below
var profiler1 = profilers.get("profiler1");

// A dummy function that performs calculations
var expensiveFunction = () => {
    let result = 0;
    for (let i = 0; i < 1000; ++i) {
        result += i;
    }
}

var tick = (elapsedTime, multiplier) => {
    // Method 1: use the profiler created above to accumulate statistics
    profiler1.exec(expensiveFunction);

    // Method 2: let the 'profilers' object get the instance for you
    profilers.exec("profiler2", expensiveFunction);

    // After executing the code, you can display the desired statistics in the SDK
    // using the following commands:

    //log(profiler1.mean) // Method 1
    //log(profilers.get("profiler2").mean) // Method 2

    // Note that the 'log' expression above will be printed every tick if executed
    // in the script itself, which might flood you SDK console. To avoid that, I
    // recommend to avoid logging in the script itself and use the command line in
    // the SDK app to display the statistics.
}