import { notFound } from "next/navigation";
import {
  BreadcrumbAdmin,
  DishDetailsSwiper,
  ProductDetailView,
} from "@/components";
import { getAPIPostDataByRefId, getDishById } from "@/helpers";

export const generateMetadata = async ({ params }) => {
  const dish = await getDishById(Number(params.adminDishId));

  return { title: dish?.name ?? undefined };
};

const DishDetails = async ({ params }) => {
  // const dish = await getDishById(Number(params.adminDishId));
  const dishData = await getAPIPostDataByRefId(41, params.adminDishId, params.userId);
  const restuarantName = await getAPIPostDataByRefId(40, dishData?.data[0]?.Restuarant_Name, params.userId)

  console.log("28 dishData", dishData)

  if (!dishData) notFound();

  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin
          title={dishData?.data[0]?.Product_Name}
          subtitle="Dishes"
          link="/admin/dishes"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-default-200 p-6">
            <DishDetailsSwiper images={dishData?.data} />
          </div>
          <div className="rounded-lg border border-default-200 p-6">
            <ProductDetailView dish={dishData?.data} restuarantName={ restuarantName?.data } />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
