using System;
using System.Activities;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.Xrm.Sdk.Workflow;
using Microsoft.Xrm.Sdk.Query;
using KUBE.Booking.WorkflowProject.Entities;

namespace KUBE.Booking.WorkflowProjekct
{

    public sealed class AddYdelserBasedOnRessources : CodeActivity
    {


        protected override void Execute(CodeActivityContext executionContext)
        {
            // Create the tracing service
            ITracingService tracingService = executionContext.GetExtension<ITracingService>();

            if (tracingService == null)
            {
                throw new InvalidPluginExecutionException("Failed to retrieve tracing service.");
            }

            tracingService.Trace("Entered AddYdelserBasedOnRessources.Execute(), Activity Instance Id: {0}, Workflow Instance Id: {1}",
                executionContext.ActivityInstanceId,
                executionContext.WorkflowInstanceId);

            // Create the context
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();

            if (context == null)
            {
                throw new InvalidPluginExecutionException("Failed to retrieve workflow context.");
            }

            tracingService.Trace("AddYdelserBasedOnRessources.Execute(), Correlation Id: {0}, Initiating User: {1}",
                context.CorrelationId,
                context.InitiatingUserId);

            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            Xrm xrm = new Xrm(service);


            tracingService.Trace("Creating AddYdelserBasedOnRessources...");

            try
            {
                var bookRef = context.PrimaryEntityId;
                var booking = xrm.dyna_bookingSet.FirstOrDefault(w => w.ActivityId.Value == bookRef);
                var res = xrm.BookableResourceBookingSet.Where(b => b.new_dyna_booking.Id == bookRef).ToList();

                foreach (var item in res)
                {

                    var eq = xrm.BookableResourceSet.FirstOrDefault(f => f.BookableResourceId.Value == item.Resource.Id);

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
                        service.Create(bpl);
                    }

                }

                tracingService.Trace("Done.");
            }
            catch (FaultException<OrganizationServiceFault> e)
            {
                tracingService.Trace("Exception: {0} - {1}", e.ToString(), e.StackTrace);
                // Handle the exception.
                throw;
            }

            tracingService.Trace("Exiting AddYdelserBasedOnRessources.Execute(), Correlation Id: {0}", context.CorrelationId);
        }
    }
}