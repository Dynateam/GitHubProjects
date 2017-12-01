if (typeof (SDK) == "undefined")
{
    SDK = { __namespace: true };
}
SDK.JQuery = {

    cannotConnectMsg: "Can't connect to server",

    _context: function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        if (typeof GetGlobalContext != "undefined")
        {
            return GetGlobalContext();
        }
        else if (Xrm && Xrm.Utility && typeof Xrm.Utility.getGlobalContext != 'undefined')
        {
            return Xrm.Utility.getGlobalContext();
        }
        else
        {
            if (typeof Xrm != "undefined") {
                return Xrm.Page.context;
            }
            else { throw new Error("Context is not available."); }
        }
    },
    _getClientUrl: function () {
        ///<summary>
        /// Private function to return the server URL from the context
        ///</summary>
        ///<returns>String</returns>
        var serverUrl = this._context().getClientUrl();

        return serverUrl;
    },
    _ODataPath: function () {
        ///<summary>
        /// Private function to return the path to the REST endpoint.
        ///</summary>
        ///<returns>String</returns>
        return this._getClientUrl() + "/XRMServices/2011/OrganizationData.svc/";
    },
    _errorHandler: function (req) {
        ///<summary>
        /// Private function return an Error object to the errorCallback
        ///</summary>
        ///<param name="req" type="XMLHttpRequest">
        /// The XMLHttpRequest response that returned an error.
        ///</param>
        ///<returns>Error</returns>
        if (req.responseText == '')
            return new Error("Error : " +
                req.status + ": " +
                req.statusText + ": " +
                this.cannotConnectMsg);
        else
            return new Error("Error : " +
                req.status + ": " +
                req.statusText + ": " +
                JSON.parse(req.responseText).error.message.value);
    },
    _dateReviver: function (key, value) {
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    },
    _parameterCheck: function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="Object">
        /// The parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if ((typeof parameter === "undefined") || parameter === null) {
            throw new Error(message);
        }
    },
    _stringParameterCheck: function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="String">
        /// The string parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if (typeof parameter != "string") {
            throw new Error(message);
        }
    },
    _callbackParameterCheck: function (callbackParameter, message) {
        ///<summary>
        /// Private function used to check whether required callback parameters are functions
        ///</summary>
        ///<param name="callbackParameter" type="Function">
        /// The callback parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if (typeof callbackParameter != "function") {
            throw new Error(message);
        }
    },

    getOData: function () {
        this._ODataPath();
    },
    createRecord: function (object, type, successCallback, errorCallback) {
        ///<summary>
        /// Sends an asynchronous request to create a new record.
        ///</summary>
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        ///</param>
        this._parameterCheck(object, "SDK.JQuery.createRecord requires the object parameter.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to create.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "SDK.JQuery.createRecord requires the type parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// This function can accept the returned record as a parameter.
        /// </param>
        this._callbackParameterCheck(successCallback, "SDK.JQuery.createRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "SDK.JQuery.createRecord requires the errorCallback is a function.");

        var jsonEntity = window.JSON.stringify(object);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: this._ODataPath() + type + "Set",
            data: jsonEntity,
            beforeSend: function (xhr) {
                //Specifying this header ensures that the results will be returned as JSON.             
                xhr.setRequestHeader("Accept", "application/json");
            },
            success: function (data, textStatus, xhr) {
                successCallback(data.d);
            },
            error: function (xhr, textStatus, errorThrown) {
                errorCallback(SDK.JQuery._errorHandler(xhr));
            }
        });
    },
    retrieveRecord: function (id, type, select, expand, successCallback, errorCallback) {
        ///<summary>
        /// Sends an asynchronous request to retrieve a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to retrieve.
        ///</param>
        this._stringParameterCheck(id, "SDK.JQuery.retrieveRecord requires the id parameter is a string.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "SDK.JQuery.retrieveRecord requires the type parameter is a string.");
        ///<param name="select" type="String">
        /// A String representing the $select OData System Query Option to control which
        /// attributes will be returned. This is a comma separated list of Attribute names that are valid for retrieve.
        /// If null all properties for the record will be returned
        ///</param>
        if (select != null)
            this._stringParameterCheck(select, "SDK.JQuery.retrieveRecord requires the select parameter is a string.");
        ///<param name="expand" type="String">
        /// A String representing the $expand OData System Query Option value to control which
        /// related records are also returned. This is a comma separated list of of up to 6 entity relationship names
        /// If null no expanded related records will be returned.
        ///</param>
        if (expand != null)
            this._stringParameterCheck(expand, "SDK.JQuery.retrieveRecord requires the expand parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// This function must accept the returned record as a parameter.
        /// </param>
        this._callbackParameterCheck(successCallback, "SDK.JQuery.retrieveRecord requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "SDK.JQuery.retrieveRecord requires the errorCallback parameter is a function.");

        var systemQueryOptions = "";

        if (select != null || expand != null) {
            systemQueryOptions = "?";
            if (select != null) {
                var selectString = "$select=" + select;
                if (expand != null) {
                    selectString = selectString + "," + expand;
                }
                systemQueryOptions = systemQueryOptions + selectString;
            }
            if (expand != null) {
                systemQueryOptions = systemQueryOptions + "&$expand=" + expand;
            }
        }

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: this._ODataPath() + type + "Set" + "(guid'" + id + "')" + systemQueryOptions,
            beforeSend: function (xhr) {
                //Specifying this header ensures that the results will be returned as JSON.             
                xhr.setRequestHeader("Accept", "application/json");
            },
            success: function (data, textStatus, xhr) {
                //JQuery does not provide an opportunity to specify a date reviver so this code
                // parses the xhr.responseText rather than use the data parameter passed by JQuery.
                successCallback(JSON.parse(xhr.responseText, SDK.JQuery._dateReviver).d);
            },
            error: function (xhr, textStatus, errorThrown) {
                errorCallback(SDK.JQuery._errorHandler(xhr));
            }
        });
    },
    updateRecord: function (id, object, type, successCallback, errorCallback) {
        ///<summary>
        /// Sends an asynchronous request to update a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to retrieve.
        ///</param>
        this._stringParameterCheck(id, "SDK.JQuery.updateRecord requires the id parameter.");
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema Names for
        /// entity attributes that are valid for update operations.
        ///</param>
        this._parameterCheck(object, "SDK.JQuery.updateRecord requires the object parameter.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "SDK.JQuery.updateRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// Nothing will be returned to this function.
        /// </param>
        this._callbackParameterCheck(successCallback, "SDK.JQuery.updateRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "SDK.JQuery.updateRecord requires the errorCallback is a function.");

        var jsonEntity = window.JSON.stringify(object);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: jsonEntity,
            url: this._ODataPath() + type + "Set" + "(guid'" + id + "')",
            beforeSend: function (xhr) {
                //Specifying this header ensures that the results will be returned as JSON.             
                xhr.setRequestHeader("Accept", "application/json");
                //Specify the HTTP method MERGE to update just the changes you are submitting.             
                xhr.setRequestHeader("X-HTTP-Method", "MERGE");
            },
            success: function (data, textStatus, xhr) {
                //Nothing is returned to the success function
                successCallback();
            },
            error: function (xhr, textStatus, errorThrown) {
                errorCallback(SDK.JQuery._errorHandler(xhr));
            }
        });
    },
    deleteRecord: function (id, type, successCallback, errorCallback) {
        ///<summary>
        /// Sends an asynchronous request to delete a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to delete.
        ///</param>
        this._stringParameterCheck(id, "SDK.JQuery.deleteRecord requires the id parameter.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to delete.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "SDK.JQuery.deleteRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// Nothing will be returned to this function.
        /// </param>
        this._callbackParameterCheck(successCallback, "SDK.JQuery.deleteRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "SDK.JQuery.deleteRecord requires the errorCallback is a function.");

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: this._ODataPath() + type + "Set(guid'" + id + "')",
            beforeSend: function (XMLHttpRequest) {
                //Specifying this header ensures that the results will be returned as JSON.                 
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
                //Specify the HTTP method DELETE to perform a delete operation.                 
                XMLHttpRequest.setRequestHeader("X-HTTP-Method", "DELETE");
            },
            success: function (data, textStatus, xhr) {
                // Nothing is returned to the success function.
                successCallback();
            },
            error: function (xhr, textStatus, errorThrown) {
                errorCallback(SDK.JQuery._errorHandler(xhr));
            }
        });
    },
    retrieveMultipleRecords: function (type, options, successCallback, errorCallback, OnComplete) {
        ///<summary>
        /// Sends an asynchronous request to retrieve records.
        ///</summary>
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type records to retrieve
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "SDK.JQuery.retrieveMultipleRecords requires the type parameter is a string.");
        ///<param name="options" type="String">
        /// A String representing the OData System Query Options to control the data returned
        /// Do not include the $top option, use the top parameters to set the maximum number of records to return.
        ///</param>
        if (options != null)
            this._stringParameterCheck(options, "SDK.JQuery.retrieveMultipleRecords requires the options parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called for each page of records returned.
        /// This function should loop through the results and push the records into an array.
        /// </param>
        this._callbackParameterCheck(successCallback, "SDK.JQuery.retrieveMultipleRecords requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "SDK.JQuery.retrieveMultipleRecords requires the errorCallback parameter is a function.");
        ///<param name="OnComplete" type="Function">
        /// The function that will be called when all the requested records have been returned.
        /// No parameters are passed to this function.
        /// </param>
        this._callbackParameterCheck(OnComplete, "SDK.JQuery.retrieveMultipleRecords requires the OnComplete parameter is a function.");

        var optionsString;
        if (options != null) {
            if (options.charAt(0) != "?") {
                optionsString = "?" + options;
            }
            else { optionsString = options; }
        }

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: this._ODataPath() + type + "Set" + optionsString,
            beforeSend: function (XMLHttpRequest) {
                //Specifying this header ensures that the results will be returned as JSON.             
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            success: function (data, textStatus, xhr) {
                if (data && data.d && data.d.results) {
                    successCallback(JSON.parse(xhr.responseText, SDK.JQuery._dateReviver).d.results);
                    if (data.d.__next != null) {
                        var queryOptions = data.d.__next.substring((SDK.JQuery._ODataPath() + type + "Set").length);
                        SDK.JQuery.retrieveMultipleRecords(type, queryOptions, successCallback, errorCallback, OnComplete);
                    }
                    else { OnComplete(); }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                errorCallback(SDK.JQuery._errorHandler(xhr));
            }
        });
    },
    getRedordsUrl: function (type) {
        ///<summary>
        /// Sends an asynchronous request to retrieve records.
        ///</summary>
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type records to retrieve
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "SDK.JQuery.retrieveMultipleRecords requires the type parameter is a string.");

        return this._ODataPath() + type + "Set";
    },

    getCrmSolutionUrl: function () {
        return this._getClientUrl();
    },

    //
    __namespace: true
};

