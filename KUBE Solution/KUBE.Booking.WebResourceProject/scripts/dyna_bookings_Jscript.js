
function BookingOnload() {

    var hasParent = Xrm.Page.getAttribute("dyna_parentbookingid") == null ? false : (Xrm.Page.getAttribute("dyna_parentbookingid").getValue() == null ? false : true);

    if (Xrm.Page.ui.getFormType() == 1 && !hasParent) {
        ChangeForm("Booking");
        Xrm.Page.getAttribute("statecode").setValue(3);
        Xrm.Page.getAttribute("statuscode").setValue(378080000);
        HideFieldsBySchool();
    }
    else if (!hasParent) {
        ChangeForm("Booking");
        HideFieldsBySchool();
    }
    else if (hasParent) {
        ChangeForm("Subbooking");
    }

}

function LoadBillingChart() {
    $find('BookingProductsChart_paneControl').loadVisualizationOnDemand();
}

function ShowCorrectRessourceSection() {
    if (Xrm.Page.ui.getFormType != 1) {
        var hasSubs = Xrm.Page.getAttribute("dyna_hasrelatedbooking").getValue();

        if (hasSubs) {
            //Xrm.Page.ui.tabs.get("tab_Resources").sections.get("tab_2_section_Bookable_ressources").setVisible(false);
            Xrm.Page.ui.tabs.get("tab_Resources").sections.get("tab_2_section_All_Bookable_ressources").setVisible(true);
        } else {
            Xrm.Page.ui.tabs.get("tab_Resources").sections.get("tab_2_section_All_Bookable_ressources").setVisible(false);
        }
    }
    else {
        Xrm.Page.ui.tabs.get("tab_Resources").setVisible(false);
    }
}

function HideSubBookingTab() {
    if (Xrm.Page.ui.getFormType != 1) {
        var hasSubs = Xrm.Page.getAttribute("dyna_hasrelatedbooking").getValue();

        if (hasSubs) {
            Xrm.Page.ui.tabs.get("tab_subs").setVisible(true);
        }
    }
}

function ChangeForm(formName) {
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

function HideFieldsBySchool() {
    var accId = Xrm.Page.getAttribute("dyna_customerid").getValue() != null ? Xrm.Page.getAttribute("dyna_customerid").getValue()[0].id : null;
    var klasseTrin = Xrm.Page.ui.controls.get("dyna_klassetrin");
    var specialKlasse = Xrm.Page.ui.controls.get("dyna_specialklasse");

    if (accId != null) {
        SDK.JQuery.retrieveRecord(
            accId,
            'Account',
            null,
            null,
            function (acc) {
                if (acc.dyna_Skole == 0) {
                    klasseTrin.setVisible(false);
                    specialKlasse.setVisible(false);
                } else {
                    klasseTrin.setVisible(true);
                    specialKlasse.setVisible(true);
                }
            },
            function (e) {
                alert(e.meassage)
            }
        );
    }


}

function SetSubjectFieldOnChange() {
    var cust = Xrm.Page.getAttribute("dyna_customerid").getValue();
    var name = cust != null ? cust[0].name : "";

    Xrm.Page.getAttribute("subject").setValue(name);
}

function SetRegardingFieldOnChange() {
    var cust = Xrm.Page.getAttribute("dyna_customerid").getValue();

    Xrm.Page.getAttribute("regardingobjectid").setValue(cust);
}

function SetSubjectFieldOnLoad() {
    var cust = Xrm.Page.getAttribute("dyna_customerid").getValue();
    var name = cust != null ? cust[0].name : "";

    if (Xrm.Page.ui.getFormType == 1 && cust != "") {

        Xrm.Page.getAttribute("subject").setValue(name);
    }
}

function ShowBookingResponsible() {
    var acc = Xrm.Page.getAttribute("dyna_customerid").getValue();

    if (acc != null) {
        SDK.JQuery.retrieveRecord(acc[0].id, "Account", "dyna_Dagstilbud,dyna_Forening,dyna_ForeningEkstern,dyna_ForeningIntern,dyna_Skole", null, function (result) {
            var dyna_Dagstilbud = result.dyna_Dagstilbud;
            var dyna_Forening = result.dyna_Forening;
            var dyna_ForeningEkstern = result.dyna_ForeningEkstern;
            var dyna_ForeningIntern = result.dyna_ForeningIntern;
            var dyna_Skole = result.dyna_Skole;

            var requireFieldUnion = dyna_ForeningEkstern ? "required" : "none";
            var requireFieldSchool = dyna_Skole ? "required" : "none";

            //Union
            Xrm.Page.getControl("dyna_bookingresponsible").setVisible(dyna_ForeningEkstern);
            Xrm.Page.getAttribute("dyna_bookingresponsible").setRequiredLevel(requireFieldUnion);

            //School
            Xrm.Page.getControl("dyna_klassetrin").setVisible(dyna_Skole);
            Xrm.Page.getAttribute("dyna_klassetrin").setRequiredLevel(requireFieldSchool);
            Xrm.Page.getControl("dyna_specialklasse").setVisible(dyna_Skole);
            Xrm.Page.getAttribute("dyna_specialklasse").setRequiredLevel(requireFieldSchool);

        }, function (error) {
            Xrm.Utility.alertDialog(error.message);
        });
    }
}
