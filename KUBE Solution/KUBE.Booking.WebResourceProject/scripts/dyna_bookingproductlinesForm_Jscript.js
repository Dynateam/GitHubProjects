function SetProductPrice() {

    var priceAttr = Xrm.Page.getAttribute("dyna_price");
    var hasProduct = false;

    var productLookupValue = Xrm.Page.getAttribute("dyna_productid").getValue();

    Xrm.Page.getAttribute("dyna_name").setValue(productLookupValue[0].name);
    Xrm.Page.getAttribute("dyna_name").setSubmitMode("always");

    if (productLookupValue != null) {

        Xrm.Page.getAttribute("dyna_name").setValue(productLookupValue[0].name);        

        if (productLookupValue.length > 0) {
            hasProduct = true;

            SDK.JQuery.retrieveRecord(
                productLookupValue[0].id,
                'Product',
                null,
                null,
                function (product) {
                    var price = null;
                    if (product.Price != null) {
                        price = product.Price.Value;

                        priceAttr.setValue(parseFloat(eval(price)));
                        priceAttr.setSubmitMode("always");
                        Xrm.Page.getAttribute("dyna_useprice").setValue(parseFloat(eval(price)));

                        CalculateTotalPrice();
                    }

                },
                function (e) {
                    alert(err.message);
                }
            );

        }
    }
    else
    {
        Xrm.Page.getAttribute("dyna_name").setValue(null);
    }

    Xrm.Page.getAttribute("dyna_name").setSubmitMode("always");

    if (!hasProduct) {
        priceAttr.setValue(0);
        priceAttr.setSubmitMode("always");
    }
}


function CalculateTotalPrice()
{
    var priceAttr = Xrm.Page.getAttribute("dyna_useprice").getValue();
    var antal = Xrm.Page.getAttribute("dyna_count").getValue();
    var total = Xrm.Page.getAttribute("dyna_total");
    var calc = 0;

    if (antal != null) {
        calc = priceAttr * antal;
    }

    total.setValue(calc);
}

function CreateForplejning () {

    var params = {};
    params["_CreateFromId"] = Xrm.Page.getAttribute("dyna_bookingid").getValue()[0].id;
    params["_CreateFromType"] = 4214;
    params["etc"] = 10017;

    Xrm.Utility.openEntityForm(Xrm.Page.data.entity.getEntityName(), null, params);
}