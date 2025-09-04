import BillingInformationForm from "./BillingInformationForm";
import { Breadcrumb } from "@/components";
import ClientOrderListPage from "./ClientOrderListPage";

export const metadata = {
  title: "Checkout",
};

const OrderList = () => {
  return (
    <>
      <Breadcrumb title="OrderList" subtitle="Order" />
      <section className="py-6 lg:py-10 bg-green-600/5">
        <div className="container">
          <ClientOrderListPage />
        </div>
      </section>
    </>
  );
};

export default OrderList;
