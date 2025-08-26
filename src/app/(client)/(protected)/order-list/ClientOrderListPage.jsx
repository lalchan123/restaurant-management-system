"use client"
import { BreadcrumbAdmin, CustomerDataTable, DishDataTable } from "@/components";
//data
import { signIn, useSession } from "next-auth/react";
import { sellersData } from "@/assets/data";
import { useRestAPIGet } from "@/ApiCallMethod/useRestAPIGet";
import { useEffect, useState } from "react";
import { BaseURL } from "@/ApiCallMethod/Constants";
import { useRestAPIPost } from "@/ApiCallMethod/useRestAPIPost";
import { getAPIPostDataByRefId } from "@/helpers";
import OrderListDataTable from "@/components/data-tables/OrderListDataTable";


const ClientOrderListPage = () => {
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
        const ordersDataList = await getAPIPostDataByRefId(44, "", session?.user?.data[0]?.user_id);
        setColumns(ordersDataList?.column_name);
        setOrdersData(ordersDataList?.data);
    }

    

    return (
        <div className="rounded-lg border border-default-200">
            <OrderListDataTable
              rows={ordersData}
              columns={columns}
            />
        </div>
    );
};

export default ClientOrderListPage;
