import PersonalDetailsForm from "./PersonalDetailsForm";
import BusinessDetailForm from "./BusinessDetailForm";
import BankDetailsForm from "./BankDetailsForm";
import { BreadcrumbAdmin } from "@/components";

import Restaurant from "./Restaurant";


export const metadata = {
  title: "Add Restaurant",
};

const AddRestaurant = () => {
  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6 bg-green-600/5">
        <BreadcrumbAdmin
          title="Add Restaurant"
          subtitle="Restaurants"
          link="/admin/restaurants"
        />
        <Restaurant />
      </div>
    </div>
  );
};

export default AddRestaurant;
