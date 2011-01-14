//TODO: documentation
function httpGet(url, user, password)
{
    var asynchronous = false;
    var xmlHttpObj = new ActiveXObject('Microsoft.XMLHTTP');

    xmlHttpObj.open('GET', url, asynchronous, user, password);
    xmlHttpObj.send();
    return xmlHttpObj.responseText;
}


//TODO: documentation
function httpPost(url, data, user, password)
{
    var asynchronous = false;
    var xmlHttpObj = new ActiveXObject('Microsoft.XMLHTTP');

    xmlHttpObj.open('POST', url, asynchronous, user, password);
    xmlHttpObj.send(data);
    return xmlHttpObj.responseText;
}
