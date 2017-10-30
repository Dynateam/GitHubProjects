if (typeof (Dyna) == "undefined") {
    Dyna = {
        __namespace: true
    };
}

if (typeof (Dyna.ServiceActivity) == "undefined") {
    Dyna.ServiceActivity = {};
}

if (typeof (Dyna.DataTypes) == "undefined") {
    Dyna.DataTypes = {};
}

if (typeof (Dyna.Names) == "undefined") {
    Dyna.Names = {};
}

////////////////////////////////////////////////////    start   Fields Names section

Dyna.Names.BookingTypeField = {
    schemeName: 'dyna_Bookingtype',
    name: 'dyna_bookingtype'
};

Dyna.Names.StatusCodeField = {
    schemeName: 'StatusCode',
    name: 'statuscode'
};

////////////////////////////////////////////////////     end    Fields Names section

////////////////////////////////////////////////////    start   DataTypes section

Dyna.DataTypes.FormTypes = {
    Undefined: {
        value: 0
        , text: 'Undefined'
    }
    , Create: {
        value: 1
        , text: 'Create'
    }
    , Update: {
        value: 2
        , text: 'Update'
    }
    , ReadOnly: {
        value: 3
        , text: 'Read Only'
    }
    , Disabled: {
        value: 4
        , text: 'Disabled'
    }
    , QuickCreate_Deprecated: {
        value: 5
        , text: 'Quick Create (Deprecated)'
    }
    , BulkEdit: {
        value: 6
        , text: 'Bulk Edit'
    }
    , ReadOptimized_Deprecated: {
        value: 11
        , text: 'Read Optimized (Deprecated)'
    }
};

Dyna.DataTypes.bookingTypeOptionSet = {
    Undervisning: {
        text: 'Undervisning',
        value: 378080000
    },
    Arrangement: {
        text: 'Arrangement',
        value: 378080001
    },
    AuBooking: {
        text: 'AU Booking',
        value: 378080002
    },
    Gaestevaerelse: {
        text: 'Gæsteværelse',
        value: 378080003
    },
    SubArrangement: {
        text: 'Tilvalg',
        value: 378080004
    }
};

Dyna.DataTypes.StatusCodeOptionSet = {
    Anmodet: {
        text: 'Anmodet',
        value: 1
    },
    Forespørgsel: {
        text: 'Forespørgsel',
        value: 378080003
    },
    Fuldført: {
        text: 'Fuldført',
        value: 8
    },
    Udeblev: {
        text: 'Udeblev',
        value: 378080000
    },
    Rettidigt: {
        text: 'Rettidigt',
        value: 378080001
    },
    Annulleret: {
        text: 'Annulleret',
        value: 9
    },
    Igangvaerende: {
        text: 'Igangværende',
        value: 4
    },
    Godkendt: {
        text: 'Godkendt',
        value: 6
    },
    Sendt_til_bogholderi: {
        text: 'Sendt til bogholderi',
        value: 7
    },
    Faktureret: {
        text: 'Faktureret',
        value: 100000000
    },
    Ankommet: {
        text: 'Ankommet',
        value: 378080006
    },
    Ankommet_sendt_til_fakturering: {
        text: 'Ankommet - Sendt til fakturering',
        value: 378080005
    },
    Ankommet_Betalt_i_kassen: {
        text: 'Ankommet - Betalt ved kassen',
        value: 378080004
    }
};

Dyna.ServiceActivity.DefaultServices = {

    1: [{
        id: Xrm.Page.context.getOrgUniqueName() != "CRM" ? '{06918A62-AB4E-E611-80C1-000C29332864}' : "{35965E57-E672-E611-80C3-0050568839E3}",
        name: 'Arrangement - 1 lokale',
        entityType: 'service'
    }],
    2: [{
        id: Xrm.Page.context.getOrgUniqueName() != "CRM" ? '{97C8776F-AB4E-E611-80C1-000C29332864}' : "{0EBF4F88-E672-E611-80C3-0050568839E3}",
        name: 'Arrangement - 2 lokale',
        entityType: 'service'
    }],
    3: [{
        id: Xrm.Page.context.getOrgUniqueName() != "CRM" ? '{1E2F7775-AB4E-E611-80C1-000C29332864}' : "{F705DC7B-E672-E611-80C3-0050568839E3}",
        name: 'Arrangement - 3 lokale',
        entityType: 'service'
    }],
    4: [{
        id: Xrm.Page.context.getOrgUniqueName() != "CRM" ? '{9921807B-AB4E-E611-80C1-000C29332864}' : "{73075194-E672-E611-80C3-0050568839E3}",
        name: 'Arrangement - 4 lokale',
        entityType: 'service'
    }],
    5: [{
        id: Xrm.Page.context.getOrgUniqueName() != "CRM" ? '{F8969281-AB4E-E611-80C1-000C29332864}' : "{EABE379B-E672-E611-80C3-0050568839E3}",
        name: 'Arrangement - 5 lokale',
        entityType: 'service'
    }]
};

////////////////////////////////////////////////////     end    DataTypes section


Dyna.ServiceActivity.ChangeForm = function (formName) {
    var currentForm = Xrm.Page.ui.formSelector.getCurrentItem();
    var availableForms = Xrm.Page.ui.formSelector.items.get();
    if (currentForm.getLabel().toLowerCase() != formName.toLowerCase()) {
        for (var i in availableForms) {
            var form = availableForms[i];
            // try to find a form based on the name
            if (form.getLabel().toLowerCase() == formName.toLowerCase()) {
                form.navigate();
                return true;
            }
        }
    }
}

Dyna.ServiceActivity.SetNotification = function () {

    if (Xrm.Page.ui.getFormType() == Dyna.DataTypes.FormTypes.Update.value) {

        //Funktionsaktiviteter
        var cafe = Xrm.Page.getAttribute("dyna_cafe").getValue() == undefined ? false : Xrm.Page.getAttribute("dyna_cafe").getValue();
        var vagt = Xrm.Page.getAttribute("dyna_guard").getValue() == undefined ? false : Xrm.Page.getAttribute("dyna_guard").getValue();
        var rengoring = Xrm.Page.getAttribute("dyna_cleaning").getValue() == undefined ? false : Xrm.Page.getAttribute("dyna_cleaning").getValue();
        var fronten = Xrm.Page.getAttribute("dyna_reception").getValue() == undefined ? false : Xrm.Page.getAttribute("dyna_reception").getValue();
        var mobel = Xrm.Page.getAttribute("dyna_furnituremovers").getValue() == undefined ? false : Xrm.Page.getAttribute("dyna_furnituremovers").getValue();
        var drift = Xrm.Page.getAttribute("dyna_guider").getValue() == undefined ? false : Xrm.Page.getAttribute("dyna_guider").getValue();
        var oplaeg = Xrm.Page.getAttribute("dyna_educators").getValue() == undefined ? false : Xrm.Page.getAttribute("dyna_educators").getValue();
        var av = Xrm.Page.getAttribute("dyna_avtekniker").getValue() == undefined ? false : Xrm.Page.getAttribute("dyna_avtekniker").getValue();

        if (!cafe && !vagt && !rengoring && !fronten && !mobel && !drift && !oplaeg && !av) {
            Dyna.ServiceActivity.ShowNotifications("Ingen funktions brugere er endnu blev orienteret om booking.", "QUESTION", "funktion", null, null);
        }


        var funktionBemaerkning = Xrm.Page.getAttribute("dyna_funktionsbemrkning").getValue();
        if (funktionBemaerkning) {
            Dyna.ServiceActivity.ShowNotifications("Der er angivet bemærkning fra en af funktions brugere", "WARNING", "funktionBemaerkning", null, null);
        }

        //Status
        var klartilfakturering = Xrm.Page.getAttribute("dyna_klartilfakturering").getValue();
        var scheduleEndDate = Xrm.Page.getAttribute("scheduledend").getValue();
        var currentdate = new Date();

        if (klartilfakturering == 0 && scheduleEndDate.getDate() < currentdate.getDate()) {

            Dyna.ServiceActivity.ShowNotifications("Denne booking er klar til fakturering. Ændre status til 'Send til fakturering'.", "SUCCESS", "klartilfakturering_2", null, null);
            Dyna.ServiceActivity.ShowNotifications("Alle funktions brugere har fuldført deres arbejd.", "SUCCESS", "klartilfakturering_1", null, null);

        }

        //Rundvisning
        var rundvisning = Xrm.Page.getAttribute("dyna_rundvisning").getValue();
        var guider = Xrm.Page.getAttribute("dyna_guidefuldenavn").getValue();
        var antalguider = Xrm.Page.getAttribute("dyna_antalguider").getValue();
        var tilmeldteguide = Xrm.Page.getAttribute("dyna_tilmeldteguide").getValue();
        if (rundvisning && guider == null) {
            Dyna.ServiceActivity.ShowNotifications("Der er ikke fundet nogen guider endnu", "WARNING", "rundvisning_1", null, null);
        }
        else if (rundvisning && guider != null && antalguider != tilmeldteguide) {
            Dyna.ServiceActivity.ShowNotifications("Der mangler stadig at finde " + (parseInt(antalguider) - parseInt(tilmeldteguide)) + " guide(r)", "INFO", "rundvisning_2", null, null);
        }
        else if (rundvisning && guider != null && antalguider == tilmeldteguide) {
            Dyna.ServiceActivity.ShowNotifications("De nødvendige guider er blevet fundet. " + guider, "SUCCESS", "rundvisning_3", null, null);
        }

        //Oplægsholder
        var oplaegsholder = Xrm.Page.getAttribute("dyna_oplgsholder").getValue();
        var oplaegsholdernavne = Xrm.Page.getAttribute("dyna_oplaegsholderfuldenavne").getValue();
        var antaloplaeg = Xrm.Page.getAttribute("dyna_antaloplaegsholder").getValue();
        var tilmeldteoplaeg = Xrm.Page.getAttribute("dyna_tilmedlteoplaegsholder").getValue();
        if (oplaegsholder && guider == null) {
            Dyna.ServiceActivity.ShowNotifications("Der er ikke fundet nogen oplægsholder endnu", "WARNING", "oplaegsholder_1", null, null);
        }
        else if (oplaegsholder && guider != null && antaloplaeg != tilmeldteoplaeg) {
            Dyna.ServiceActivity.ShowNotifications("Der mangler stadig at finde " + (parseInt(antalguider) - parseInt(tilmeldteguide)) + " oplægsholder", "INFO", "oplaegsholder_2", null, null);
        }
        else if (oplaegsholder && guider != null && antaloplaeg == tilmeldteoplaeg) {
            Dyna.ServiceActivity.ShowNotifications("De nødvendige oplægsholder er blevet fundet. " + guider, "SUCCESS", "oplaegsholder_3", null, null);
        }

        //Forplejning
        var antalankommet = Xrm.Page.getAttribute("dyna_antalankommet").getValue();
        var deltager = Xrm.Page.getAttribute("dyna_antaldeltager").getValue();
        if (antalankommet != deltager) {
            Dyna.ServiceActivity.ShowNotifications("Der er ændret i antal ankommet.", "INFO", "forplejning_1", null, null);
        }

        //Bookingbekræftelse
        var emailSendt = Xrm.Page.getAttribute("dyna_bookingbekraeftelsesemailersendt").getValue();
        if (!emailSendt) {
            Dyna.ServiceActivity.ShowNotifications("Bookingbekræftelse er endnu ikke sendt til kunden.", "INFO", "bookingbekraeftelse_1", null, null);
        }
    }
}



