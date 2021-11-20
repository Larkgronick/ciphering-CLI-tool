// UT (Function / Error) Input: User passes the same cli argument twice; Result: Error message is shown; e.g. input: node my_caesar_cli -c C1-C1-A-R0 -c C0 result: Error: You provided -c argument more than once;
// UT (Function / Error) Input: User doesn't pass -c or --config argument; Result: Error message is shown;
// UT (Function / Error) Input: User passes -i argument with path that doesn't exist or with no read access; Result: Error message is shown;
// UT (Function / Error) Input: User passes -o argument with path to directory that doesn't exist or with no read access; Result: Error message is shown;
// UT (Function / Error) Input: User passes incorrent symbols in argument for --config; Result: Error message is shown;

// UT (Function / Error) Input: User passes correct sequence of symbols as argument for --config that matches regular expression; Result: test passed
// Take cipher usage scenarios from first task description usage examples.
