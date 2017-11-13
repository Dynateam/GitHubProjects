
(function (window) {
    var types =
    {
        Status : 2,
        ArrangementType : 378080000,
        Resource : 1,
        CustomFilter : 378080001
    };

    var dyna_arrangementtypeid = Xrm.Page.getAttribute('dyna_arrangementtypeid');
    var dyna_resource = Xrm.Page.getAttribute('dyna_resource');
    var dyna_statuscode = Xrm.Page.getAttribute('dyna_statuscode');
    var dyna_label = Xrm.Page.getAttribute('dyna_label');

    var getFilterType = function ()
    {
        return Xrm.Page.getAttribute('dyna_filtertype').getValue();
    };

    var setLabelFromResource = function ()
    {
        if (getFilterType() !== types.Resource) {
            return;
        }

        var value = '';
        var reference = dyna_resource.getValue();

        if (reference && reference.length && reference.length > 0) {
            value = reference[0].name;
        }

        dyna_label.setValue(value);
        dyna_label.fireOnChange();
    };

    var setLabelFromArrangementtype = function () {
        if (getFilterType() !== types.ArrangementType) {
            return;
        }

        var value = '';
        var reference = dyna_arrangementtypeid.getValue();

        if (reference && reference.length && reference.length > 0) {
            value = reference[0].name;
        }

        dyna_label.setValue(value);
        dyna_label.fireOnChange();
    };

    var setLabelFromStatusCode = function () {
        if (getFilterType() !== types.Status) {
            return;
        }

        var value = dyna_statuscode.getText() || '';

        dyna_label.setValue(value);
        dyna_label.fireOnChange();
    };

    window.dyna_schedulerfilter_form =
    {
        setLabelFromResource: setLabelFromResource,
        setLabelFromArrangementtype: setLabelFromArrangementtype,
        setLabelFromStatusCode: setLabelFromStatusCode,

        setLabel: function ()
        {
            setLabelFromResource();
            setLabelFromArrangementtype();
            setLabelFromStatusCode();
        }
    };

})(window);