//Set BookingType value
//arg bookingType = value of Dyna.DataTypes.bookingTypeOptionSet (use integer value field)
//arg fieldName = name of BookingType field name,
//if fieldName == undefined - it will use default name from Dyna.Names.BookingTypeField.name
Dyna.ServiceActivity.setBookingType = function (bookingType, fieldName) {

    if (typeof (fieldName) == "undefined") {
        fieldName = Dyna.Names.BookingTypeField.name;
    }

    var control = Xrm.Page.getAttribute(fieldName);

    if (control.getAttributeType() == 'optionset') {

        var value = control.getValue(bookingType);

        if (typeof (value) == "undefined" || value == null) {
            control.setValue(bookingType);
            control.setSubmitMode("always");
        }
    } else {
        alert("Invalid field type or field '" + fieldName + "' not found. Field type should be OptionSet");
        return;
    }
};

Dyna.ServiceActivity.RequireSchoolProduct = function () {
    //var arrLabel = Xrm.Page.getAttribute("dyna_arrangementstypeid");
    //var pro = Xrm.Page.getAttribute("dyna_productid");

    //if (arrLabel.getValue() != null) {
    //    if (arrLabel.getValue()[0].name == "Besøg på egen hånd") {
    //        pro.setRequiredLevel("none");
    //    }
    //    else {
    //        pro.setRequiredLevel("required");
    //    }
    //}
}


//Will init BookingType for Undervisning form
Dyna.ServiceActivity.initBookingTypeForUndervisning = function () {
    var currentForm = Xrm.Page.ui.formSelector.getCurrentItem();
    var bookingTypeLabel = Xrm.Page.getAttribute("dyna_bookingtype").getText();

    if (Xrm.Page.ui.getFormType() == Dyna.DataTypes.FormTypes.Create.value) {
        Dyna.ServiceActivity.setBookingType(Dyna.DataTypes.bookingTypeOptionSet.Undervisning.value);

        var typeVal = [];
        typeVal.push({});
        typeVal[0].id = "AF776EF8-A56F-E611-80C2-000C29332864";
        typeVal[0].name = "Skoleforløb";
        typeVal[0].entityType = 'dyna_arrangementstype';
        Xrm.Page.getAttribute("dyna_arrangementstypeid").setValue(typeVal);

        Xrm.Page.getAttribute("dyna_reception").setValue(true);
    }
    else if (Xrm.Page.ui.getFormType() != Dyna.DataTypes.FormTypes.Create.value && currentForm.getLabel().toLowerCase() != bookingTypeLabel.toLowerCase()) {
        Dyna.ServiceActivity.ChangeForm(Xrm.Page.getAttribute("dyna_bookingtype").getText());
    }
}

//Will init BookingType for Arrangement form
Dyna.ServiceActivity.initBookingTypeForArrangement = function () {
    var currentForm = Xrm.Page.ui.formSelector.getCurrentItem();
    var bookingTypeLabel = Xrm.Page.getAttribute("dyna_bookingtype").getText();


    if (Xrm.Page.ui.getFormType() == Dyna.DataTypes.FormTypes.Create.value) {
        Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger").setVisible(false);
        Dyna.ServiceActivity.setBookingType(Dyna.DataTypes.bookingTypeOptionSet.Arrangement.value);
    }
    else if (Xrm.Page.ui.getFormType() != Dyna.DataTypes.FormTypes.Create.value && currentForm.getLabel().toLowerCase() != bookingTypeLabel.toLowerCase()) {
        Dyna.ServiceActivity.ChangeForm(Xrm.Page.getAttribute("dyna_bookingtype").getText());
    }

    var ar = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();

    if (ar != null) {
        if (ar[0].name == "Rundvisning") {
            Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger").setVisible(false);
        }
        else {
            Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger").setVisible(true);
        }
    }

}

Dyna.ServiceActivity.initBookingTypeForAU = function () {
    var currentForm = Xrm.Page.ui.formSelector.getCurrentItem();
    var bookingTypeLabel = Xrm.Page.getAttribute("dyna_bookingtype").getText();

    if (Xrm.Page.ui.getFormType() == Dyna.DataTypes.FormTypes.Create.value) {
        Dyna.ServiceActivity.setBookingType(Dyna.DataTypes.bookingTypeOptionSet.AuBooking.value);
    }
    else if (Xrm.Page.ui.getFormType() != Dyna.DataTypes.FormTypes.Create.value && currentForm.getLabel().toLowerCase() != bookingTypeLabel.toLowerCase()) {
        Dyna.ServiceActivity.ChangeForm(Xrm.Page.getAttribute("dyna_bookingtype").getText());
    }


}

Dyna.ServiceActivity.initBookingTypeForGaestevaerelse = function () {
    var currentForm = Xrm.Page.ui.formSelector.getCurrentItem();
    var bookingTypeLabel = Xrm.Page.getAttribute("dyna_bookingtype").getText();

    if (Xrm.Page.ui.getFormType() == Dyna.DataTypes.FormTypes.Create.value) {
        Dyna.ServiceActivity.setBookingType(Dyna.DataTypes.bookingTypeOptionSet.Gaestevaerelse.value);
    }
    else if (Xrm.Page.ui.getFormType() != Dyna.DataTypes.FormTypes.Create.value && currentForm.getLabel().toLowerCase() != bookingTypeLabel.toLowerCase()) {
        Dyna.ServiceActivity.ChangeForm(Xrm.Page.getAttribute("dyna_bookingtype").getText());
    }

}

Dyna.ServiceActivity.initBookingTypeForSubArrangement = function () {
    var currentForm = Xrm.Page.ui.formSelector.getCurrentItem();
    var bookingTypeLabel = Xrm.Page.getAttribute("dyna_bookingtype").getText();
    var overordnetBooking = Xrm.Page.getAttribute("dyna_overordnetbookingid").getValue();

    if (overordnetBooking != null) {
        if (Xrm.Page.ui.getFormType() == Dyna.DataTypes.FormTypes.Create.value) {
            if (currentForm.getLabel().toLowerCase() != Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.text.toLowerCase()) {
                Dyna.ServiceActivity.ChangeForm(Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.text);
            }
            else {
                Dyna.ServiceActivity.setBookingType(Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.value);

                var obj = [];
                obj.push({});
                obj[0].id = Xrm.Page.getAttribute("dyna_accountid").getValue()[0].id;
                obj[0].name = Xrm.Page.getAttribute("dyna_accountid").getValue()[0].name;
                obj[0].entityType = Xrm.Page.getAttribute("dyna_accountid").getValue()[0].entityType;

                Xrm.Page.getAttribute("regardingobjectid").setValue(obj);
            }

            Xrm.Page.getAttribute("dyna_subbooking").setValue(true);
        }
        else if (Xrm.Page.ui.getFormType() != Dyna.DataTypes.FormTypes.Create.value && currentForm.getLabel().toLowerCase() != bookingTypeLabel.toLowerCase()) {
            Dyna.ServiceActivity.ChangeForm(Xrm.Page.getAttribute("dyna_bookingtype").getText());
        }
    }
    else {
        Dyna.ServiceActivity.ChangeForm(Dyna.DataTypes.bookingTypeOptionSet.Arrangement.text);
    }
}

Dyna.ServiceActivity.CreateSubArrangement = function () {
    var params = {};
    params["_CreateFromId"] = Xrm.Page.data.entity.getId().substring(1, 37);
    params["_CreateFromType"] = 4214;
    params["etc"] = 4214;
    params["dyna_bookingtype"] = 378080004;
    params["dyna_accountid"] = Xrm.Page.getAttribute("dyna_accountid").getValue()[0].id;
    params["dyna_accountidname"] = Xrm.Page.getAttribute("dyna_accountid").getValue()[0].name;
    params["dyna_contactid"] = Xrm.Page.getAttribute("dyna_contactid").getValue()[0].id;
    params["dyna_contactidname"] = Xrm.Page.getAttribute("dyna_contactid").getValue()[0].name;
    params["siteid"] = Xrm.Page.getAttribute("siteid").getValue()[0].id;
    params["siteidname"] = Xrm.Page.getAttribute("siteid").getValue()[0].name;
    params["formid"] = "B71E5BDD-FA6C-4647-AF8A-42078D067509";

    Xrm.Utility.openEntityForm(Xrm.Page.data.entity.getEntityName(), null, params);
}

Dyna.ServiceActivity.setProductPrice = function () {

    var priceAttr = Xrm.Page.getAttribute("dyna_price");
    var hasProduct = false;

    var productLookupValue = Xrm.Page.getAttribute("dyna_productid").getValue();
    if (productLookupValue != null) {
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

                        //Dyna.ServiceActivity.CalculateTotalPrice();
                        //Dyna.ServiceActivity.CalculateSponsorship();
                    }

                },
                function (e) {
                    alert(err.message);
                }
            );

        }
    }

    if (!hasProduct) {
        priceAttr.setValue(0);
        priceAttr.setSubmitMode("always");
        Dyna.ServiceActivity.CalculateTotalPrice();
    }
}

Dyna.ServiceActivity.HideAVUdstyr = function () {
    var at = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();
    if (at != null) {
        if (at[0].name == "Rundvisning" || at[0].name == "Rundvisning - Ramme") {
            Xrm.Page.ui.tabs.get("service").sections.get("service_section_AVUdstyr").setVisible(false);
        }
    }



}

Dyna.ServiceActivity.DefaultFrontNotification = function () {
    var arrType = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();

    if (arrType != null)
        if (arrType[0].name == "Skoleforløb") {
            Xrm.Page.getAttribute("dyna_reception").setValue(true);
        }
        else {
            Xrm.Page.getAttribute("dyna_reception").setValue(false);
        }
}


