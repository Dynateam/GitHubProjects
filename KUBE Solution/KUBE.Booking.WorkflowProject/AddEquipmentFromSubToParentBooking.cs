using System;
using System.Activities;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.Xrm.Sdk.Workflow;
using Microsoft.Xrm.Sdk.Query;
using KUBE.Booking.WorkflowProject.Entities;
using Microsoft.Xrm.Sdk.Messages;

namespace KUBE.Booking.WorkflowProjekct
{

    public sealed class AddEquipmentFromSubToParentBooking : CodeActivity
    {

        [Input("Bookable Resource")]
        [ReferenceTarget(BookableResource.EntityLogicalName)]
        public InArgument<EntityReference> BookableResourceRef { get; set; }

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
                var bookingResRef = BookableResourceRef.Get<EntityReference>(executionContext);

                var br = xrm.BookableResourceSet.FirstOrDefault(b => b.BookableResourceId.Value == bookingResRef.Id);

                EntityReferenceCollection enColl = new EntityReferenceCollection();
                var udstyr = (from ur in xrm.dyna_dyna_udstyr_bookableresourceSet
                              join u in xrm.dyna_udstyrSet on ur.dyna_udstyrid equals u.dyna_udstyrId
                              where ur.bookableresourceid.Value == bookingResRef.Id
                              select u).ToList();

                foreach (var item in udstyr)
                {
                    var be = new dyna_bookingequipment()
                    {
                        dyna_Amount = 1,
                        dyna_UseEquipmentAs = false,
                        dyna_EquipmentId = item.ToEntityReference(),
                        dyna_BookableResourceBookingId = new EntityReference(BookableResourceBooking.EntityLogicalName, context.PrimaryEntityId)
                    };

                    service.Create(be);
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