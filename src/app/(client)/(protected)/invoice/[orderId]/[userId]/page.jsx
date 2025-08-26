import { Breadcrumb, InvoicePdf } from "@/components";
import InvoiceGenerator from "./InvoiceGenerator";

export const metadata = {
  title: "Checkout",
};

const Invoice = async ({ params }) => {
  console.log("9 params.adminDishId, params.userId", params.orderId, params.userId);
  return (
    <>
      <Breadcrumb title="Invoice" subtitle="Order" />
      <section className="py-6 lg:py-10">
        <div className="container">
          <InvoiceGenerator />
        </div>
      </section>
      {/* <InvoicePdf /> */}
    </>
  );
};

export default Invoice;