Dyna.ServiceActivity.setSponsor = function () {

    var sponsorAttr = Xrm.Page.getAttribute("dyna_sponsorid");
    //if (sponsorAttr.getValue() == null) {
    var sponsorDiscountAttr = Xrm.Page.getAttribute("dyna_sponsorrabet");
    var hasAccount = false;

    var accountLookupValue = Xrm.Page.getAttribute("dyna_accountid").getValue();
    if (accountLookupValue != null) {
        if (accountLookupValue.length > 0) {
            hasAccount = true;

            var accountId = accountLookupValue[0].id;
            accountId = accountId.substring(1, accountId.length - 1);

            SDK.JQuery.retrieveMultipleRecords(
                'dyna_sponsor',
                "?$filter=dyna_accountId/Id eq (guid'" + accountId + "') and statecode/Value eq 0&$top=1", //"$filter=statecode/Value eq 0&$top=1",
                function (sponsors) {
                    var erSponsor = false;
                    var sponsorVal = null;
                    if (sponsors.length > 0) {

                        var sponsorVal = [];
                        sponsorVal.push({});
                        sponsorVal[0].id = sponsors[0].dyna_sponsorId;
                        sponsorVal[0].name = sponsors[0].dyna_name;
                        sponsorVal[0].entityType = 'dyna_sponsor';
                        erSponsor = true;

                        if (sponsors[0].dyna_Notertilarrangementer != null) {
                            Xrm.Page.ui.tabs.get("tab_11_kunde").sections.get("tab_11_section_3_sponsornoter").setVisible(true);
                            Xrm.Page.getAttribute("dyna_sponsornoter").setValue(sponsors[0].dyna_Notertilarrangementer);
                        }
                        else {
                            Xrm.Page.ui.tabs.get("tab_11_kunde").sections.get("tab_11_section_3_sponsornoter").setVisible(false);
                            Xrm.Page.getAttribute("dyna_sponsornoter").setValue("");
                        }
                        Xrm.Page.getAttribute("dyna_sponsornoter").setSubmitMode("always");

                    }
                    else {
                        if (Xrm.Page.getAttribute("dyna_sponsornoter").getValue() != null) {
                            Xrm.Page.ui.tabs.get("tab_11_kunde").sections.get("tab_11_section_3_sponsornoter").setVisible(false);
                            Xrm.Page.getAttribute("dyna_sponsornoter").setValue("");
                            Xrm.Page.getAttribute("dyna_sponsornoter").setSubmitMode("always");
                        }
                    }

                    Xrm.Page.getAttribute("dyna_ersponsor").setValue(erSponsor);
                    Xrm.Page.getAttribute("dyna_ersponsor").setSubmitMode("always");


                    sponsorAttr.setValue(sponsorVal);
                    sponsorAttr.setSubmitMode("always");

                    Dyna.ServiceActivity.EnableSponsorfields();
                },
                function (e) {
                    alert(err.message);
                },
                function (e) { }
            );

        }
    }
    if (!hasAccount) {
        sponsorAttr.setValue(null);
        sponsorDiscountAttr.setValue(null);

        Xrm.Page.getAttribute("dyna_ersponsor").setValue(false);
        Xrm.Page.getAttribute("dyna_sponsornoter").setValue("");
        Xrm.Page.getAttribute("dyna_sponsornoter").setSubmitMode("always");
        Xrm.Page.ui.tabs.get("tab_11_kunde").sections.get("tab_11_section_3_sponsornoter").setVisible(false);
    }

};

Dyna.ServiceActivity.EnableSponsorfields = function () {

    var sponsorAttr = Xrm.Page.getAttribute("dyna_sponsorid").getValue();

    if (sponsorAttr != null) {
        Xrm.Page.ui.controls.get("dyna_moedelokalerabat").setDisabled(false);
        Xrm.Page.ui.controls.get("dyna_moedelokaleantal").setDisabled(false);
        Xrm.Page.ui.controls.get("dyna_rundvisningrabat").setDisabled(false);
        Xrm.Page.ui.controls.get("dyna_rundvisningantal").setDisabled(false);
    }
    else {
        Xrm.Page.ui.controls.get("dyna_moedelokalerabat").setDisabled(true);
        Xrm.Page.ui.controls.get("dyna_moedelokaleantal").setDisabled(true);
        Xrm.Page.ui.controls.get("dyna_rundvisningrabat").setDisabled(true);
        Xrm.Page.ui.controls.get("dyna_rundvisningantal").setDisabled(true);
    }
};

Dyna.ServiceActivity.SetCustomers = function () {

    Xrm.Page.getAttribute("customers").setValue(null);

    var account = Xrm.Page.getAttribute("dyna_accountid").getValue();
    var contact = Xrm.Page.getAttribute("dyna_contactid").getValue();

    var index = 0;

    var partlist = new Array();
    if (account != null) {
        partlist[index] = account[0];

        index = index + 1;
    }

    if (contact != null) {

        partlist[index] = contact[0];
    }

    if (partlist.length != 0) {
        Xrm.Page.getAttribute("customers").setValue(partlist);
        Xrm.Page.getAttribute("customers").setSubmitMode("always");
    }
}

Dyna.ServiceActivity.CheckContact = function () {
    var contact = Xrm.Page.getAttribute("dyna_contactid");

    if (contact.getValue() != null) {
        Xrm.Page.getControl("dyna_contactid").setDisabled(false);
    } else {
        Xrm.Page.getControl("dyna_contactid").setDisabled(true);
    }
}

Dyna.ServiceActivity.EnableDisableContact = function () {

    var account = Xrm.Page.getAttribute("dyna_accountid").getValue();
    var contact = Xrm.Page.getAttribute("dyna_contactid");
    contact.setValue(null);

    if (account == null) {
        //Xrm.Page.getControl("dyna_contactid").setDisabled(true);
        Xrm.Page.getAttribute("customers").setValue(null);
    } else {
        Xrm.Page.getControl("dyna_contactid").setDisabled(false);
    }
}

Dyna.ServiceActivity.FillOutRegarding = function () {
    var account = Xrm.Page.getAttribute("dyna_accountid");

    if (account.getValue() != null) {
        var regardingLkp = [{
            "id": account.getValue()[0].id,
            "entityType": "account",
            "name": account.getValue()[0].name
        }];
        Xrm.Page.getAttribute("regardingobjectid").setValue(regardingLkp);
    } else {
        Xrm.Page.getAttribute("regardingobjectid").setValue(null);
    }

    Dyna.ServiceActivity.EnableDisableContact();
}

Dyna.ServiceActivity.CalculateSponsorship = function () {
    if (Xrm.Page.getAttribute("dyna_sponsorid").getValue() != null) {
        Dyna.ServiceActivity.CalculateSponsorship();
    }
    else {
        Xrm.Page.getAttribute("dyna_rundvisningrabat").setValue(250000);
    }
}


Dyna.ServiceActivity.CalculateSponsorship = function () {
    //dyna_moededelokale, dyna_rundvisning

    if (Xrm.Page.getAttribute("dyna_sponsorid").getValue() != null) {

        var sponsorId = Xrm.Page.getAttribute("dyna_sponsorid").getValue()[0].id;

        SDK.JQuery.retrieveMultipleRecords(
        'dyna_sponsor',
        "?$filter=dyna_sponsorId eq (guid'" + sponsorId + "') and statuscode/Value eq 1&$top=1",
        function (result) {
            if (result.length > 0) {
                var totalRabat = 0;
                var sponsorDiscount = Xrm.Page.getAttribute("dyna_sponsorrabet");
                var totallokale = Xrm.Page.getAttribute("dyna_totallokale").getValue();
                var totalrundvisning = Xrm.Page.getAttribute("dyna_totalrundvisning").getValue();
                var totalauditorium = Xrm.Page.getAttribute("dyna_totalauditorium").getValue();

                //Mødelokale
                var b_moedelokalerabat = Xrm.Page.getAttribute("dyna_moedelokalerabat").getValue();
                var b_moedelokaleantal = Xrm.Page.getAttribute("dyna_moedelokaleantal").getValue();
                var b_moedelokaletotalrabat = Xrm.Page.getAttribute("dyna_moedelokaletotalrabat");
                var b_calcMoedelokaleRabat = b_moedelokaletotalrabat.getValue();

                //Auditorium
                var b_auditoriumantal = Xrm.Page.getAttribute("dyna_auditoriumantal").getValue();
                var b_auditoriumtotalrabat = Xrm.Page.getAttribute("dyna_auditoriumtotalrabat");
                var b_calcAuditorium = b_auditoriumtotalrabat.getValue();

                //Rundvisning
                var b_rundvisningrabat = Xrm.Page.getAttribute("dyna_rundvisningrabat").getValue();
                var b_rundvisningantal = Xrm.Page.getAttribute("dyna_rundvisningantal").getValue();
                var b_rundvisningtotalrabat = Xrm.Page.getAttribute("dyna_rundvisningtotalrabat");
                var b_calcRundvisningRabat = 0;

                //Andet
                var b_forplejningrabat = Xrm.Page.getAttribute("dyna_forplejningrabat").getValue();
                var b_saeraabningrabat = Xrm.Page.getAttribute("dyna_saeraabningrabat").getValue();
                var b_oplaegrabat = Xrm.Page.getAttribute("dyna_oplaegrabat").getValue();
                var b_diversetotalrabat = Xrm.Page.getAttribute("dyna_diversetotalrabat");
                var b_calcForplejningRabat = 0;
                var b_calcSaerAabningRabat = 0;
                var b_calcOplaegRabat = 0;
                var totalDiverse = 0;


                var moedelokaleRabat = result[0].dyna_MoedelokaleRabat;
                var moedelokaleRabatType = result[0].dyna_MoedelokaleRabatType;
                var rundvisningsRabatType = result[0].dyna_RundvisningsRabatType;
                var rundvsiningRabat = result[0].dyna_RundvsiningRabat;
                var antalBrugtMoedelokaler = result[0].dyna_AntalBrugtMoedelokaler;
                var antalBrugtRundvisning = result[0].dyna_AntalBrugtRundvisning;
                var antalBrugtAuditorium = result[0].dyna_AntalBrugtAuditorium;
                var antalMoedelokale = result[0].dyna_AntalMoedelokale;
                var antalRundvisninger = result[0].dyna_AntalRundvisninger;
                var antalAuditorium = result[0].dyna_AntalAuditorium;

                var forplejningRabat = result[0].dyna_ForplejningRabat;
                var forplejningRabatType = result[0].dyna_ForplejningRabatType;
                var saerAabingRabat = result[0].dyna_SaerAabningRabat;
                var saerAabingRabatType = result[0].dyna_SaerAabningRabatType;
                var oplægRabat = result[0].dyna_OplaegRabat;
                var oplægRabatType = result[0].dyna_OplaegRabatType;




                //Mødelokale beregning
                //if (b_moedelokalerabat) {

                //    if (moedelokaleRabatType.Value == 378080000)//Procent %
                //    {
                //        b_calcMoedelokaleRabat = (totallokale * moedelokaleRabat) / 100;

                //    }
                //    else if (moedelokaleRabatType.Value == 378080001) //Valuta - DKK
                //    {
                //        b_calcMoedelokaleRabat = moedelokaleRabat;
                //    }
                //}

                //if (b_moedelokaleantal) {

                //    if (antalBrugtMoedelokaler < antalMoedelokale) {
                //        b_calcMoedelokaleRabat += totallokale;
                //    }
                //    else
                //    {
                //        alert("Denne rabat kan ikke bruges, da antal mødelokaler er brugt op");
                //        Xrm.Page.getAttribute("dyna_moedelokaleantal").setValue(false);
                //    }
                //}

                ////Auditorium beregning
                //if (b_auditoriumantal) {

                //    if (antalBrugtAuditorium < antalAuditorium) {
                //        b_calcAuditorium = totalauditorium;
                //    }
                //}


                //Rundvisning beregning
                if (b_rundvisningantal) {

                    if ((antalRundvisninger - antalBrugtRundvisning) == 0) {
                        alert("Denne rabat kan ikke bruges, da antal rundvisninger er brugt op");
                        Xrm.Page.getAttribute("dyna_rundvisningantal").setValue(false);
                    }
                    else {
                        b_calcRundvisningRabat = totalrundvisning;
                    }
                }
                else if (b_rundvisningrabat) {
                    if (rundvisningsRabatType.Value == 378080000)//Procent %
                    {
                        b_calcRundvisningRabat = (totalrundvisning * rundvsiningRabat) / 100;
                    }
                    else if (rundvisningsRabatType.Value == 378080001) //Valuta - DKK
                    {
                        b_calcRundvisningRabat = rundvsiningRabat;
                    }
                }


                //Forplejning beregning
                if (b_forplejningrabat) {
                    if (forplejningRabatType.Value == 378080000)//Procent %
                    {
                        b_calcForplejningRabat = (totalForplejning * forplejningRabat) / 100;
                    }
                    else if (forplejningRabatType.Value == 378080001) //Valuta - DKK
                    {
                        b_calcForplejningRabat = forplejningRabat;
                    }
                }

                //Særåbning beregning
                if (b_saeraabningrabat) {
                    if (saerAabingRabatType.Value == 378080000)//Procent %
                    {
                        b_calcSaerAabningRabat = saerAabingRabat;  // (totalForplejning * saerAabingRabat) / 100;
                    }
                    else if (saerAabingRabatType.Value == 378080001) //Valuta - DKK
                    {
                        b_calcSaerAabningRabat = saerAabingRabat;
                    }

                    totalDiverse = b_calcSaerAabningRabat;
                }

                //Oplæg beregning
                if (b_oplaegrabat) {
                    if (oplægRabatType.Value == 378080000)//Procent %
                    {
                        b_calcOplaegRabat = oplægRabat; //(totalForplejning * oplægRabat) / 100;
                    }
                    else if (oplægRabatType.Value == 378080001) //Valuta - DKK
                    {
                        b_calcOplaegRabat = oplægRabat;
                    }

                    totalDiverse += b_calcOplaegRabat;
                }

                //b_moedelokaletotalrabat.setValue(b_calcMoedelokaleRabat);
                b_rundvisningtotalrabat.setValue(b_calcRundvisningRabat);
                b_diversetotalrabat.setValue(b_calcForplejningRabat);
                //b_auditoriumtotalrabat.setValue(b_calcAuditorium);
                Xrm.Page.getAttribute("dyna_totaldiverse").setValue(totalDiverse);

                totalRabat = b_calcMoedelokaleRabat + b_calcRundvisningRabat + b_calcForplejningRabat + b_calcAuditorium;
                sponsorDiscount.setValue(totalRabat);

                Xrm.Page.getAttribute("dyna_totalforplejning").setSubmitMode("always");
                Xrm.Page.getAttribute("dyna_moedelokaletotalrabat").setSubmitMode("always");
                Xrm.Page.getAttribute("dyna_rundvisningtotalrabat").setSubmitMode("always");
                Xrm.Page.getAttribute("dyna_sponsorrabet").setSubmitMode("always");
                Xrm.Page.getAttribute("dyna_diversetotalrabat").setSubmitMode("always");
                Xrm.Page.getAttribute("dyna_totaldiverse").setSubmitMode("always");
                Xrm.Page.getAttribute("dyna_totalauditorium").setSubmitMode("always");



                Dyna.ServiceActivity.CalculateTotalDiscount();
            }
        },
            function (error) {
                alert(error.message);
            },
            function (e) { }
        );
    }
}

