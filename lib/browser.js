/**
 * class Browser
 *
 * The class Browser creates an instance of a web browser and allows it to be automated.
 * If a page has frames, the desired frame should be selected using setFrame, before
 * issuing commands.
 * At the moment only Internet Explorer is supported.
 *
 * Examples:
 *  browser = new Browser();
 *  browser.open("http://www.google.com");
 *  browser.fill(new Selector("attr", "name", "q"), "foobar");
 *  browser.click(new Selector("attr", "name", "btnG"));
 */
function Browser()
{
    this.app = new ActiveXObject("InternetExplorer.Application");
    this.app.visible = true;
    this.frame = [];

    this.append = function(selector, value)
    {
        var node = this.getNode(selector);
        node.value += value;
        this.waitForLoad();
    }

    /**
     * Issues a click on the element given by selector.
     *
     * Params:
     *     selector - a Selector indicating the element that should be clicked.
     */
    this.click = function(selector)
    {
        var node = this.getElement(selector);
        node.click();
        this.waitForLoad();
    }

    /**
     * Shuts down the browser. Once the browser done is shut down, no more
     * commands can be issued.
     */
    this.exit = function()
    {
        this.app.quit();
    }

    /**
     * Fills a text field with the text given by value.
     *
     * Params:
     *     selector - a Selector indicating the element that should be filled.
     *     value - a String with the text to fill in.
     */
    this.fill = function(selector, value)
    {
        var node = this.getElement(selector);
        node.value = value;
    }

    this.getFrameDocument = function(document, frame)
    {
        if (frame.length == 0)
        {
            return document;
        }
        else
        {
            var window = document.frames.item(frame[0]);
            //TODO: if newDocument == null throw exception
            return this.getFrameDocument(window.document, frame.slice(1));
        }
    }

    /**
     * Gets the DOM Element corresponding to selector.
     *
     * Params:
     *     selector - a Selector indicating the element that should be
     *         retrieved.
     * 
     * Returns:
     *     an Element.
     */
    this.getElement = function(selector)
    {
        var document = this.getFrameDocument(this.app.document, this.frame);
        var node = selector.select(document);
        //TODO: if (node == null)  throw exception
        return node;
    }

    this.getValue = function(selector)
    {
        var node = this.getElement(selector);
        return node.value;
    }

    /**
     * Browses to given url.
     *
     * Params:
     *     url - a String with the url.
     */
    this.open = function(url)
    {
        this.app.navigate(url);
        this.waitForLoad();
    }

    /**
     * Selects an option of a drop-down list. The drop-down list is obtained
     * by comboSelector, while the option to select is obtained by
     * optionSelector. If triggerOnChange is true, then onChange event of the
     * drop-down list is triggered.
     *
     * Params:
     *     comboSelector - a Selector indicating the drop-down list.
     *     optionSelector - a Selector indicating the option that should be
     *         selected.
     *     triggerOnChange (optional) - a boolean indicating if onChange event
     *         should be triggered. By default it's true.
     */     
    this.select = function(comboSelector, optionSelector, triggerOnChange)
    {
        var comboNode = this.getElement(comboSelector);
        var optionNode = optionSelector.select(comboNode);
        triggerOnChange = arguments.lengh < 3 ? true : triggerOnChange;

        //TODO: if (optionNode == null) throw exception
        optionNode.selected = "selected";
        if (comboNode.onchange) comboNode.onchange();
    }

    /**
     * Sets the current frame to the one specified by argument frame.
     * Arbitrary frame nesting can be given.
     *
     * Params:
     *     frame - an Array with the names of frames, representing the path of
     *         frames that leads to the desired frame.
     *
     * Examples:
     *     browser.setFrame(["top-frame", "child-frame", "child-child-frame"]);
     */
    this.setFrame = function(frame)
    {
        this.frame = frame;
    }

    this.waitForLoad = function()
    {
        var READYSTATE_COMPLETE = 4;

        while (this.app.ReadyState != READYSTATE_COMPLETE);
    }
}


//TODO: documentation
function Selector()
{
    this.arguments = arguments;

    this.select = function(node)
    {
        var type = this.arguments[0];

        if (type == "attr")
        {
            var name = this.arguments[1];
            var value = this.arguments[2];
            var nodes = node.getElementsByTagName("*");
            return findNodeWithAttribute(nodes, name, value, 0);
        }
        else if (type == "innerText")
        {
            var text = this.arguments[1];
            var nodes = node.getElementsByTagName("*");
            return findNodeWithInnerText(nodes, text, 0);
        }
    }

    function findNodeWithAttribute(nodes, name, value, i)
    {
        if (i >= nodes.length)
        {
            return null;
        }
        else if (nodes[i].getAttribute(name) == value)
        {
            return nodes[i];
        }
        else
        {
            return findNodeWithAttribute(nodes, name, value, i + 1);
        }
    }

    function findNodeWithInnerText(nodes, text, i)
    {
        if (i >= nodes.length)
        {
            return null;
        }
        else if (nodes[i].innerText == text)
        {
            return nodes[i];
        }
        else
        {
            return findNodeWithInnerText(nodes, text, i + 1);
        }
    }
}
