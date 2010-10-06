replLoop(); // Start the read-eval-print-loop


/**
 * Executes a read-eval-print-loop. The commands are read from the standard
 * input, evaluated, and the result is outputted. Errors in the evaluation
 * (e.g., syntax errors) are catched and reported.
 */
function replLoop()
{
    while (true)
    {
        WScript.StdOut.Write(">>> ");
        var line = WScript.StdIn.ReadLine();
        var result = undefined;
        try
        {
            result = eval(line);
        }
        catch (err)
        {
            WScript.Echo("Error: " + err.description);
        }
        if (result) WScript.Echo(result);
    }
}


/**
 * Inspects the given object, outputting to the standard output a list of
 * it's attributes and values.
 *
 * params:
 *     obj - the object to be inspected
 */
function inspect(obj)
{
    for ($key in obj)
    {
        WScript.Echo($key + ": " + obj[$key]);
    }
}