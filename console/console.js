/**
 * Copyright (c) 2010 Pedro Rodrigues
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


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
        var matchLoad = /load\((.+)\)/.exec(line);

        try
        {
            if (matchLoad)
            {
                content = getContent(eval(matchLoad[1]));
                result = eval(content);
            }
            else
            {
                result = eval(line);
            }
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
 * Params:
 *     obj - the object to be inspected.
 */
function inspect(obj)
{
    for ($key in obj)
    {
        WScript.Echo($key + ": " + obj[$key]);
    }
}


// TODO: Move to more appropriate place?
function getContent(filename)
{
    var ForReading = 1;
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var file = fso.OpenTextFile(filename, ForReading);
    var content = file.ReadAll();

    file.Close();
    return content;
}
