using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Xrm.Sdk;
using System.Configuration;
using Microsoft.Xrm.Client;
using Microsoft.Xrm.Client.Services;
using KUBE.Booking.Core.Entities;

namespace KUBE.Booking.WorkflowUnitTestProject.Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            IOrganizationService crmService = GetCRMService();
            Xrm xrm = new Xrm(crmService);

            var resId = Guid.Parse("9348BED5-4ABA-E711-80E9-3863BB343DC8");

            var res = xrm.BookableResourceBookingSet.FirstOrDefault(b => b.BookableResourceBookingId.Value == resId);
            var booking = xrm.dyna_bookingSet.FirstOrDefault(b => b.ActivityId.Value == res.new_dyna_booking.Id);

            if (res != null)
            {
                var eq = xrm.BookableResourceSet.FirstOrDefault(f => f.BookableResourceId.Value == res.Resource.Id);

                if (eq.dyna_ProductId != null)
                {
                    var pro = xrm.ProductSet.FirstOrDefault(p => p.ProductId.Value == eq.dyna_ProductId.Id);

                    double antal = 1;

                    if (booking.dyna_bookingtype.Value == 378080003)
                    {
                        antal = 1; //Math.Round(double.Parse((booking.ScheduledDurationMinutes.Value / 60 / 24).ToString("F2")), MidpointRounding.AwayFromZero);
                    }

                    dyna_bookingproductline bpl = new dyna_bookingproductline();
                    bpl.dyna_AccommodationTypeId = eq.dyna_AccommodationTypeId;
                    bpl.dyna_count = int.Parse(antal.ToString());
                    // bpl.dyna_LokaleType = new OptionSetValue(378080000);
                    bpl.dyna_price = pro.Price;
                    bpl.dyna_useprice = pro.Price;
                    bpl.dyna_productid = pro.ToEntityReference();
                    bpl.dyna_name = pro.Name;
                    bpl.dyna_bookingid = booking.dyna_Booking_Id != null ? booking.dyna_Booking_Id : booking.ToEntityReference();
                    crmService.Create(bpl);
                }
            }
        }

        public static IOrganizationService GetCRMService()
        {
            var connection = CrmConnection.Parse(ConfigurationManager.ConnectionStrings["Xrm"].ToString());
            ////connection.ClientCredentials = (NetworkCredential)CredentialCache.DefaultCredentials;
            var service = new OrganizationService(connection);
            return service;
        }
    }
}
