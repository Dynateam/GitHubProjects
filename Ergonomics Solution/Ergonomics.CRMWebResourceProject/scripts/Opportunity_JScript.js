function Onload()
{
    var webResArea = Xrm.Page.ui.controls.get("WebResource_OpportunityProductInlineGrid");
    webResArea.setSrc(webResArea.getSrc());
}