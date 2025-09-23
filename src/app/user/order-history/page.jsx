import Link from "next/link";
import Image from "next/image";
import { LuChevronRight } from "react-icons/lu";
import { cn, toAlphaNumber } from "@/utils";
import {
  BestSellingProductCard,
  BreadcrumbAdmin,
  OrderDataTable,
} from "@/components";
// import { orderRows } from "../(order)/orders/page";
import {
  analyticsOverviewData,
  categoriesData,
  dishesData,
} from "@/assets/data";
import OrderHistoryPage from "./OrderHistoryPage";
// import RecentOrderPage from "./RecentOrderPage";
// import AutoLogout from "@/ApiCallMethod/AutoLogout";

export const metadata = {
  title: "OrderHistory",
};

const OrderHistory = () => {

  // AutoLogout();

  // const columns = [
  //   {
  //     key: "id",
  //     name: "Order ID",
  //   },
  //   {
  //     key: "dish_id",
  //     name: "Dish",
  //   },
  //   {
  //     key: "amount",
  //     name: "Total",
  //   },
  // ];

  return (
    <div className="w-full lg:ps-64 bg-green-600/5">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Orders history" subtitle="User" />
        <div className="grid grid-cols-1 gap-6 2xl:grid-cols-1">
          <OrderHistoryPage />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