SDK.Assign = {
    _context: function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        if (typeof GetGlobalContext != "undefined") {
            return GetGlobalContext();
        }
        else if (Xrm && Xrm.Utility && typeof Xrm.Utility.getGlobalContext != 'undefined') {
            return Xrm.Utility.getGlobalContext();
        }
        else {
            if (typeof Xrm != "undefined") {
                return Xrm.Page.context;
            }
            else { throw new Error("Context is not available."); }
        }
    },
    _getClientUrl: function ()
    {
        ///<summary>
        /// Returns the URL for the SOAP endpoint using the context information available in the form
        /// or HTML Web resource.
        ///</summary
        var OrgServicePath = "/XRMServices/2011/Organization.svc/web";
        var serverUrl = this._context().getClientUrl();

        return serverUrl + OrgServicePath;
    },
    assignRequest: function (Assignee, Target, Type, successCallback, errorCallback) {
        ///<summary>
        /// Sends the Assign Request
        ///</summary>
        this._parameterCheck(Assignee, "GUID", "The SDK.Assign.assignRequest method Assignee parameter must be a string Representing a GUID value.");
        ///<param name="Assignee" Type="String">
        /// The GUID representing the  System user that the record will be assigned to.
        ///</param>
        this._parameterCheck(Target, "GUID", "The SDK.Assign.assignRequest method Target parameter must be a string Representing a GUID value.");
        ///<param name="Target" Type="String">
        /// The GUID representing the user-owned entity record that will be assigne to the Assignee.
        ///</param>
        this._parameterCheck(Type, "String", "The SDK.Assign.assignRequest method Type parameter must be a string value.");
        Type = Type.toLowerCase();
        ///<param name="Type" Type="String">
        /// The Logical name of the user-owned entity. For example, 'account'.
        ///</param>
        if (successCallback != null)
            this._parameterCheck(successCallback, "Function", "The SDK.Assign.assignRequest method successCallback parameter must be a function.");
        ///<param name="successCallback" Type="Function">
        /// The function to perform when an successfult response is returned.
        ///</param>
        this._parameterCheck(errorCallback, "Function", "The SDK.Assign.assignRequest method errorCallback parameter must be a function.");
        ///<param name="errorCallback" Type="Function">
        /// The function to perform when an error is returned.
        ///</param>
        //The request is simply the soap envelope captured by the SOAPLogger with variables added for the 
        // values passed. All quotations must be escaped to create valid JScript strings.
        var request = [];

        request.push("<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">");
        request.push("<s:Body>");
        request.push("<Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\"");
        request.push(" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">");
        request.push("<request i:type=\"b:AssignRequest\"");
        request.push(" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\"");
        request.push(" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">");
        request.push("<a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">");
        request.push("<a:KeyValuePairOfstringanyType>");
        request.push("<c:key>Target</c:key>");
        request.push("<c:value i:type=\"a:EntityReference\">");
        request.push("<a:Id>" + this._xmlEncode(Target) + "</a:Id>");
        request.push("<a:LogicalName>" + this._xmlEncode(Type) + "</a:LogicalName>");
        request.push("<a:Name i:nil=\"true\" />");
        request.push("</c:value>");
        request.push("</a:KeyValuePairOfstringanyType>");
        request.push("<a:KeyValuePairOfstringanyType>");
        request.push("<c:key>Assignee</c:key>");
        request.push("<c:value i:type=\"a:EntityReference\">");
        request.push("<a:Id>" + this._xmlEncode(Assignee) + "</a:Id>");
        request.push("<a:LogicalName>systemuser</a:LogicalName>");
        request.push("<a:Name i:nil=\"true\" />");
        request.push("</c:value>");
        request.push("</a:KeyValuePairOfstringanyType>");
        request.push("</a:Parameters>");
        request.push("<a:RequestId i:nil=\"true\" />");
        request.push("<a:RequestName>Assign</a:RequestName>");
        request.push("</request>");
        request.push("</Execute>");
        request.push("</s:Body>");
        request.push("</s:Envelope>");

        var req = new XMLHttpRequest();
        req.open("POST", SDK.Assign._getClientUrl(), true)
        // Responses will return XML. It isn't possible to return JSON.
        req.setRequestHeader("Accept", "application/xml, text/xml, */*");
        req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
        req.onreadystatechange = function () { SDK.Assign.assignResponse(req, successCallback, errorCallback); };
        req.send(request.join(""));

    },
    assignResponse: function (req, successCallback, errorCallback) {
        ///<summary>
        /// Recieves the assign response
        ///</summary>
        ///<param name="req" Type="XMLHttpRequest">
        /// The XMLHttpRequest response
        ///</param>
        ///<param name="successCallback" Type="Function">
        /// The function to perform when an successfult response is returned.
        /// For this message no data is returned so a success callback is not really necessary.
        ///</param>
        ///<param name="errorCallback" Type="Function">
        /// The function to perform when an error is returned.
        /// This function accepts a JScript error returned by the _getError function
        ///</param>
        if (req.readyState == 4) {
            req.onreadystatechange = null; //avoids memory leaks
            if (req.status == 200) {
                if (successCallback != null)
                { successCallback(); }
            }
            else {
                errorCallback(SDK.Assign._getError(req.responseXML));
            }
        }
    },
    _getError: function (faultXml) {
        ///<summary>
        /// Parses the WCF fault returned in the event of an error.
        ///</summary>
        ///<param name="faultXml" Type="XML">
        /// The responseXML property of the XMLHttpRequest response.
        ///</param>
        var errorMessage = "Unknown Error (Unable to parse the fault)";
        if (typeof faultXml == "object") {
            try {
                var bodyNode = faultXml.firstChild.firstChild;
                //Retrieve the fault node
                for (var i = 0; i < bodyNode.childNodes.length; i++) {
                    var node = bodyNode.childNodes[i];

                    //NOTE: This comparison does not handle the case where the XML namespace changes
                    if ("s:Fault" == node.nodeName) {
                        for (var j = 0; j < node.childNodes.length; j++) {
                            var faultStringNode = node.childNodes[j];
                            if ("faultstring" == faultStringNode.nodeName) {
                                errorMessage = faultStringNode.textContent;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            catch (e) { };
        }
        return new Error(errorMessage);
    },
    _xmlEncode: function (strInput) {
        var c;
        var XmlEncode = '';

        if (strInput == null) {
            return null;
        }
        if (strInput == '') {
            return '';
        }

        for (var cnt = 0; cnt < strInput.length; cnt++) {
            c = strInput.charCodeAt(cnt);

            if (((c > 96) && (c < 123)) ||
                ((c > 64) && (c < 91)) ||
                (c == 32) ||
                ((c > 47) && (c < 58)) ||
                (c == 46) ||
                (c == 44) ||
                (c == 45) ||
                (c == 95)) {
                XmlEncode = XmlEncode + String.fromCharCode(c);
            }
            else {
                XmlEncode = XmlEncode + '&#' + c + ';';
            }
        }

        return XmlEncode;
    },
    _parameterCheck: function (parameter, type, errorMessage) {
        switch (type) {
            case "String":
                if (typeof parameter != "string") {
                    throw new Error(errorMessage);
                }
                break;
            case "Function":
                if (typeof parameter != "function") {
                    throw new Error(errorMessage);
                }
                break;
            case "EntityFilters":
                var found = false;
                for (x in this.EntityFilters) {
                    if (this.EntityFilters[x] == parameter) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    throw new Error(errorMessage);
                }
                break;
            case "Boolean":
                if (typeof parameter != "boolean") {
                    throw new Error(errorMessage);
                }
                break;
            case "GUID":
                var re = new RegExp("[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}");
                if (!(typeof parameter == "string" && re.test(parameter))) {
                    throw new Error(errorMessage);
                }

                break;
            default:
                throw new Error("An invalid type parameter value was passed to the SDK.MetaData._parameterCheck function.");
                break;
        }
    }
};