Dyna.ServiceActivity.CalculateTotalPrice = function () {
    //var totalPrice = Xrm.Page.getAttribute("dyna_totalpris");
    //if (Xrm.Page.getAttribute("dyna_amountofgroup").getValue() != null && Xrm.Page.getAttribute("dyna_price").getValue() != null) {
    //    var amountOfGroup = Xrm.Page.getAttribute("dyna_amountofgroup").getValue();
    //    var productPrice = Xrm.Page.getAttribute("dyna_price").getValue();

    //    totalPrice.setValue(parseFloat(eval(productPrice * amountOfGroup)));

    //    Dyna.ServiceActivity.CalculateSummarizeTotalPrice();
    //}
}

Dyna.ServiceActivity.Recalculate = function () {
    window.location.reload(true);
}

Dyna.ServiceActivity.CalculateTotalDiscount = function () {
    var sponsorDiscount = Xrm.Page.getAttribute("dyna_sponsorrabet").getValue();
    var manualDiscount = Xrm.Page.getAttribute("dyna_manualrabat").getValue();
    var totalDiscount = Xrm.Page.getAttribute("dyna_samletrabat");

    totalDiscount.setValue(parseFloat(eval(sponsorDiscount + manualDiscount)));

    Dyna.ServiceActivity.CalculateSummarizeTotalPrice();
}

Dyna.ServiceActivity.CalculateTotalDiscountUndervisning = function () {
    var manualDiscount = Xrm.Page.getAttribute("dyna_manualrabat").getValue();
    var totalPrice = Xrm.Page.getAttribute("dyna_totalydelse").getValue();
    var summarizeTotalPrice = Xrm.Page.getAttribute("dyna_sumprice");

    summarizeTotalPrice.setValue(parseFloat(eval((totalPrice) - manualDiscount)));
}

Dyna.ServiceActivity.CalculateSummarizeTotalPrice = function () {
    var totalPrice = Xrm.Page.getAttribute("dyna_totalydelse").getValue();
    var totalDiscount = Xrm.Page.getAttribute("dyna_samletrabat").getValue();
    var summarizeTotalPrice = Xrm.Page.getAttribute("dyna_sumprice");

    summarizeTotalPrice.setValue(parseFloat(eval((totalPrice) - totalDiscount)));
}

Dyna.ServiceActivity.CalculateSponsorOnForplejning = function () {
    var b_forplejningrabat = Xrm.Page.getAttribute("dyna_forplejningrabat").getValue();

    if (b_forplejningrabat) {
        Dyna.ServiceActivity.CalculateSponsorship();
    }
    else {
        Xrm.Page.getAttribute("dyna_diversetotalrabat").setValue(0);
        Dyna.ServiceActivity.CalculateSummarizeTotalPrice();
    }
}

Dyna.ServiceActivity.CalculateDiverse = function () {
    var b_saeraabningrabat = Xrm.Page.getAttribute("dyna_saeraabningrabat").getValue();
    var b_oplaegrabat = Xrm.Page.getAttribute("dyna_oplaegrabat").getValue();

    if (b_saeraabningrabat || b_oplaegrabat) {
        Dyna.ServiceActivity.CalculateSponsorship();
    }
    else if (!b_saeraabningrabat && !b_oplaegrabat) {
        Xrm.Page.getAttribute("dyna_totaldiverse").setValue(0);
        Dyna.ServiceActivity.CalculateSummarizeTotalPrice();
    }
}

Dyna.ServiceActivity.ShowFollowUpField = function () {
    var status = Xrm.Page.getAttribute("statuscode");

    if (status.getValue() == Dyna.DataTypes.StatusCodeOptionSet.Igangvaerende.value || status.getValue() == Dyna.DataTypes.StatusCodeOptionSet.Forespørgsel.value) {
        Xrm.Page.getControl("dyna_opflgning").setVisible(true);

        var followUp = Xrm.Page.getAttribute("dyna_opflgning").getValue();
        Xrm.Page.getControl("dyna_opfoelgningsdato").setVisible(followUp);

    }
    else {
        Xrm.Page.getControl("dyna_opflgning").setVisible(false);
        Xrm.Page.getControl("dyna_opfoelgningsdato").setVisible(false);
        Xrm.Page.getControl("dyna_opfoelgningsdato").setDisabled(false);
        Xrm.Page.getAttribute("dyna_opfoelgningsdato").setValue(null);
    }
}

Dyna.ServiceActivity.ShowFollowUpDateField = function () {
    var status = Xrm.Page.getAttribute("statuscode");
    var followUp = Xrm.Page.getAttribute("dyna_opflgning").getValue();

    if (status.getValue() == Dyna.DataTypes.StatusCodeOptionSet.Igangvaerende.value && followUp) {
        var scheduledstart = Xrm.Page.getAttribute("scheduledstart").getValue();
        Xrm.Page.getControl("dyna_opfoelgningsdato").setVisible(true);

        var followUpDate = new Date();
        followUpDate.setDate(scheduledstart.getDate() - 10);

        Xrm.Page.getAttribute("dyna_opfoelgningsdato").setValue(followUpDate);
        Dyna.ServiceActivity.SetTime("dyna_opfoelgningsdato", 10, 0);
    }
    else {
        Xrm.Page.getAttribute("dyna_opfoelgningsdato").setValue(null);
        Xrm.Page.getControl("dyna_opfoelgningsdato").setVisible(false);
        Xrm.Page.getControl("dyna_opfoelgningsdato").setDisabled(false);
    }
}

Dyna.ServiceActivity.SetTime = function (attributeName, hour, minute) {
    var attribute = Xrm.Page.getAttribute(attributeName);
    if (attribute.getValue() == null) {
        attribute.setValue(new Date());
    }
    attribute.setValue(attribute.getValue().setHours(hour, minute, 0));
}

Dyna.ServiceActivity.AddDay = function (attributeName, day) {
    var attribute = Xrm.Page.getAttribute(attributeName);
    attribute.setValue(attribute.getValue().getDate() + day);
}

Dyna.ServiceActivity.SetDefaultValues = function () {

    if (Xrm.Page.ui.getFormType() == 1) {
        var totalrundvisning = Xrm.Page.getAttribute("dyna_totalrundvisning");
        if (totalrundvisning.getValue() == null) {
            totalrundvisning.setValue(0);
        }

        //var totaldeltager = Xrm.Page.getAttribute("dyna_antaldeltager");
        //if (totaldeltager.getValue() == null) {
        //    totaldeltager.setValue(0);
        //}

        //var totalTicket = Xrm.Page.getAttribute("dyna_antalbilletter");
        //if (totalTicket.getValue() == null) {
        //    totalTicket.setValue(0);
        //}

        //var amountOfGroup = Xrm.Page.getAttribute("dyna_amountofgroup");
        //if (amountOfGroup.getValue() == null) {
        //    amountOfGroup.setValue(0);
        //}

        //var antalankommet = Xrm.Page.getAttribute("dyna_antalankommet");
        //if (antalankommet.getValue() == null) {
        //    antalankommet.setValue(0);
        //}

        var totalForplejning = Xrm.Page.getAttribute("dyna_totalforplejning");
        if (totalForplejning.getValue() == null) {
            totalForplejning.setValue(0);
        }

        var totalLokale = Xrm.Page.getAttribute("dyna_totallokale");
        if (totalLokale.getValue() == null) {
            totalLokale.setValue(0);
        }

        var totalAuditorium = Xrm.Page.getAttribute("dyna_totalauditorium");
        if (totalAuditorium.getValue() == null) {
            totalAuditorium.setValue(0);
        }

        var totalEntrebillet = Xrm.Page.getAttribute("dyna_totalentrebillet");
        if (totalEntrebillet.getValue() == null) {
            totalEntrebillet.setValue(0);
        }

        var totalDiverse = Xrm.Page.getAttribute("dyna_totaldiverse");
        if (totalDiverse.getValue() == null) {
            totalDiverse.setValue(0);
        }

        var sponsorDiscount = Xrm.Page.getAttribute("dyna_sponsorrabet");
        if (sponsorDiscount.getValue() == null) {
            sponsorDiscount.setValue(0);
        }

        var manualDiscount = Xrm.Page.getAttribute("dyna_manualrabat");
        if (manualDiscount.getValue() == null) {
            manualDiscount.setValue(0);
        }

        var totalPrice = Xrm.Page.getAttribute("dyna_totalydelse");
        if (totalPrice.getValue() == null) {
            totalPrice.setValue(0);
        }

        var totalDiscount = Xrm.Page.getAttribute("dyna_samletrabat");
        if (totalDiscount.getValue() == null) {
            totalDiscount.setValue(0);
        }

        var summarizeTotalPrice = Xrm.Page.getAttribute("dyna_sumprice");
        if (summarizeTotalPrice.getValue() == null) {
            summarizeTotalPrice.setValue(0);
        }

        var amountOfGuide = Xrm.Page.getAttribute("dyna_antalguider");
        if (amountOfGuide.getValue() == null) {
            amountOfGuide.setValue(0);
        }

        var site = Xrm.Page.getAttribute("siteid").getValue();
        if (site == null) {

            Dyna.ServiceActivity.GetSite();
        }

    }
}

