import { BreadcrumbAdmin, DishDataTable } from "@/components";
import { dishesData, adminDishListData } from "@/assets/data";
import ClientDishesPage from "./ClientDishesPage";

export const metadata = {
  title: "Dishes List",
};

const ProductList = () => {
  

  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Dishes List" subtitle="Dishes" />

        <div className="grid grid-cols-1">
          <ClientDishesPage />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
