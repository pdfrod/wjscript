/**
 * Reads the contents of the text file located at the given path.
 *
 * Params:
 *     path - a String representing the path of the file.
 *
 * Returns:
 *     a String with the content of the read file.
 */
function readFile(path)
{
    var adoDbStream = new ActiveXObject("ADODB.Stream");

    adoDbStream.Open();
    adoDbStream.CharSet = "UTF-8";
    adoDbStream.LoadFromFile(path);

    var content = adoDbStream.ReadText();

    adoDbStream.Close();
    return content;
}


/**
 * Write the contents of data to the text file located at the given path.
 * The file will be created and must not exist yet.
 *
 * Params:
 *     path - a String representing the path of the file.
 *     data - a String with the contents that will be writen to the file.
 */
function writeFile(path, data)
{
    var adoDbStream = new ActiveXObject("ADODB.Stream");

    adoDbStream.Open();
    adoDbStream.CharSet = "UTF-8";
    adoDbStream.WriteText(data);
    adoDbStream.SaveToFile(path)
    adoDbStream.Close();
}