Dyna.ServiceActivity.GetSite = function () {

    if (Xrm.Page.getAttribute("siteid").getValue() == null) {
        SDK.JQuery.retrieveMultipleRecords(
        "Site",
        "?$select=Name,SiteId&$filter=Name eq 'Moesgaard%20Museum'&$top=1",
        function (results) {
            var name = results[0].Name;
            var siteId = results[0].SiteId;

            var siteVal = [];
            siteVal.push({});
            siteVal[0].id = siteId;
            siteVal[0].name = name;
            siteVal[0].entityType = 'site';

            Xrm.Page.getAttribute("siteid").setValue(siteVal);
        },
        function (error) {
            alert(error.message);
        },
        function () {
            //On Complete - Do Something
        });
    }
}

Dyna.ServiceActivity.SetDefaultValuesGaetevaerelse = function () {

    if (Xrm.Page.ui.getFormType() == 1) {
        //var manualDiscount = Xrm.Page.getAttribute("dyna_manualrabat");
        //if (manualDiscount.getValue() == null) {
        //    manualDiscount.setValue(0);
        //}

        var totalPrice = Xrm.Page.getAttribute("dyna_totalydelse");
        if (totalPrice.getValue() == null) {
            totalPrice.setValue(0);
        }

        //var totalDiscount = Xrm.Page.getAttribute("dyna_samletrabat");
        //if (totalDiscount.getValue() == null) {
        //    totalDiscount.setValue(0);
        //}

        var summarizeTotalPrice = Xrm.Page.getAttribute("dyna_sumprice");
        if (summarizeTotalPrice.getValue() == null) {
            summarizeTotalPrice.setValue(0);
        }

        var arrangementType = [];
        arrangementType.push({});
        arrangementType[0].id = "{97E4CC44-6885-E611-80CB-0050568839E3}";
        arrangementType[0].name = "Gæsteværelse";
        arrangementType[0].entityType = 'dyna_arrangementstype';

        Xrm.Page.getAttribute("dyna_arrangementstypeid").setValue(arrangementType);

        //var start = Xrm.Page.getAttribute("scheduledstart");
        //var end = Xrm.Page.getAttribute("scheduledend");
        //Xrm.Page.getAttribute("scheduledstart").setValue(start.getValue().setHours(13, 00, 0));
        //Xrm.Page.getAttribute("scheduledend").setValue(end.getValue().setHours(10, 00, 0));

        Dyna.ServiceActivity.SetTime("scheduledstart", 13, 00, 0);
        Dyna.ServiceActivity.SetTime("scheduledend", 10, 00, 0);
        Xrm.Page.getAttribute("scheduledend").setValue(Xrm.Page.getAttribute("scheduledend").getValue().setDate(2));


        Xrm.Page.getAttribute("scheduleddurationminutes").setValue(1260); //21 hours

        Xrm.Page.getAttribute("statuscode").setValue(Dyna.DataTypes.StatusCodeOptionSet.Godkendt.value);
    }
}

Dyna.ServiceActivity.SetDateTime = function () {
    var scheduledstart = Xrm.Page.getAttribute("scheduledstart").getValue();
    var scheduledend = Xrm.Page.getAttribute("scheduledend").getValue();
    var actualstart = Xrm.Page.getAttribute("actualstart");
    var actualend = Xrm.Page.getAttribute("actualend");
    var sammetid = Xrm.Page.getAttribute("dyna_sammetid").getValue();

    if (sammetid) {
        actualstart.setValue(scheduledstart);
        actualend.setValue(scheduledend);
    }
    //else {
    //    if (actualstart.getValue() < scheduledstart) {
    //        actualstart.setValue(scheduledstart);
    //    }

    //    if (actualend.getValue() < scheduledend) {
    //        actualend.setValue(scheduledend);
    //    }
    //}

}

Dyna.ServiceActivity.IsDirty = function () {
    var attributes = Xrm.Page.data.entity.attributes.get();
    for (var i in attributes) {
        var attribute = attributes[i];
        if (attribute.getIsDirty()) {
            alert("attribute dirty: " + attribute.getName());
        }
    }
}

//Will show different StatusCode OptionSet Values base on BookingType
Dyna.ServiceActivity.StatusCodeFiltering = function () {
    var stateAttr = Xrm.Page.getAttribute("statecode");
    stateAttr.setSubmitMode("never");
    var state = stateAttr.getValue();

    if (state != 1 && state != 2) { //Planlagt        

        var st = Xrm.Page.getControl(Dyna.Names.StatusCodeField.name);
        var statusVal = Xrm.Page.getAttribute(Dyna.Names.StatusCodeField.name).getValue();
        var bookingType = Xrm.Page.getAttribute(Dyna.Names.BookingTypeField.name).getValue();
        var options = [];

        if (bookingType == Dyna.DataTypes.bookingTypeOptionSet.Undervisning.value) {

            if (Dyna.DataTypes.FormTypes.Create == Xrm.Page.ui.getFormType()) {
                statusVal = Dyna.DataTypes.StatusCodeOptionSet.Igangvaerende.value;
            }

            options.push(Dyna.DataTypes.StatusCodeOptionSet.Igangvaerende);
            options.push(Dyna.DataTypes.StatusCodeOptionSet.Godkendt);
            //options.push(Dyna.DataTypes.StatusCodeOptionSet.Ankommet_Betalt_i_kassen);
            options.push(Dyna.DataTypes.StatusCodeOptionSet.Ankommet_sendt_til_fakturering);
            //options.push(Dyna.DataTypes.StatusCodeOptionSet.Faktureret);

        }
        else if (bookingType == Dyna.DataTypes.bookingTypeOptionSet.Gaestevaerelse.value) {

            if (Dyna.DataTypes.FormTypes.Create == Xrm.Page.ui.getFormType()) {
                statusVal = Dyna.DataTypes.StatusCodeOptionSet.Godkendt.value;
            }

            options.push(Dyna.DataTypes.StatusCodeOptionSet.Godkendt);
            //options.push(Dyna.DataTypes.StatusCodeOptionSet.Ankommet_Betalt_i_kassen);
            options.push(Dyna.DataTypes.StatusCodeOptionSet.Ankommet_sendt_til_fakturering);
            //options.push(Dyna.DataTypes.StatusCodeOptionSet.Faktureret);

        }
        else if (bookingType == Dyna.DataTypes.bookingTypeOptionSet.Arrangement.value) {

            if (Dyna.DataTypes.FormTypes.Create == Xrm.Page.ui.getFormType()) {
                statusVal = Dyna.DataTypes.StatusCodeOptionSet.Igangvaerende.value;
            }

            options.push(Dyna.DataTypes.StatusCodeOptionSet.Forespørgsel);
            options.push(Dyna.DataTypes.StatusCodeOptionSet.Igangvaerende);
            options.push(Dyna.DataTypes.StatusCodeOptionSet.Godkendt);

            if (Xrm.Page.ui.getFormType() != 1) {
                var type = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue()[0].name;
                if (type == "Rundvisning - Ramme" || type == "Rundvisning") {
                    //options.push(Dyna.DataTypes.StatusCodeOptionSet.Ankommet_Betalt_i_kassen);
                    options.push(Dyna.DataTypes.StatusCodeOptionSet.Ankommet_sendt_til_fakturering);
                    //options.push(Dyna.DataTypes.StatusCodeOptionSet.Faktureret);
                }
                else {
                    options.push(Dyna.DataTypes.StatusCodeOptionSet.Sendt_til_bogholderi);
                    //options.push(Dyna.DataTypes.StatusCodeOptionSet.Faktureret);
                }
            }

        }
        else if (bookingType == Dyna.DataTypes.bookingTypeOptionSet.AuBooking.value) {

            options.push(Dyna.DataTypes.StatusCodeOptionSet.Igangvaerende);
            options.push(Dyna.DataTypes.StatusCodeOptionSet.Godkendt);

            if (Xrm.Page.ui.getFormType() != 1) {
                var type = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue()[0].name;
                options.push(Dyna.DataTypes.StatusCodeOptionSet.Sendt_til_bogholderi);
            }

        } else {
            return;
        }

        st.clearOptions();
        st.removeOption("");

        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            st.addOption(option);
        }

        Xrm.Page.getAttribute(Dyna.Names.StatusCodeField.name).setValue(statusVal);
    }
}

Dyna.ServiceActivity.SetGuiderFromResource = function () {
    var resources = Xrm.Page.getAttribute("resources").getValue();
    var guideName = "";


    for (var i = 0; i < resources.length; i++) {

        if (resources[i].typename == "systemuser") {
            guideName = resources[i].name;
            break;
        }
    }

    if (guideName != "") {
        Xrm.Page.getAttribute("dyna_guidefuldenavn").setValue(resources[i].name);
        Xrm.Page.getAttribute("dyna_antalguider").setValue(1);

        //Xrm.Page.getAttribute("dyna_guideid").setValue(null);
        //Xrm.Page.getControl("dyna_guideid").setDisabled(true);

    }
    else {
        Xrm.Page.getAttribute("dyna_guidefuldenavn").setValue(null);
        //Xrm.Page.getControl("dyna_guideid").setDisabled(false);
    }

    Xrm.Page.getAttribute("dyna_guidefuldenavn").setSubmitMode("always");
}


Dyna.ServiceActivity.SetGuiderFromContact = function () {
    var guide = Xrm.Page.getAttribute("dyna_guideid").getValue();

    if (guide != null) {
        Xrm.Page.getAttribute("dyna_guidefuldenavn").setValue(guide[0].name);

    }
    else {
        Xrm.Page.getAttribute("dyna_guidefuldenavn").setValue(null);
    }

    Xrm.Page.getAttribute("dyna_guidefuldenavn").setSubmitMode("always");
}

Dyna.ServiceActivity.SetTitle = function () {
    var arrangement = Xrm.Page.getAttribute("dyna_arrangementstypeid");
    var customer = Xrm.Page.getAttribute("dyna_accountid");
    var subject = Xrm.Page.getAttribute("subject");

    if (customer.getValue() != null && arrangement.getValue() != null) {

        Xrm.Page.getAttribute("subject").setValue(arrangement.getValue()[0].name + " - " + customer.getValue()[0].name);
    }
    else {
        Xrm.Page.getAttribute("subject").setValue(null);
    }

    Xrm.Page.getAttribute("subject").setSubmitMode("always");
}

Dyna.ServiceActivity.SetAmountOfTicket = function () {
    var deltager = Xrm.Page.getAttribute("dyna_antaldeltager");
    var billetter = Xrm.Page.getAttribute("dyna_antalbilletter");
    var ankommet = Xrm.Page.getAttribute("dyna_antalankommet");

    billetter.setValue(deltager.getValue());
    ankommet.setValue(deltager.getValue());
}

Dyna.ServiceActivity.SetAmountOfStudent = function () {
    var student = Xrm.Page.getAttribute("dyna_amountofstudents");
    var ankommet = Xrm.Page.getAttribute("dyna_antalankommet");

    ankommet.setValue(student.getValue());
}

