using System;
using System.Activities;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.Xrm.Sdk.Workflow;
using Microsoft.Xrm.Sdk.Query;
using KUBE.Booking.WorkflowProject.Entities;

namespace KUBE.Booking.WorkflowProject
{

    public sealed class AddRelatedOrderProduct : CodeActivity
    {

        /// <summary>
        /// Sets the start date.
        /// </summary>
        /// <value>
        /// The start date.
        /// </value>
        [Input("Order")]
        [ReferenceTarget("salesorder")]
        public InArgument<EntityReference> RelatedOrder { get; set; }


        [Input("Total Discount")]
        [Default("0")]
        public InArgument<Money> TotalDiscount { get; set; }

        protected override void Execute(CodeActivityContext executionContext)
        {
            // Create the tracing service
            ITracingService tracingService = executionContext.GetExtension<ITracingService>();

            if (tracingService == null)
            {
                throw new InvalidPluginExecutionException("Failed to retrieve tracing service.");
            }

            tracingService.Trace("Entered AddOrderProduct.Execute(), Activity Instance Id: {0}, Workflow Instance Id: {1}",
                executionContext.ActivityInstanceId,
                executionContext.WorkflowInstanceId);

            // Create the context
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();

            if (context == null)
            {
                throw new InvalidPluginExecutionException("Failed to retrieve workflow context.");
            }

            tracingService.Trace("AddOrderProduct.Execute(), Correlation Id: {0}, Initiating User: {1}",
                context.CorrelationId,
                context.InitiatingUserId);

            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            Xrm xrm = new Xrm(service);


            tracingService.Trace("Creating Order Product...");
            SalesOrderDetail sod = new SalesOrderDetail();
            var orderRef = RelatedOrder.Get<EntityReference>(executionContext);
            var order = xrm.SalesOrderSet.First(f => f.SalesOrderId.Value == orderRef.Id);

            try
            {
                tracingService.Trace("Order: {0} - {1}", orderRef.Id, orderRef.Name);
                var productDiscount = TotalDiscount.Get<Money>(executionContext);
                tracingService.Trace("Total Discount: {0}", productDiscount.Value);
                tracingService.Trace("Service 1: {0}", service != null ? true : false);

                var booking = xrm.dyna_bookingSet.FirstOrDefault(w => w.ActivityId.Value == order.dyna_BookingId.Id);

                if (booking.dyna_bookingtype.Value == 378080001 || booking.dyna_bookingtype.Value == 378080000 || booking.dyna_bookingtype.Value == 378080002)
                {
                    var forplejning = xrm.dyna_bookingproductlineSet.Where(x => x.dyna_bookingid.Id == order.dyna_BookingId.Id).ToList();

                    foreach (var item in forplejning)
                    {
                        var sodFor = new SalesOrderDetail();
                        var proFor = (Product)service.Retrieve(Product.EntityLogicalName, item.dyna_productid.Id, new ColumnSet(true));
                        sodFor.Quantity = Convert.ToDecimal(item.dyna_count.Value.ToString());
                        sodFor.PricePerUnit = new Money(item.dyna_useprice.Value);
                        sodFor.ProductId = proFor.ToEntityReference();
                        sodFor.UoMId = proFor.DefaultUoMId;
                        sodFor.IsPriceOverridden = true;
                        sodFor.BaseAmount = new Money(item.dyna_count.Value * item.dyna_useprice.Value);
                        sodFor.SalesOrderId = new EntityReference(SalesOrder.EntityLogicalName, orderRef.Id);

                        //Dette bruges til hvis der er ændringer i prisen i forhold til produkt prisen.
                        //sodFor.ManualDiscountAmount = new Money((item.dyna_Antal.Value * proFor.Price.Value) - (item.dyna_Antal.Value * item.dyna_AnvendPris.Value));
                        sodFor.Description = item.dyna_description;
                        service.Create(sodFor);
                    }

                    var or = new SalesOrder();
                    or.SalesOrderId = order.Id;
                    or.DiscountAmount = productDiscount;
                    service.Update(or);
                }
                //else if(booking.dyna_Bookingtype.Value == 378080000) //Undervisning
                //{
                //    var pro = (Product)service.Retrieve(Product.EntityLogicalName, booking.dyna_ProductId.Id, new ColumnSet(true));
                //    var sodFor = new SalesOrderDetail();
                //    sodFor.Quantity = Convert.ToDecimal(1);
                //    sodFor.PricePerUnit = new Money(pro.Price.Value);
                //    sodFor.ProductId = pro.ToEntityReference();
                //    sodFor.UoMId = pro.DefaultUoMId;
                //    sodFor.BaseAmount = new Money(pro.Price.Value);
                //    sodFor.SalesOrderId = new EntityReference(SalesOrder.EntityLogicalName, orderRef.Id);
                    
                //    service.Create(sodFor);
                //}


                tracingService.Trace("Done.");
            }
            catch (FaultException<OrganizationServiceFault> e)
            {
                tracingService.Trace("Exception: {0} - {1}", e.ToString(), e.StackTrace);
                // Handle the exception.
                throw;
            }

            tracingService.Trace("Exiting AddOrderProduct.Execute(), Correlation Id: {0}", context.CorrelationId);
        }
    }
}