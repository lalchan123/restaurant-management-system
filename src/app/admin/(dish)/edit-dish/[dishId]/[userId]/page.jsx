import EditDishForm from "../../EditDishForm";
import { BreadcrumbAdmin } from "@/components";
import EditDishUploader from "../../EditDishUploader";
import { getAPIPostDataByRefId } from "@/helpers";

export const metadata = {
  title: "Edit Dish",
};

const EditProduct = async ({ params }) => {
  const dishData = await getAPIPostDataByRefId(41, params.dishId, params.userId);

  console.log("28 dishData", dishData)
  if (!dishData) notFound();

  return (
    <div className="w-full lg:ps-64 bg-green-600/5">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin
          title="Edit Dish"
          subtitle="Dishes"
          link="/admin/dishes"
        />
        <div className="grid gap-6 xl:grid-cols-3">
          <div>
            <EditDishUploader dishData={dishData.data} />
          </div>
          <EditDishForm dishData={dishData.data} />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