Dyna.ServiceActivity.ChangeAmountOfTicket = function () {
    var billetter = Xrm.Page.getAttribute("dyna_antalbilletter");
    var group = Xrm.Page.getAttribute("dyna_amountofgroup");

    if (billetter.getValue() < 20) {
        group.setValue(1);
    }
    else {
        var calc = billetter.getValue() / 20;
        var c = parseInt(calc.toFixed(1).split('.')[0]);

        if (calc > c) {
            c = c + 1
        }

        group.setValue(c);
    }
};

Dyna.ServiceActivity.SetResourcesFromUrlParam = function () {
    if (Xrm.Page.ui.getFormType() == 1) {
        var param = Xrm.Page.context.getQueryStringParameters();
        var resourcesParam = param['parameter_resources'];
        if (typeof resourcesParam != 'undefined') {
            var resourcesObj = JSON.parse(resourcesParam);
            if (resourcesObj != null) {
                Xrm.Page.getAttribute('resources').setValue(resourcesObj);
            }
        }
    }
}

Dyna.ServiceActivity.onUseDefaultChange = function () {

    var serviceIdControl = Xrm.Page.ui.controls.get("serviceid");
    if (Xrm.Page.getAttribute('dyna_usedefaultservice').getValue()) {
        serviceIdControl.setDisabled(true);
        Dyna.ServiceActivity.onResourcesChange();
    }
    else {
        serviceIdControl.setDisabled(false);
    }
};


Dyna.ServiceActivity.onResourcesChange = function () {

    var bookingType = Xrm.Page.getAttribute("dyna_bookingtype").getValue();

    //Arrangement
    if (bookingType != "378080000" || bookingType != "378080003") {

        var serviceAttr = Xrm.Page.getAttribute('serviceid');
        var resources = Xrm.Page.getAttribute('resources').getValue();

        if (resources.length == 1) {
            if (resources[0].typename == "equipment") {
                $.ajax({
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    url: Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/EquipmentSet(guid'" + resources[0].id + "')?$select=dyna_capacity,dyna_Flipover,dyna_Hoejtaler,dyna_Mikrofon,dyna_ProduktId,dyna_Projektor,dyna_Whiteboard,dyna_WIFI",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    async: true,
                    success: function (data, textStatus, xhr) {
                        var result = data.d;
                        var dyna_capacity = result.dyna_capacity;
                        var dyna_Flipover = result.dyna_Flipover;
                        var dyna_Hoejtaler = result.dyna_Hoejtaler;
                        var dyna_Mikrofon = result.dyna_Mikrofon;
                        var dyna_ProduktId = result.dyna_ProduktId;
                        var dyna_Projektor = result.dyna_Projektor;
                        var dyna_Whiteboard = result.dyna_Whiteboard;
                        var dyna_WIFI = result.dyna_WIFI;

                        Xrm.Page.getAttribute("dyna_flipover").setValue(dyna_Flipover);
                        Xrm.Page.getAttribute("dyna_hoejtaler").setValue(dyna_Hoejtaler);
                        Xrm.Page.getAttribute("dyna_mikrofon").setValue(dyna_Mikrofon);
                        Xrm.Page.getAttribute("dyna_projektor").setValue(dyna_Projektor);
                        Xrm.Page.getAttribute("dyna_whiteboard").setValue(dyna_Whiteboard);
                        Xrm.Page.getAttribute("dyna_wifi").setValue(dyna_WIFI);

                    },
                    error: function (xhr, textStatus, errorThrown) {
                        Xrm.Utility.alertDialog(textStatus + " " + errorThrown);
                    }
                });
            }
        }


    }
    // }
    //}

}

Dyna.ServiceActivity.OnChangeService = function () {

}

Dyna.ServiceActivity.SetTemaForRundvisning = function () {
    var serviceId = Xrm.Page.getAttribute("serviceid").getValue();
    var at = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();

    if (serviceId != null && (at[0].name == "Rundvisning" || at[0].name == "Skoleforløb" || at[0].name == "Oplæg")) {
        SDK.JQuery.retrieveMultipleRecords(
        "dyna_tema",
        "?$filter=dyna_ServiceId/Id eq (guid'" + serviceId[0].id + "')",
        function (results) {


            if (results.length == 1) {
                var temaId = results[0].dyna_temaId;
                var name = results[0].dyna_name;


                var temaVal = [];
                temaVal.push({});
                temaVal[0].id = temaId;
                temaVal[0].name = name;
                temaVal[0].entityType = 'dyna_tema';

                if (at[0].name != "Skoleforløb") {
                    if (Xrm.Page.getAttribute("dyna_rundvisning").getValue()) {
                        Xrm.Page.getAttribute("dyna_temaforrundvisningid").setValue(temaVal);
                    }

                    if (Xrm.Page.getAttribute("dyna_oplgsholder").getValue()) {
                        Xrm.Page.getAttribute("dyna_temaforoplaegsholder").setValue(temaVal);
                    }
                }
                else {
                    Xrm.Page.getAttribute("dyna_temaforrundvisningid").setValue(temaVal);
                }

                Dyna.ServiceActivity.SetRundvisningBeskrivelse();
            }
            else {
                alert("Der er ikke angivet en tema for serivce");
            }
        },
        function (error) {
            alert(error.message);
        },
        function () {
            //On Complete - Do Something
        });

    }
}

Dyna.ServiceActivity.Rundvisning = function () {
    var moedested = Xrm.Page.getAttribute("dyna_moedested");
    var rundvsining = Xrm.Page.getAttribute("dyna_rundvisning").getValue();
    var oplaegsholder = Xrm.Page.getAttribute("dyna_oplgsholder").getValue();

    Xrm.Page.getControl("dyna_rundvisningsbeskrivelse").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_temaforrundvisningid").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_antalguider").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_tilmeldteguide").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_guidefuldenavn").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_moedested").setVisible(rundvsining);

    Xrm.Page.getAttribute("dyna_rundvisningsbeskrivelse").setSubmitMode("always");

    if (rundvsining || oplaegsholder) {
        Xrm.Page.ui.tabs.get("tab_Guide").setVisible(true);
    }
    else if (!rundvsining && !oplaegsholder) {
        Xrm.Page.ui.tabs.get("tab_Guide").setVisible(false);
    }

    var requireField = rundvsining ? "required" : "none";

    Xrm.Page.getAttribute("dyna_temaforrundvisningid").setRequiredLevel(requireField);
    Xrm.Page.getAttribute("dyna_antalguider").setRequiredLevel(requireField);

    if (rundvsining) {

        if (moedested.getValue() == null) {
            moedested.setValue("Billetsalg");
        }
    }
    else {
        Xrm.Page.getAttribute("dyna_temaforrundvisningid").setValue(null);
        Xrm.Page.getAttribute("dyna_antalguider").setValue(null);
        moedested.setValue(null);
    }
}

Dyna.ServiceActivity.OnLoadRundvisning = function () {
    var at = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();
    if (at != null) {
        if (at[0].name == "Rundvisning" || at[0].name == "Rundvisning - Ramme") {
            Xrm.Page.ui.tabs.get("service").sections.get("service_section_AVUdstyr").setVisible(false);
        }
    }

    var moedested = Xrm.Page.getAttribute("dyna_moedested");
    var rundvsining = Xrm.Page.getAttribute("dyna_rundvisning").getValue();
    var oplaegsholder = Xrm.Page.getAttribute("dyna_oplgsholder").getValue();

    Xrm.Page.getControl("dyna_rundvisningsbeskrivelse").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_temaforrundvisningid").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_antalguider").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_tilmeldteguide").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_guidefuldenavn").setVisible(rundvsining);
    Xrm.Page.getControl("dyna_moedested").setVisible(rundvsining);

    Xrm.Page.getAttribute("dyna_rundvisningsbeskrivelse").setSubmitMode("always");

    if (rundvsining || oplaegsholder) {
        Xrm.Page.ui.tabs.get("tab_Guide").setVisible(true);
    }
    else if (!rundvsining && !oplaegsholder) {
        Xrm.Page.ui.tabs.get("tab_Guide").setVisible(false);
    }

    var requireField = rundvsining ? "required" : "none";

    Xrm.Page.getAttribute("dyna_temaforrundvisningid").setRequiredLevel(requireField);
    Xrm.Page.getAttribute("dyna_antalguider").setRequiredLevel(requireField);
}

Dyna.ServiceActivity.Oplaegsholder = function () {
    var oplaegsholder = Xrm.Page.getAttribute("dyna_oplgsholder").getValue();
    var rundvsining = Xrm.Page.getAttribute("dyna_rundvisning").getValue();

    Xrm.Page.getControl("dyna_oplgsholderbeskrivelse").setVisible(oplaegsholder);
    Xrm.Page.getControl("dyna_temaforoplaegsholder").setVisible(oplaegsholder);
    Xrm.Page.getControl("dyna_oplaegsholderfuldenavne").setVisible(oplaegsholder);
    Xrm.Page.getControl("dyna_antaloplaegsholder").setVisible(oplaegsholder);
    Xrm.Page.getControl("dyna_tilmedlteoplaegsholder").setVisible(oplaegsholder);

    //Xrm.Page.getControl("dyna_guidefuldenavn").setVisible(rundvsining);
    if (rundvsining || oplaegsholder) {
        Xrm.Page.ui.tabs.get("tab_Guide").setVisible(true);
    }
    else if (!rundvsining && !oplaegsholder) {
        Xrm.Page.ui.tabs.get("tab_Guide").setVisible(false);
    }

    var requireField = oplaegsholder ? "required" : "none";

    Xrm.Page.getAttribute("dyna_temaforoplaegsholder").setRequiredLevel(requireField);
    Xrm.Page.getAttribute("dyna_antaloplaegsholder").setRequiredLevel(requireField);

    if (!oplaegsholder) {
        Xrm.Page.getAttribute("dyna_temaforoplaegsholder").setValue(null);
        Xrm.Page.getAttribute("dyna_antaloplaegsholder").setValue(null);
    }
}

Dyna.ServiceActivity.OnLoadOplaegsholder = function () {
    var oplaegsholder = Xrm.Page.getAttribute("dyna_oplgsholder").getValue();
    var rundvsining = Xrm.Page.getAttribute("dyna_rundvisning").getValue();

    Xrm.Page.getControl("dyna_oplgsholderbeskrivelse").setVisible(oplaegsholder);
    Xrm.Page.getControl("dyna_temaforoplaegsholder").setVisible(oplaegsholder);
    Xrm.Page.getControl("dyna_oplaegsholderfuldenavne").setVisible(oplaegsholder);
    Xrm.Page.getControl("dyna_antaloplaegsholder").setVisible(oplaegsholder);
    Xrm.Page.getControl("dyna_tilmedlteoplaegsholder").setVisible(oplaegsholder);

    //Xrm.Page.getControl("dyna_guidefuldenavn").setVisible(rundvsining);
    if (rundvsining || oplaegsholder) {
        Xrm.Page.ui.tabs.get("tab_Guide").setVisible(true);
    }
    else if (!rundvsining && !oplaegsholder) {
        Xrm.Page.ui.tabs.get("tab_Guide").setVisible(false);
    }

    var requireField = oplaegsholder ? "required" : "none";

    Xrm.Page.getAttribute("dyna_temaforoplaegsholder").setRequiredLevel(requireField);
    Xrm.Page.getAttribute("dyna_antaloplaegsholder").setRequiredLevel(requireField);
}

