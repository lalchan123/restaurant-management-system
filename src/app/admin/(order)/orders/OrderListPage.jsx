"use client";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import {
  LuBanknote,
  LuCalendar,
  LuChevronDown,
  LuEye,
  LuWallet,
} from "react-icons/lu";
import OngoingOrderCalendar from "./OngoingOrderCalendar";
import { BreadcrumbAdmin, OrderDataTable } from "@/components";
import { getDishById, getOrderById } from "@/helpers";
import { toSentenceCase } from "@/utils";
import OrderStatistics from "./OrderStatistics";
import { orderHistoryData, dishesData, orderProgressData } from "@/assets/data";
import { currentCurrency } from "@/common";
import { useSession } from "next-auth/react";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { useEffect, useState } from "react";



const OrderListPage = async() => {
  const { data: session } = useSession();
  const [columns, setColumns] = useState([
    {
      "key": "Product_Rel_Id",
      "name": "Product_Rel_Id"
    },
    {
      "key": "user_id",
      "name": "user_id"
    },
    {
      "key": "Ck_Billing_Rel_Id",
      "name": "Ck_Billing_Rel_Id"
    },
    {
      "key": "SubTotal",
      "name": "SubTotal"
    },
    {
      "key": "Shipping",
      "name": "Shipping"
    },
    {
      "key": "Discount",
      "name": "Discount"
    },
    {
      "key": "Tax",
      "name": "Tax"
    },
    {
      "key": "Total",
      "name": "Total"
    },
    {
      "key": "Status",
      "name": "Status"
    },
    {
      "key": "Action",
      "name": "Action"
    }
  ])
  const [ordersData, setOrdersData] = useState([
    {
      "Product_Rel_Id": "",
      "table_ref_id": "",
      "table_id": 0,
      "id": 0,
      "tab_rel_id": "",
      "user_id": "",
      "Ck_Billing_Rel_Id": "",
      "SubTotal": "",
      "Shipping": "",
      "Discount": "",
      "Tax": "",
      "Total": "",
      "Status": ""
    }
  ])
     
  useEffect(() => {
    DataFetch()
  }, [])
  
  const DataFetch = async () => {
    // const ordersDataList = await getAPIPostDataByRefId(44, "", session?.user?.data[0]?.user_id);
    const payload = {
      "user_id": session?.user?.data[0]?.user_id,
      "table_id": 41,
      "table_ref_id": "20250811095153046"
    }
    const apiUrl = `${BaseURL}/account/restaurant-products-sales-api/`;
    const ordersDataList = await restAPIPost(apiUrl, payload)
    console.log("166 ordersDataList", ordersDataList)
    setColumns(ordersDataList?.data?.sales_column_name);
    setOrdersData(ordersDataList?.data?.sales);
  }

  
  

  return (
    <div className="grid grid-cols-1">
        <OrderDataTable
            title="Order History"
            columns={columns}
            rows={ordersData}
        />
    </div>
  );
};

export default OrderListPage;
