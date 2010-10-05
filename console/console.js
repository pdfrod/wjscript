replLoop();


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


function inspect(obj)
{
    for ($key in obj)
    {
        WScript.Echo($key + ": " + obj[$key]);
    }
}