Dyna.ServiceActivity.SendEmail = function () {
    var DialogOption = new Xrm.DialogOptions;
    DialogOption.width = 900;
    DialogOption.height = 850;

    var params = "BookingId=" + Xrm.Page.data.entity.getId();
    var bookingConfirmationUrl = "/WebResources/dyna_BookingConfirmation";
    var bookingType = Xrm.Page.getAttribute("dyna_bookingtype").getValue();
    var arrangementType = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();

    if (arrangementType[0].name != "Rundvisning" && arrangementType[0].name != "Rundvisning - Ramme") {
        if (bookingType == Dyna.DataTypes.bookingTypeOptionSet.Undervisning.value) {
            bookingConfirmationUrl = "/WebResources/dyna_EducationBookingConfirmation";
        }
        else if (bookingType == Dyna.DataTypes.bookingTypeOptionSet.Gaestevaerelse.value) {
            bookingConfirmationUrl = "/WebResources/dyna_HotelBookingConfirmation";
        }
    }
    else {
        if (arrangementType[0].name == "Rundvisning" || arrangementType[0].name == "Rundvisning - Ramme") {
            bookingConfirmationUrl = "/WebResources/dyna_RundvisningConfirmation";
        }
        else {
            bookingConfirmationUrl = "/WebResources/dyna_BookingConfirmation";
        }
    }

    Xrm.Internal.openDialog(bookingConfirmationUrl + "?Data=" + encodeURIComponent(params),
                             DialogOption,
                             null, null,
                             Dyna.ServiceActivity.SendEmailCallbackFunction);

}

Dyna.ServiceActivity.SendEmailCallbackFunction = function (data) {

    //var id = Xrm.Page.data.entity.getId();
    //var entityname = Xrm.Page.data.entity.getEntityName();
    //Xrm.Utility.openEntityForm(entityname, id);
}

Dyna.ServiceActivity.SendEmailToGuider = function () {

    var DialogOption = new Xrm.DialogOptions;
    DialogOption.width = 700;
    DialogOption.height = 740;
    var params = "";

    var bookingType = Xrm.Page.getAttribute("dyna_bookingtype").getValue();


    if (Xrm.Page.getAttribute("dyna_temaforrundvisningid").getValue() != null) {
        params = "BookingId=" + Xrm.Page.data.entity.getId() + "&Guides=" + Xrm.Page.getAttribute("dyna_guidefuldenavn").getValue() + "&type=guide&tema=" + Xrm.Page.getAttribute("dyna_temaforrundvisningid").getValue()[0].id;

        var bookingConfirmationUrl = "/WebResources/dyna_GuideEmailForm";

        Xrm.Internal.openDialog(bookingConfirmationUrl + "?Data=" + encodeURIComponent(params),
                                 DialogOption,
                                 null, null,
                                 Dyna.ServiceActivity.SendEmailToGuiderCallbackFunction);
    }
    else {
        alert("Du mangler at angive en tema for rundvisning")
    }

}

Dyna.ServiceActivity.SendMessageToGuider = function () {

    var DialogOption = new Xrm.DialogOptions;
    DialogOption.width = 850;
    DialogOption.height = 800;
    var params = "";

    params = "BookingId=" + Xrm.Page.data.entity.getId();

    var bookingConfirmationUrl = "/WebResources/dyna_SendMessageToGuider";

    Xrm.Internal.openDialog(bookingConfirmationUrl + "?Data=" + encodeURIComponent(params),
                             DialogOption,
                             null, null,
                             Dyna.ServiceActivity.SendEmailToGuiderCallbackFunction);

}

Dyna.ServiceActivity.SendEmailToOplaegsholder = function () {

    var DialogOption = new Xrm.DialogOptions;
    DialogOption.width = 700;
    DialogOption.height = 740;



    var params = "BookingId=" + Xrm.Page.data.entity.getId() + "&Oplaegsholder=" + Xrm.Page.getAttribute("dyna_oplaegsholderfuldenavne").getValue() + "&type=oplaeg&tema=" + Xrm.Page.getAttribute("dyna_temaforoplaegsholder").getValue()[0].id;
    var bookingConfirmationUrl = "/WebResources/dyna_GuideEmailForm";

    Xrm.Internal.openDialog(bookingConfirmationUrl + "?Data=" + encodeURIComponent(params),
                             DialogOption,
                             null, null,
                             Dyna.ServiceActivity.SendEmailToGuiderCallbackFunction);

}

Dyna.ServiceActivity.SendEmailToGuiderCallbackFunction = function (data) {

    //var id = Xrm.Page.data.entity.getId();
    //var entityname = Xrm.Page.data.entity.getEntityName();
    //Xrm.Utility.openEntityForm(entityname, id);
}


Dyna.ServiceActivity.OnLoadChangeArrangementType = function () {
    var at = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();
    var scheduledstart = Xrm.Page.getAttribute("scheduledstart").getValue();
    var scheduledend = Xrm.Page.getAttribute("scheduledend").getValue();
    var actualstart = Xrm.Page.getAttribute("actualstart");
    var actualend = Xrm.Page.getAttribute("actualend");
    var actualstartCon = Xrm.Page.getControl("actualstart");
    var actualendCon = Xrm.Page.getControl("actualend");
    var sammeTid = Xrm.Page.getControl("dyna_sammetid");

    if (at != null) {
        if (at[0].name == "Rundvisning" || at[0].name == "Rundvisning - Ramme") {
            Xrm.Page.ui.tabs.get("service").sections.get("service_section_AVUdstyr").setVisible(false);
        }
    }

    if (at != null) {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/dyna_arrangementstypeSet(guid'" + at[0].id + "')?$select=dyna_Mulighedfortilvalg,dyna_Mulighedforoplgsholder,dyna_ServiceId,dyna_AnvendForRundvisning",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            async: true,
            success: function (data, textStatus, xhr) {
                var result = data.d;
                var dyna_Mulighedfortilvalg = result.dyna_Mulighedfortilvalg;
                var dyna_ServiceId = result.dyna_ServiceId;
                var dyna_AnvendForRundvisning = result.dyna_AnvendForRundvisning;
                var dyna_Mulighedforoplgsholder = result.dyna_Mulighedforoplgsholder;

                var visRundAndOplaegs = dyna_AnvendForRundvisning || dyna_Mulighedforoplgsholder ? true : false;

                //Xrm.Page.getAttribute("dyna_rundvisning").setValue(visRundAndOplaegs);
                Xrm.Page.ui.tabs.get("tab_rundvisning").setVisible(visRundAndOplaegs);

                //if (Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.value == Xrm.Page.getAttribute("dyna_bookingtype").getValue()) {

                if (Xrm.Page.ui.getFormType() != 1 && Dyna.DataTypes.bookingTypeOptionSet.Arrangement.value == Xrm.Page.getAttribute("dyna_bookingtype").getValue()) {

                    if (Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger") != null) {
                        Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger").setVisible(dyna_Mulighedfortilvalg);
                    }

                    if (Xrm.Page.getAttribute("dyna_harrelateretbookinger") != null) {
                        //Xrm.Page.getAttribute("dyna_harrelateretbookinger").setValue(dyna_Mulighedfortilvalg);
                        //Xrm.Page.getAttribute("dyna_harrelateretbookinger").setSubmitMode("always");
                    }
                }


                if (dyna_AnvendForRundvisning) {
                    actualstart.setRequiredLevel("none");
                    actualend.setRequiredLevel("none");
                    actualstartCon.setVisible(false);
                    actualendCon.setVisible(false);
                    sammeTid.setVisible(false);
                }
                else {
                    actualstartCon.setVisible(true);
                    actualendCon.setVisible(true);
                    sammeTid.setVisible(true);
                }

                Xrm.Page.ui.tabs.get("tab_rundvisning").sections.get("section_rundvisning").setVisible(dyna_AnvendForRundvisning);
                Xrm.Page.ui.tabs.get("tab_rundvisning").sections.get("section_oplaegsholder").setVisible(dyna_Mulighedforoplgsholder);
                //Xrm.Page.getAttribute("dyna_oplgsholder").setValue(dyna_Mulighedforoplgsholder);
                //Xrm.Page.getAttribute("dyna_rundvisning").setValue(dyna_AnvendForRundvisning);

                //Dyna.ServiceActivity.Rundvisning();
                //Dyna.ServiceActivity.Oplaegsholder();

                if (Xrm.Page.getAttribute("dyna_arrangementstypeid").getIsDirty()) {
                    if (dyna_ServiceId.Id != null) {

                        //Xrm.Page.getAttribute("dyna_usedefaultservice").setValue(false);

                        var serVal = [];
                        serVal.push({});
                        serVal[0].id = dyna_ServiceId.Id;
                        serVal[0].name = dyna_ServiceId.Name;
                        serVal[0].entityType = 'service';
                        Xrm.Page.getAttribute("serviceid").setValue(serVal);
                        Xrm.Page.getAttribute("resources").setValue(null);

                        //Xrm.Page.getAttribute("resources").setValue(null);
                    }
                    else if (dyna_ServiceId.Id == null && Xrm.Page.ui.getFormType() == 1) {
                        //Xrm.Page.getAttribute("dyna_usedefaultservice").setValue(false);                    
                        //Xrm.Page.getAttribute("resources").setValue(null);
                        Xrm.Page.getAttribute("serviceid").setValue(null);
                        Xrm.Page.getAttribute("resources").setValue(null);
                    }
                }

                //}

            },
            error: function (xhr, textStatus, errorThrown) {
                Xrm.Utility.alertDialog(textStatus + " " + errorThrown);
            }
        });
    }

}


