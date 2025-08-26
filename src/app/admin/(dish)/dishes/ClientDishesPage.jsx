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


const ClientDishesPage = () => {
    const { data: session } = useSession();
    const [columns, setColumns] = useState([
        {
            "key": "Product_Name",
            "name": "Product_Name"
        },
        {
            "key": "user_id",
            "name": "user_id"
        },
        {
            "key": "Product_Catagory",
            "name": "Product_Catagory"
        },
        {
            "key": "Selling_Price",
            "name": "Selling_Price"
        },
        {
            "key": "Cost_Price",
            "name": "Cost_Price"
        },
        {
            "key": "Quantity",
            "name": "Quantity"
        },
        {
            "key": "Delivery_Type",
            "name": "Delivery_Type"
        },
        {
            "key": "Discount",
            "name": "Discount"
        },
        {
            "key": "Expiry_Date",
            "name": "Expiry_Date"
        },
        {
            "key": "Description",
            "name": "Description"
        },
        {
            "key": "Product_Long_Description",
            "name": "Product_Long_Description"
        },
        {
            "key": "Return_Policy",
            "name": "Return_Policy"
        },
        {
            "key": "Sale_Start_On",
            "name": "Sale_Start_On"
        },
        {
            "key": "Sale_End_On",
            "name": "Sale_End_On"
        },
        {
            "key": "main_image_path",
            "name": "main_image_path"
        },
        {
            "key": "additional_image_path",
            "name": "additional_image_path"
        },
        {
            "key": "Restuarant_Name",
            "name": "Restuarant_Name"
        },
        {
            "key": "Created_By",
            "name": "Created_By"
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
    const [dishesData, setDishesData] = useState([
        {
            "Product_Name": "",
            "table_ref_id": "",
            "table_id": 0,
            "id": 0,
            "tab_rel_id": "",
            "user_id": "",
            "Product_Catagory": "",
            "Selling_Price": "",
            "Cost_Price": "",
            "Quantity": "",
            "Delivery_Type": "",
            "Discount": "",
            "Expiry_Date": "",
            "Description": "",
            "Product_Long_Description": "",
            "Return_Policy": "",
            "Sale_Start_On": "",
            "Sale_End_On": "",
            "main_image_path": "",
            "additional_image_path": "",
            "Restuarant_Name": "",
            "Created_By": "",
            "Status": ""
        }
    ])
   
    useEffect(() => {
        DataFetch()
    }, [])

    const DataFetch = async () => {
        const dishesDataList = await getAPIPostDataByRefId(41, "", session?.user?.data[0]?.user_id);
        setColumns(dishesDataList?.column_name);
        setDishesData(dishesDataList?.data);
    }

    

    return (
        <div className="rounded-lg border border-default-200">
            <DishDataTable
              rows={dishesData}
              columns={columns}
              title="Dishes List"
              buttonLink="/admin/add-dish"
              buttonText="Add Dish"
            />
        </div>
    );
};

export default ClientDishesPage;
