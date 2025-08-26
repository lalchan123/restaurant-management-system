"use client"
//data
import { signIn, useSession } from "next-auth/react";
import { useRestAPIGet } from "@/ApiCallMethod/useRestAPIGet";
import { useEffect, useState } from "react";
import { BaseURL } from "@/ApiCallMethod/Constants";
import { RestaurantListCard } from "@/components/cards";
// import { restaurantsData } from "@/assets/data";
import { getAPIPostDataByRefId } from "@/helpers";
import { useRestAPIPost } from "@/ApiCallMethod/useRestAPIPost";


const ClientRestaurantPage = async() => {
    const { data: session } = useSession();
    const [restaurantsData, setRestaurantsData] = useState([
        {
            "First_Name": "",
            "table_ref_id": "",
            "table_id": 0,
            "id": 0,
            "tab_rel_id": "",
            "user_id": "",
            "Last_Name": "",
            "Step1_Contact_Number": "",
            "Pan_Card_Number": "",
            "Step1_Email": "",
            "Birth_of_Date": "",
            "City": "",
            "Country_Region": "",
            "Zip_Postal_Code": "",
            "Step1_Description": "",
            "Business_Name": "",
            "Business_Type": "",
            "Step2_Contact_Number": "",
            "GST_Number": "",
            "Website": "",
            "Step2_Email": "",
            "Step2_Description": "",
            "Bank_Name": "",
            "Branch": "",
            "Account_Holder_Name": "",
            "Account_Number": "",
            "IFSC_Code": ""
        }
    ])
    // const restaurantsData = await getAPIPostDataByRefId(40, "", session?.user?.id);
    
    useEffect(() => {
        DataFetch();
    }, [])
    
    const DataFetch = async () => {
        const restaurantsDataList = await getAPIPostDataByRefId(40, "", session?.user?.data[0]?.user_id);
        setRestaurantsData(restaurantsDataList?.data);
    }

    return (
        <div className="page-content space-y-6 p-6">
            <div className="mb-6 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
                {restaurantsData && restaurantsData?.map((restaurant, idx) => (
                    <RestaurantListCard key={restaurant?.table_ref_id} restaurant={restaurant} table_ref_id_data={restaurant?.table_ref_id} user_id_data={session?.user?.data[0]?.user_id} />
                ))}
            </div>
        </div>
    );
};

export default ClientRestaurantPage;
