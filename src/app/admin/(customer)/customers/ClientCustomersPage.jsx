"use client"
import { BreadcrumbAdmin, CustomerDataTable } from "@/components";
//data
import { signIn, useSession } from "next-auth/react";
import { sellersData } from "@/assets/data";
import { useRestAPIGet } from "@/ApiCallMethod/useRestAPIGet";
import { useEffect, useState } from "react";
import { BaseURL } from "@/ApiCallMethod/Constants";
import { useRestAPIPost } from "@/ApiCallMethod/useRestAPIPost";
import { getAPIPostDataByRefId } from "@/helpers";


const ClientCustomersPage = () => {
    const { data: session } = useSession();
    //   const { getData, loading: restGetLoading, error: restGetError, data: restGetData } = useRestAPIGet();
    //   console.log("14 restGetData", restGetData)
    //   console.log("15 restGetError", restGetError)
  
    
    // const { postData, loading: restPostLoading, error: restPostError, data: restPostData } = useRestAPIPost();
    // console.log("14 restPostData", restPostData)
    // console.log("15 restPostError", restPostError)
    

    // const DataFetch = async () => {
    //     const payload = {
    //         "user_id": session?.user?.data[0]?.user_id,
    //         "table_id": 39,
    //         "table_ref_id": ""
    //     }
    //     // dynamic URL
    //     const apiUrl = `${BaseURL}/account/dynamic-table-get-api/`;
        
    //     // await getData(apiUrl, payload);
    //     await postData(apiUrl, payload);
    // }

    // useEffect(() => {
    //     DataFetch()
    // }, [])

    const [customersData, setCustomersData] = useState([
                {
            "First_Name": "",
            "table_ref_id": "",
            "table_id": 0,
            "id": 0,
            "tab_rel_id": "",
            "user_id": "",
            "Last_Name": "",
            "User_Name": "",
            "Email": "",
            "Phone_Number": "",
            "Country_Region": "",
            "State_Province": "",
            "Zip_Postal_Code": "",
            "Description": ""
        }
    ])
    const [columnsData, setColumnsData] = useState([
                {
            "key": "First_Name",
            "name": "First_Name"
        },
        {
            "key": "user_id",
            "name": "user_id"
        },
        {
            "key": "Last_Name",
            "name": "Last_Name"
        },
        {
            "key": "User_Name",
            "name": "User_Name"
        },
        {
            "key": "Email",
            "name": "Email"
        },
        {
            "key": "Phone_Number",
            "name": "Phone_Number"
        },
        {
            "key": "Country_Region",
            "name": "Country_Region"
        },
        {
            "key": "State_Province",
            "name": "State_Province"
        },
        {
            "key": "Zip_Postal_Code",
            "name": "Zip_Postal_Code"
        },
        {
            "key": "Description",
            "name": "Description"
        },
        {
            "key": "Action",
            "name": "Action"
        }
    ])
        
    useEffect(() => {
        DataFetch();
    }, [])
        
    const DataFetch = async () => {
        const customersDataList = await getAPIPostDataByRefId(39, "", session?.user?.data[0]?.user_id);
        setCustomersData(customersDataList?.data);
        setColumnsData(customersDataList?.column_name);
    }

   
    return (
        <div className="page-content space-y-6 p-6">
            <CustomerDataTable
                // rows={sellersData}
                // columns={columns}
                rows={customersData}
                columns={columnsData}
                title="Customers"
                buttonText="Add a new Customer"
                buttonLink="/admin/add-customer"
            />
        </div>
    );
};

export default ClientCustomersPage;
