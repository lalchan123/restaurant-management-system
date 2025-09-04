
import { BreadcrumbAdmin } from "@/components";
import { getAPIPostDataByRefId } from "@/helpers";
import EditRestaurantDetails from "../../EditRestaurantDetails";

export const metadata = {
  title: "Edit Restaurant",
};

const EditRestaurant = async ({ params }) => {
  console.log("10 params, params.restaurantId, params.userId", params.restaurantId, params.userId)
  const restaurantData = await getAPIPostDataByRefId(40, params.restaurantId, params.userId);
  console.log("12 restaurantData", restaurantData?.data)
  if (!restaurantData) notFound();

  return (
    <div className="w-full lg:ps-64 bg-green-600/5">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin
          title="Edit Restaurant"
          subtitle="Restaurants"
          link="/admin/restaurants"
        />
        <EditRestaurantDetails restaurantData={restaurantData?.data} />
      </div>
    </div>
  );
};

export default EditRestaurant;
