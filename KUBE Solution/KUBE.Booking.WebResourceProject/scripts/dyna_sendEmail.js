if (typeof dyna == 'undefined' || !dyna.__namespace) {
    throw '"dyna" namespace is not defined. Try to add "//WebResources//dyna_core.js"';
}

(function (dyna, extend, $)
{
if (typeof ($) == 'undefined') {
    throw 'jQuery is not defined';
}

if (typeof extend == 'undefined') {
    throw '"extend" function (like jQUery extend) not exist. Try to add "//WebResources//dyna_core.js"';
}

if (typeof (dyna.booking) == 'undefined') {
    dyna.booking = {
        __namespace: true,
    };
}

dyna.booking.loadEntities = function (options)
{
    if (!options.url || options.url === '') {
        throw 'Crm url is not defined';
    }

    if (options.load && options.load.length <= 0) {
        return null;
    }

    var hasSet = typeof (options.set) == 'function';

    if (hasSet === true)
    {
        options.set('data', []);
        options.set('isLoaded', false);
    }
    else
    {
        options.data = [];
        options.isLoaded = false;
    }

    var urlBuilder = function (entity, index) {
        var url = options.url.trim();

        if (url[url.length - 1] != '/') {
            url = url + '/';
        }

        url = url + '/XRMServices/2011/OrganizationData.svc/';
        url = url + entity.schemaName;
        url = url + 'Set';

        if (entity.id) {
            url = url + "(guid'" + entity.id + "')";
        }

        url = url + '?';

        if(entity.select && entity.select.length && entity.select.length > 0)
        {
            url = url + '$select=';

            for (var i = 0; i < entity.select.length; i++)
            {
                url = url + entity.select[i];

                if (i < (entity.select.length - 1)) {
                    url = url + ',';
                }
            }
        }

        if (entity.extend && entity.extend.length && entity.extend.length > 0)
        {
            url = url + '&$expand=';

            for (var i = 0; i < entity.extend.length; i++) {
                url = url + entity.extend[i];

                if (i < (entity.extend.length - 1)) {
                    url = url + ',';
                }
            }
        }

        if (!entity.id && typeof (entity.getFilter) == 'function')
        {
            url = url + '&$filter=';
            url = url + entity.getFilter(entity, options.load, options.data);
        }

        return url;
    };

    var buildAjax = function (entity, index, promise)
    {
        return promise.then(function (data)
        {
            return Promise.resolve($.ajax(
            {
                type: "GET",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                url: urlBuilder(entity, index),
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Accept", "application/json");
                },
                success: function (data2)
                {
                    var result = null;

                    if (data2.d && data2.d.results) {
                        result = data2.d.results;
                    }
                    else if (data2.d) {
                        result = data2.d;
                    }

                    var loadObj = options.load[index];

                    if (hasSet === true)
                    {
                        var item = new kendo.data.ObservableObject(result);

                        item.bind('set', function (e) {
                            e.preventDefault();
                        });

                        if (typeof (loadObj.resultAttribute) == 'string') {
                            options.set(loadObj.resultAttribute, item);
                        }

                        loadObj.set('data', item);
                        options.data.push(item);
                    }
                    else
                    {
                        if (typeof (loadObj.resultAttribute) == 'string') {
                            options[loadObj.resultAttribute] = result;
                        }

                        loadObj.data = item;
                        options.data.push(result);
                    }
                }
            }));
        });
    };

    var promise = Promise.resolve($.ajax(
    {
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: urlBuilder(options.load[0], 0),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        success: function (data2)
        {
            var result = null;

            if (data2.d && data2.d.results)
            {
                result = data2.d.results;
            }
            else if (data2.d)
            {
                result = data2.d;
            }

            var loadObj = options.load[0];

            if (hasSet === true) {
                var item = new kendo.data.ObservableObject(result);

                item.bind('set', function (e) {
                    e.preventDefault();
                });

                if (typeof (loadObj.resultAttribute) == 'string') {
                    options.set(loadObj.resultAttribute, item);

                    options.set(loadObj.resultAttribute, item);
                }

                loadObj.set('data', item);
                options.data.push(item);
            }
            else {
                if (typeof (loadObj.resultAttribute) == 'string') {
                    options[loadObj.resultAttribute] = result;
                }

                loadObj.data = item;
                options.data.push(result);
            }
        }
    }));

    for (var i = 1; i < options.load.length; i++)
    {
        promise = buildAjax(options.load[i], i, promise);
    }

    promise = promise.then(function ()
    {
        if (hasSet === true) {
            options.set('isLoaded', true);
        }
        else
        {
            options.isLoaded = true;
        }
        return options;
    })

    if (typeof (options.loaded) == 'function') {
        promise.then(function (data) {
            options.loaded.call(options, options, options.data);
        });
    }

    return promise;
};

})(dyna, dyna.extend, jQuery);

(function (dyna, extend)
{
    if (typeof (dyna.str) == 'undefined') {
        dyna.str = {
            __namespace: true,
        };
    }

    dyna.str.parseQueryString = function (query)
    {
        var result = {};
        if (typeof query == "undefined" || query == null) {
            return result;
        }
        var queryparts = query.split("&");
        for (var i = 0; i < queryparts.length; i++) {
            var params = queryparts[i].split("=");
            result[params[0]] = params.length > 1 ? params[1] : null;
        }
        return result;
    };

})(dyna, dyna.extend);