Dyna.ServiceActivity.OnChangeArrangementType = function () {
    var at = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();
    var scheduledstart = Xrm.Page.getAttribute("scheduledstart").getValue();
    var scheduledend = Xrm.Page.getAttribute("scheduledend").getValue();
    var actualstart = Xrm.Page.getAttribute("actualstart");
    var actualend = Xrm.Page.getAttribute("actualend");
    var actualstartCon = Xrm.Page.getControl("actualstart");
    var actualendCon = Xrm.Page.getControl("actualend");
    var sammeTid = Xrm.Page.getControl("dyna_sammetid");

    if (at != null) {
        if (at[0].name == "Rundvisning" || at[0].name == "Rundvisning - Ramme") {
            Xrm.Page.ui.tabs.get("service").sections.get("service_section_AVUdstyr").setVisible(false);
        }
    }

    if (at != null) {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/dyna_arrangementstypeSet(guid'" + at[0].id + "')?$select=dyna_Mulighedfortilvalg,dyna_Mulighedforoplgsholder,dyna_ServiceId,dyna_AnvendForRundvisning",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            async: true,
            success: function (data, textStatus, xhr) {
                var result = data.d;
                var dyna_Mulighedfortilvalg = result.dyna_Mulighedfortilvalg;
                var dyna_ServiceId = result.dyna_ServiceId;
                var dyna_AnvendForRundvisning = result.dyna_AnvendForRundvisning;
                var dyna_Mulighedforoplgsholder = result.dyna_Mulighedforoplgsholder;

                var visRundAndOplaegs = dyna_AnvendForRundvisning || dyna_Mulighedforoplgsholder ? true : false;

                Xrm.Page.getAttribute("dyna_rundvisning").setValue(visRundAndOplaegs);
                Xrm.Page.ui.tabs.get("tab_rundvisning").setVisible(visRundAndOplaegs);

                //if (Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.value == Xrm.Page.getAttribute("dyna_bookingtype").getValue()) {

                if (Xrm.Page.ui.getFormType() != 1 && Dyna.DataTypes.bookingTypeOptionSet.Arrangement.value == Xrm.Page.getAttribute("dyna_bookingtype").getValue()) {

                    if (Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger") != null) {
                        Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger").setVisible(dyna_Mulighedfortilvalg);
                    }

                    if (Xrm.Page.getAttribute("dyna_harrelateretbookinger") != null) {
                        Xrm.Page.getAttribute("dyna_harrelateretbookinger").setValue(dyna_Mulighedfortilvalg);
                        Xrm.Page.getAttribute("dyna_harrelateretbookinger").setSubmitMode("always");
                    }
                }


                if (dyna_AnvendForRundvisning) {
                    actualstart.setRequiredLevel("none");
                    actualend.setRequiredLevel("none");
                    actualstartCon.setVisible(false);
                    actualendCon.setVisible(false);
                    sammeTid.setVisible(false);
                }
                else {
                    actualstartCon.setVisible(true);
                    actualendCon.setVisible(true);
                    sammeTid.setVisible(true);
                }

                Xrm.Page.ui.tabs.get("tab_rundvisning").sections.get("section_rundvisning").setVisible(dyna_AnvendForRundvisning);
                Xrm.Page.ui.tabs.get("tab_rundvisning").sections.get("section_oplaegsholder").setVisible(dyna_Mulighedforoplgsholder);
                Xrm.Page.getAttribute("dyna_oplgsholder").setValue(dyna_Mulighedforoplgsholder);
                Xrm.Page.getAttribute("dyna_rundvisning").setValue(dyna_AnvendForRundvisning);

                Dyna.ServiceActivity.Rundvisning();
                Dyna.ServiceActivity.Oplaegsholder();

                if (Xrm.Page.getAttribute("dyna_arrangementstypeid").getIsDirty()) {
                    if (dyna_ServiceId.Id != null) {

                        //Xrm.Page.getAttribute("dyna_usedefaultservice").setValue(false);

                        var serVal = [];
                        serVal.push({});
                        serVal[0].id = dyna_ServiceId.Id;
                        serVal[0].name = dyna_ServiceId.Name;
                        serVal[0].entityType = 'service';
                        Xrm.Page.getAttribute("serviceid").setValue(serVal);
                        Xrm.Page.getAttribute("resources").setValue(null);

                        //Xrm.Page.getAttribute("resources").setValue(null);
                    }
                    else if (dyna_ServiceId.Id == null && Xrm.Page.ui.getFormType() == 1) {
                        //Xrm.Page.getAttribute("dyna_usedefaultservice").setValue(false);                    
                        //Xrm.Page.getAttribute("resources").setValue(null);
                        Xrm.Page.getAttribute("serviceid").setValue(null);
                        Xrm.Page.getAttribute("resources").setValue(null);
                    }
                }

                //}

            },
            error: function (xhr, textStatus, errorThrown) {
                Xrm.Utility.alertDialog(textStatus + " " + errorThrown);
            }
        });
    }

}

Dyna.ServiceActivity.ArrangementType = function () {

    var at = Xrm.Page.getAttribute("dyna_arrangementstypeid").getValue();
    var scheduledstart = Xrm.Page.getAttribute("scheduledstart").getValue();
    var scheduledend = Xrm.Page.getAttribute("scheduledend").getValue();
    var actualstart = Xrm.Page.getAttribute("actualstart");
    var actualend = Xrm.Page.getAttribute("actualend");
    var actualstartCon = Xrm.Page.getControl("actualstart");
    var actualendCon = Xrm.Page.getControl("actualend");
    var sammeTid = Xrm.Page.getControl("dyna_sammetid");

    if (at != null) {
        if (at[0].name == "Rundvisning") {

            if (Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.value != Xrm.Page.getAttribute("dyna_bookingtype").getValue()) {
                actualstart.setRequiredLevel("none");
                actualend.setRequiredLevel("none");
                actualstartCon.setVisible(false);
                actualendCon.setVisible(false);
                sammeTid.setVisible(false);
            }
            //Dyna.ServiceActivity.onUseDefaultChange();

            if (Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.value != Xrm.Page.getAttribute("dyna_bookingtype").getValue() && !Xrm.Page.getAttribute("dyna_harrelateretbookinger").getValue()) {
                Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger").setVisible(false);
            }

            //Xrm.Page.ui.tabs.get("tab_rundvisning").setVisible(true);
            Xrm.Page.getAttribute("dyna_rundvisning").setValue(true);
            //Dyna.ServiceActivity.Rundvisning();

        }
        else {

            if (Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.value != Xrm.Page.getAttribute("dyna_bookingtype").getValue()) {
                actualstartCon.setVisible(true);
                actualendCon.setVisible(true);
                sammeTid.setVisible(true);
                actualstart.setRequiredLevel("required");
                actualend.setRequiredLevel("required");
            }
            Xrm.Page.getAttribute("dyna_rundvisning").setValue(false);
            Xrm.Page.ui.tabs.get("tab_rundvisning").setVisible(false);
            if (Dyna.DataTypes.bookingTypeOptionSet.SubArrangement.value != Xrm.Page.getAttribute("dyna_bookingtype").getValue() && Xrm.Page.getAttribute("dyna_harrelateretbookinger").getValue()) {
                Xrm.Page.ui.tabs.get("tab_13_RelateretBookinger").setVisible(true);
            }
        }
    }

}


Dyna.ServiceActivity.CreateForplejning = function () {

    var params = {};
    //params["_CreateFromId"] = Xrm.Page.data.entity.getId().substring(1, 37);
    //params["_CreateFromType"] = 4214;
    //params["etc"] = 10017;

    //newWindow = Xrm.Utility.openEntityForm("dyna_catering", null, params);

    var origin = window.location.origin;
    var path = "/main.aspx";
    //var search = "?etn=dyna_catering&extraqs=%3f_CreateFromType=4214&_CreateFromId=" + Xrm.Page.data.entity.getId().substring(1, 37) + "&10006&histKey=934340138&newWindow=true&pagetype=entityrecord";
    var search = "?etn=dyna_catering&extraqs=%3f_CreateFromId%3d%257b" + Xrm.Page.data.entity.getId().substring(1, 37) + "%257d%26_CreateFromType%3d4214%26etc%3d10006&histKey=934340138&newWindow=true&pagetype=entityrecord#888606809";
    var url = origin + path + search;
    //"?etn=dyna_catering&extraqs=%3f_CreateFromId%3d%257b6A93C619-773C-E711-80E2-0050568839E3%257d%26_CreateFromType%3d4214%26etc%3d10006&histKey=934340138&newWindow=true&pagetype=entityrecord#888606809"
    var width = 1200;
    var height = 800;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params = 'width=' + width + ', height=' + height;
    params += ', top=' + top + ', left=' + left;
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=yes';
    params += ', scrollbars=yes';
    params += ', status=yes';
    params += ', toolbar=no';
    newwin = window.open(url, 'Funktionsaktivitet', params);
}

Dyna.ServiceActivity.AccountFireOnChange = function () {

    if (Xrm.Page.getAttribute("dyna_accountid").getValue() != null && Xrm.Page.ui.getFormType() == 1) {
        Dyna.ServiceActivity.FillOutRegarding();
        Dyna.ServiceActivity.SetTitle();
        Dyna.ServiceActivity.setSponsor();
        Dyna.ServiceActivity.CalculateTotalDiscount();
    }

    if (Xrm.Page.getAttribute("dyna_sponsornoter").getValue() != null) {
        Xrm.Page.ui.tabs.get("tab_11_kunde").sections.get("tab_11_section_3_sponsornoter").setVisible(true);
    }
}

Dyna.ServiceActivity.AccountFireOnChangeForEdu = function () {

    if (Xrm.Page.getAttribute("dyna_accountid").getValue() != null && Xrm.Page.ui.getFormType() == 1) {
        Dyna.ServiceActivity.FillOutRegarding();
        Dyna.ServiceActivity.SetTitle();
    }
}

Dyna.ServiceActivity.AccountFireOnChangeForSubBooking = function () {

    if (Xrm.Page.getAttribute("dyna_accountid").getValue() != null && Xrm.Page.ui.getFormType() == 1) {
        Dyna.ServiceActivity.SetTitle();
    }
}

Dyna.ServiceActivity.SetRundvisningBeskrivelse = function () {

    var temaId = Xrm.Page.getAttribute("dyna_temaforrundvisningid").getValue();

    if (temaId != null) {
        SDK.JQuery.retrieveRecord(
            temaId[0].id,
            "dyna_tema",
            "dyna_Beskrivelse,dyna_temaId",
            null,
            function (result) {
                var dyna_Beskrivelse = result.dyna_Beskrivelse;
                var dyna_temaId = result.dyna_temaId;

                Xrm.Page.getAttribute("dyna_rundvisningsbeskrivelse").setValue(dyna_Beskrivelse);
                Xrm.Page.getAttribute("dyna_rundvisningsbeskrivelse").setSubmitMode("always");

            },
            function (error) {
                alert(error.message);
            }
        );
    }
}

Dyna.ServiceActivity.SetOplaegsholderBeskrivelse = function () {

    var temaId = Xrm.Page.getAttribute("dyna_temaforoplaegsholder").getValue();

    if (temaId != null) {
        SDK.JQuery.retrieveRecord(
            temaId[0].id,
            "dyna_tema",
            "dyna_Beskrivelse,dyna_temaId",
            null,
            function (result) {
                var dyna_Beskrivelse = result.dyna_Beskrivelse;
                var dyna_temaId = result.dyna_temaId;

                Xrm.Page.getAttribute("dyna_oplgsholderbeskrivelse").setValue(dyna_Beskrivelse);
                Xrm.Page.getAttribute("dyna_oplgsholderbeskrivelse").setSubmitMode("always");
            },
            function (error) {
                alert(error.message);
            }
        );
    }
}

var noteCount = 0;
var addedFormHeader = false;
Dyna.ServiceActivity.ShowNotifications = function (message, level, uniqueId, buttons, durationSeconds) {
    noteCount = 1 + noteCount;

    /*if (level == "INFO") {
        Xrm.Page.ui.setFormNotification(message, "INFORMATION", uniqueId);
    }
    else if (level == "WARNING") {
        Xrm.Page.ui.setFormNotification(message, "WARNING", uniqueId);
    }
    else if (level == "ERROR") {
        Xrm.Page.ui.setFormNotification(message, "ERROR", uniqueId);
    }
    else {
        Xrm.Page.ui.setFormNotification(message, "WARNING", uniqueId);
    }*/

    /*
    ERROR: notify_error.png Notification will display an error icon.
    WARNING: notify_warning.png Notification will display a warning icon.
    INFO: notify_info.png Notification will display an info icon.
    SUCCESS: notify_success.png Notification will display a green tick (success) icon.
    QUESTION: notify_question.png Notification will display a question mark icon.
    LOADING: notify_load.gif Notification will display a CRM loading spinner.
    */

    Notify.add(message, level, uniqueId, buttons, durationSeconds);
    if (!addedFormHeader) {
        noteCount = noteCount + $("#formHeaderContainer #crmNotifications div.Notification").length;
        addedFormHeader = true;
    }


    noteCount = noteCount == 1 ? 2 : noteCount;

    //$("#tdAreas")[0].style.top = "10px"; //1 * noteCount + "px"; //"160px";
    $("#formHeaderContainer")[0].style.height = ""; //65 * noteCount + "px";
}