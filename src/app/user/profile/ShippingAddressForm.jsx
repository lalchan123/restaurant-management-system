"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAPIPostDataByRefId } from "@/helpers";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import { toast } from "sonner";

const ShippingAddressForm = () => {

  const { data: session } = useSession();
  const [userShippingAddressData, setUserShippingAddressData] = useState([]);

  const shippingAddressFormSchema = yup.object({
    sfName: yup.string().required("Please enter your first name"),
    slName: yup.string().required("Please enter your last Name"),
    scompanyName: yup.string().optional(),
    saddress: yup.string().required("Please enter your Address"),
    scountry:  yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    sstate: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    scity: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    szipCode: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    semail: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    sphoneNo: yup.string().required("Please enter your Phone NO."),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(shippingAddressFormSchema),
    defaultValues: {
      sfName: "",
      slName: "",
      scompanyName: "",
      saddress: "",
      scountry: null,
      scity: null,
      sstate: null,
      szipCode: null,
      semail: "",
      sphoneNo: "",
    },
  });


  // Fetch user profile data
  
    useEffect(() => {
      fetchData();
    }, [session, reset]);
    
       const fetchData = async () => {
         try {
            const shipping_Data = await getAPIPostDataByRefId(
              50,
              "",
              session?.user?.data[0]?.user_id
            );
            setUserShippingAddressData(shipping_Data?.data || []);
    
            // ✅ Reset form values once data is fetched
            if (shipping_Data?.data?.length > 0) {
              const u = shipping_Data.data[0];
              reset({
                sfName: u?.s_first_name || "",
                slName: u?.s_last_name || "",
                scompanyName: u?.s_company_name || "",
                saddress: u?.s_address || "",
                scountry: u?.s_country_region ? { value: u.s_country_region, label: u.s_country_region } : null,
                sstate: u?.s_state_province ? { value: u.s_state_province, label: u.s_state_province } : null,
                scity: u?.s_city ? { value: u.s_city, label: u.s_city } : null,
                szipCode: u?.s_zip_postal_code ? { value: u.s_zip_postal_code, label: u.s_zip_postal_code } : null,
                semail: u?.s_email || "",
                sphoneNo: u?.s_phone_number || "",
              });
            }
          } catch (err) {
            console.error("Error fetching data:", err);
          }
        };
      
    
     const onSubmit = async (data) => {
        console.log("67 Shipping Data:", data);
       if (userShippingAddressData?.length > 0) {
         const userId = userShippingAddressData[0]?.user_id;
         console.log("99 userId", userId);
         const payload = {
           "mode": "update",
           "user_id": userId,
           "table_id": 49,
           "table_ref_id": userShippingAddressData[0]?.table_ref_id,
           "data": [
             {
               "table_id": 50,
               "table_col_id": 1,
               "column_data": data?.sfName,
               "column_name": "s_first_name",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 2,
               "column_data": data?.slName,
               "column_name": "s_last_name",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 3,
               "column_data": data?.scompanyName,
               "column_name": "s_company_name",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 4,
               "column_data": data?.saddress,
               "column_name": "s_address",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 5,
               "column_data": data?.scountry?.value,
               "column_name": "s_country_region",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 6,
               "column_data": data?.sstate?.value,
               "column_name": "s_state_province",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 7,
               "column_data": data?.scity?.value,
               "column_name": "s_city",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 8,
               "column_data": data?.szipCode?.value,
               "column_name": "s_zip_postal_code",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 9,
               "column_data": data?.semail,
               "column_name": "s_email",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 10,
               "column_data": data?.sphoneNo,
               "column_name": "s_phone_number",
               "table_ref_id": userShippingAddressData[0]?.table_ref_id,
               "tab_rel_id": "",
               "user_id": userId
             }
           ]
         }
          
         // dynamic URL
         const apiUrl = `${BaseURL}/account/dynamic-table-create-api/`;
         const response_data = await restAPIPost(apiUrl, payload)
         console.log("166 response_data", response_data)
         if (response_data.status == 200) {
           toast.success("Shipping Address Successfully Saved.");
           setTimeout(async () => {
               window.location.reload();
           }, 3000); // 3000ms = 3 seconds
         } else {
           toast.error("Something Problem Face For Shipping Address.");
         }
       } else {
         var userId = session?.user?.data[0]?.user_id;
         console.log("99 userId", userId);
         const shipping_uniqueKey = generateUniqueKey();
         const payload = {
           "mode": "create",
           "user_id": userId,
           "table_id": 50,
           "table_ref_id": shipping_uniqueKey,
           "data": [
             {
               "table_id": 50,
               "table_col_id": 1,
               "column_data": data?.sfName,
               "column_name": "s_first_name",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 2,
               "column_data": data?.slName,
               "column_name": "s_last_name",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 3,
               "column_data": data?.scompanyName,
               "column_name": "s_company_name",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 4,
               "column_data": data?.saddress,
               "column_name": "s_address",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 5,
               "column_data": data?.scountry?.value,
               "column_name": "s_country_region",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 6,
               "column_data": data?.sstate?.value,
               "column_name": "s_state_province",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 7,
               "column_data": data?.scity?.value,
               "column_name": "s_city",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 8,
               "column_data": data?.szipCode?.value,
               "column_name": "s_zip_postal_code",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 9,
               "column_data": data?.semail,
               "column_name": "s_email",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             },
             {
               "table_id": 50,
               "table_col_id": 10,
               "column_data": data?.sphoneNo,
               "column_name": "s_phone_number",
               "table_ref_id": shipping_uniqueKey,
               "tab_rel_id": "",
               "user_id": userId
             }
           ]
         }
          
         // dynamic URL
         const apiUrl = `${BaseURL}/account/dynamic-table-create-api/`;
         const response_data = await restAPIPost(apiUrl, payload)
         console.log("166 response_data", response_data)
         if (response_data.status == 200) {
           toast.success("Shipping Address Successfully Saved.");
           setTimeout(async () => {
               window.location.reload();
           }, 3000); // 3000ms = 3 seconds
         } else {
           toast.error("Something Problem Face For Shipping Address.");
         }
       }
  
       
      }
  



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-default-200 p-6"
    >
      <h4 className="mb-6 text-xl font-medium text-default-900">
        Shipping Address
      </h4>
      <div className="grid gap-6 lg:grid-cols-2">
        <TextFormInput
          name="sfName"
          label="First Name"
          type="text"
          placeholder="Enter Your First Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="slName"
          label="Last Name"
          type="text"
          placeholder="Enter Your Last Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="scompanyName"
          label="Company Name (Optional)"
          type="text"
          placeholder="Enter Your Company Name"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <TextAreaFormInput
          name="saddress"
          label="Address"
          placeholder="Road No. 47/x, House no. 123/B, Flat No. B4"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <SelectFormInput
          name="scountry"
          label="Country/Region"
          control={control}
          id="billing-country3"
          instanceId="billing-country"
          containerClassName="lg:col-span-2"
          options={[
            { value: "United States", label: "United States" },
            { value: "Canada", label: "Canada" },
            { value: "Australia", label: "Australia" },
            { value: "Germany", label: "Germany" },
            { value: "Bangladesh", label: "Bangladesh" },
            { value: "China", label: "China" },
            { value: "Argentina", label: "Argentina" },
            { value: "Bharat", label: "Bharat" },
            { value: "Afghanistan", label: "Afghanistan" },
            { value: "France", label: "France" },
            { value: "Brazil", label: "Brazil" },
            { value: "Belgium", label: "Belgium" },
            { value: "Colombia", label: "Colombia" },
            { value: "Albania", label: "Albania" },
          ]}
        />
        <SelectFormInput
          name="sstate"
          label="State/Province"
          control={control}
          id="billing-state-province3"
          containerClassName="lg:col-span-2"
          instanceId="billing-state-province"
          options={[
            { value: "Alabama", label: "Alabama" },
            { value: "Alaska", label: "Alaska" },
            { value: "Arizona", label: "Arizona" },
            { value: "Arkansas", label: "Arkansas" },
            { value: "California", label: "California" },
            { value: "Colorado", label: "Colorado" },
            { value: "Connecticut", label: "Connecticut" },
            { value: "Delaware", label: "Delaware" },
            { value: "Florida", label: "Florida" },
            { value: "Gujarat", label: "Gujarat" },
            { value: "Iowa", label: "Iowa" },
            { value: "Kansas", label: "Kansas" },
            { value: "Kentucky", label: "Kentucky" },
          ]}
        />
        <SelectFormInput
          name="scity"
          label="City"
          control={control}
          id="billing-city3"
          instanceId="billing-city"
          options={[
            { value: "Alexander", label: "Alexander" },
            { value: "Andalusia", label: "Andalusia" },
            { value: "Anniston", label: "Anniston" },
            { value: "Athens", label: "Athens" },
            { value: "Atmore", label: "Atmore" },
            { value: "Auburn", label: "Auburn" },
            { value: "Chickasaw", label: "Chickasaw" },
            { value: "Clanton", label: "Clanton" },
            { value: "Demopolis", label: "Demopolis" },
            { value: "Guntersville", label: "Guntersville" },
            { value: "Huntsville", label: "Huntsville" },
            { value: "Jasper", label: "Jasper" },
            { value: "Marion", label: "Marion" },
          ]}
        />
        <SelectFormInput
          name="szipCode"
          label="ZIP/Postal Code"
          control={control}
          id="billing-zip-code3"
          instanceId="billing-zip-code"
          options={[
            { value: 356123, label: "356123" },
            { value: 350115, label: "350115" },
            { value: 350125, label: "350125" },
            { value: 350135, label: "350135" },
            { value: 350145, label: "350145" },
          ]}
        />
        <TextFormInput
          name="semail"
          label="Email"
          type="text"
          placeholder="demoexample@mail.com"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="sphoneNo"
          label="Phone Number"
          type="text"
          placeholder="+1-123-XXX-4567"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:border-primary-700 hover:bg-primary-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShippingAddressForm;
