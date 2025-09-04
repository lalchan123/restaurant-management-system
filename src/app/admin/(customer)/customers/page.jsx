
import { BreadcrumbAdmin, CustomerDataTable } from "@/components";
//data
import { sellersData } from "@/assets/data";
import ClientCustomersPage from "./ClientCustomersPage";

export const metadata = {
  title: "Customers List",
};

const CustomersList = () => {
  
  return (
    <div className="w-full lg:ps-64 bg-green-600/5">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Customers List" subtitle="Customers" />

        {/* <CustomerDataTable
          rows={sellersData}
          columns={columns}
          title="Customers"
          buttonText="Add a new Customer"
          buttonLink="/admin/add-customer"
        /> */}

        <ClientCustomersPage />

      </div>
    </div>
  );
};

export default CustomersList;
