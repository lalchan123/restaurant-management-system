import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { BreadcrumbAdmin, OrderDataTable } from "@/components";
import { orderRows } from "@/app/admin/(order)/orders/page";
import { getAPIPostDataByRefId, getSellerById } from "@/helpers";
import EditCustomerForm from "../../EditCustomerForm";
const PersonDetailsCard = dynamic(
  () => import("@/components/cards/PersonDetailsCard")
);


// export const generateMetadata = async ({ params }) => {
export const generateMetadata = async ({ table_id, params, user_id}) => {
  // const seller = await getSellerById(Number(params.customerId)).then(
  //   (seller) => seller
  // );
  // return { title: seller?.name ?? undefined };
  // await getAPIPostDataByRefId(Number(params.customerId)).then(
  //   (seller) => seller
  // );
  // console.log("table_id params user_id", table_id, params.customerId, user_id)
  // const data = await getAPIPostDataByRefId(39, params.customerId, "1")
  // console.log("22 data", data)
  // return data;
};

const EditCustomer = async ({ params }) => {
  console.log("22 params, params.customerId, params.userId", params.customerId, params.userId)
  const customerData = await getAPIPostDataByRefId(39, params.customerId, params.userId);
  console.log("28 customerData", customerData)
  if (!customerData) notFound();

  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin
          title="Edit Customer"
          subtitle="Customers"
          link="/admin/customers"
        />
        <EditCustomerForm customerData={customerData} />
      </div>
    </div>
  );
};

export default EditCustomer;
