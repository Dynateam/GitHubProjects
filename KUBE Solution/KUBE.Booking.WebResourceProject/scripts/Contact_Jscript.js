function ShowBookingResponsible()
{
    var acc = Xrm.Page.getAttribute("parentcustomerid").getValue();

    if (acc != null) {
        SDK.JQuery.retrieveRecord(acc[0].id, "Account", "dyna_Forening,dyna_ForeningEkstern,dyna_ForeningIntern", null, function (result) {
            var dyna_Forening = result.dyna_Forening;
            var dyna_ForeningEkstern = result.dyna_ForeningEkstern;
            var dyna_ForeningIntern = result.dyna_ForeningIntern;

            var requireField = dyna_ForeningEkstern ? "required" : "none";

            Xrm.Page.getControl("dyna_bookingansvarlig").setVisible(dyna_ForeningEkstern);
            Xrm.Page.getAttribute("dyna_bookingansvarlig").setRequiredLevel(requireField);

        }, function (error) {
            Xrm.Utility.alertDialog(error.message);
        });
    }
}
