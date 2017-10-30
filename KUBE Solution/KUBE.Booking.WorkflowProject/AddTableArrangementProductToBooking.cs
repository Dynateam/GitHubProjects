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

    public sealed class AddTabelArrangementProductToBooking : CodeActivity
    {

        [Input("Bordopstilling")]
        [ReferenceTarget(dyna_tablearrangement.EntityLogicalName)]
        public InArgument<EntityReference> TableArrangement { get; set; }

        [Input("Booking")]
        [ReferenceTarget(dyna_booking.EntityLogicalName)]
        public InArgument<EntityReference> Booking { get; set; }

        [Input("Ydelses type")]
        [ReferenceTarget(dyna_accomondationtype.EntityLogicalName)]
        public InArgument<EntityReference> Accomondationtype { get; set; }

        protected override void Execute(CodeActivityContext executionContext)
        {
            // Create the tracing service
            ITracingService tracingService = executionContext.GetExtension<ITracingService>();

            if (tracingService == null)
            {
                throw new InvalidPluginExecutionException("Failed to retrieve tracing service.");
            }

            tracingService.Trace("Entered AddTabelArrangementProductToBooking.Execute(), Activity Instance Id: {0}, Workflow Instance Id: {1}",
                executionContext.ActivityInstanceId,
                executionContext.WorkflowInstanceId);

            // Create the context
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();

            if (context == null)
            {
                throw new InvalidPluginExecutionException("Failed to retrieve workflow context.");
            }

            tracingService.Trace("AddTabelArrangementProductToBooking.Execute(), Correlation Id: {0}, Initiating User: {1}",
                context.CorrelationId,
                context.InitiatingUserId);

            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            Xrm xrm = new Xrm(service);


            tracingService.Trace("Creating AddTabelArrangementProductToBooking...");

            try
            {

                var tableRef = TableArrangement.Get<EntityReference>(executionContext);
                var bookingRef = Booking.Get<EntityReference>(executionContext);
                var accomRef = Accomondationtype.Get<EntityReference>(executionContext);

                var table = xrm.dyna_tablearrangementSet.FirstOrDefault(t => t.dyna_tablearrangementId.Value == tableRef.Id);
                var booking = xrm.dyna_bookingSet.FirstOrDefault(b => b.ActivityId.Value == bookingRef.Id);

                if (!table.dyna_Default.Value)
                {                    

                    if (table.dyna_ProductId != null)
                    {
                        var pro = xrm.ProductSet.FirstOrDefault(p => p.ProductId.Value == table.dyna_ProductId.Id);

                        double antal = 1;

                        if (booking.dyna_bookingtype.Value == 378080003)
                        {
                            antal = 1; //Math.Round(double.Parse((booking.ScheduledDurationMinutes.Value / 60 / 24).ToString("F2")), MidpointRounding.AwayFromZero);
                        }

                        dyna_bookingproductline bpl = new dyna_bookingproductline();
                        bpl.dyna_AccommodationTypeId = accomRef;
                        bpl.dyna_count = int.Parse(antal.ToString());
                        // bpl.dyna_LokaleType = new OptionSetValue(378080000);
                        bpl.dyna_price = pro.Price;
                        bpl.dyna_useprice = pro.Price;
                        bpl.dyna_productid = pro.ToEntityReference();
                        bpl.dyna_name = pro.Name;
                        bpl.dyna_bookingid = booking.dyna_parentbookingid != null ? booking.dyna_parentbookingid : booking.ToEntityReference();
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

            tracingService.Trace("Exiting AddTabelArrangementProductToBooking.Execute(), Correlation Id: {0}", context.CorrelationId);
        }
    }
}