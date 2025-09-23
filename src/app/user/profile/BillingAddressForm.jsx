"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { useSession } from "next-auth/react";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getAPIPostDataByRefId } from "@/helpers";

const BillingAddressForm = () => {

  const { data: session } = useSession();

  const [userBillingAddressData, setUserBillingAddressData] = useState([]);

  const billingAddressFormSchema = yup.object({
    bfName: yup.string().required("Please enter your first name"),
    blName: yup.string().required("Please enter your last Name"),
    bcompanyName: yup.string().optional(),
    baddress: yup.string().required("Please enter your Address"),
    bcountry: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    bstate: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    bcity: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    bzipCode: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    bemail: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    bphoneNo: yup.string().required("Please enter your Phone NO."),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(billingAddressFormSchema),
    defaultValues: {
      bfName: "",
      blName: "",
      bcompanyName: "",
      baddress: "",
      bcountry: null,
      bcity: null,
      bstate: null,
      bzipCode: null,
      bemail: "",
      bphoneNo: "",
    },
  });

  // Fetch user profile data
  useEffect(() => {
    fetchData();
  }, [session, reset]);
  
     const fetchData = async () => {
       try {
          
          const billing_Data = await getAPIPostDataByRefId(
            49,
            "",
            session?.user?.data[0]?.user_id
          );
          setUserBillingAddressData(billing_Data?.data || []);
  
          // ✅ Reset form values once data is fetched
          if (billing_Data?.data?.length > 0) {
            const u = billing_Data.data[0];
            reset({
              bfName: u?.b_first_name || "",
              blName: u?.b_last_name || "",
              bcompanyName: u?.b_company_name || "",
              baddress: u?.b_address || "",
              bcountry: u?.b_country_region ? { value: u.b_country_region, label: u.b_country_region } : null,
              bstate: u?.b_state_province ? { value: u.b_state_province, label: u.b_state_province } : null,
              bcity: u?.b_city ? { value: u.b_city, label: u.b_city } : null,
              bzipCode: u?.b_zip_postal_code ? { value: u.b_zip_postal_code, label: u.b_zip_postal_code } : null,
              bemail: u?.b_email || "",
              bphoneNo: u?.b_phone_number || "",
            });
          }
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
    
  
   const onSubmit = async (data) => {
      console.log("67 Billing Data:", data);
     if (userBillingAddressData?.length > 0) {
       const userId = userBillingAddressData[0]?.user_id;
       console.log("99 userId", userId);
       const billing_uniqueKey = generateUniqueKey();
       const payload = {
         "mode": "update",
         "user_id": userId,
         "table_id": 49,
         "table_ref_id": userBillingAddressData[0]?.table_ref_id,
         "data": [
           {
             "table_id": 49,
             "table_col_id": 1,
             "column_data": data?.bfName,
             "column_name": "b_first_name",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 2,
             "column_data": data?.blName,
             "column_name": "b_last_name",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 3,
             "column_data": data?.bcompanyName,
             "column_name": "b_company_name",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 4,
             "column_data": data?.baddress,
             "column_name": "b_address",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 5,
             "column_data": data?.bcountry?.value,
             "column_name": "b_country_region",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 6,
             "column_data": data?.bstate?.value,
             "column_name": "b_state_province",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 7,
             "column_data": data?.bcity?.value,
             "column_name": "b_city",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 8,
             "column_data": data?.bzipCode?.value,
             "column_name": "b_zip_postal_code",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 9,
             "column_data": data?.bemail,
             "column_name": "b_email",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 10,
             "column_data": data?.bphoneNo,
             "column_name": "b_phone_number",
             "table_ref_id": userBillingAddressData[0]?.table_ref_id,
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
         toast.success("Billing Address Successfully Saved.");
         setTimeout(async () => {
             window.location.reload();
         }, 3000); // 3000ms = 3 seconds
       } else {
         toast.error("Something Problem Face For Billing Address.");
       }
     } else {
       var userId = session?.user?.data[0]?.user_id;
       console.log("99 userId", userId);
       const billing_uniqueKey = generateUniqueKey();
       const payload = {
         "mode": "create",
         "user_id": userId,
         "table_id": 49,
         "table_ref_id": billing_uniqueKey,
         "data": [
           {
             "table_id": 49,
             "table_col_id": 1,
             "column_data": data?.bfName,
             "column_name": "b_first_name",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 2,
             "column_data": data?.blName,
             "column_name": "b_last_name",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 3,
             "column_data": data?.bcompanyName,
             "column_name": "b_company_name",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 4,
             "column_data": data?.baddress,
             "column_name": "b_address",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 5,
             "column_data": data?.bcountry?.value,
             "column_name": "b_country_region",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 6,
             "column_data": data?.bstate?.value,
             "column_name": "b_state_province",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 7,
             "column_data": data?.bcity?.value,
             "column_name": "b_city",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 8,
             "column_data": data?.bzipCode?.value,
             "column_name": "b_zip_postal_code",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 9,
             "column_data": data?.bemail,
             "column_name": "b_email",
             "table_ref_id": billing_uniqueKey,
             "tab_rel_id": "",
             "user_id": userId
           },
           {
             "table_id": 49,
             "table_col_id": 10,
             "column_data": data?.bphoneNo,
             "column_name": "b_phone_number",
             "table_ref_id": billing_uniqueKey,
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
         toast.success("Billing Address Successfully Saved.");
         setTimeout(async () => {
             window.location.reload();
         }, 3000); // 3000ms = 3 seconds
       } else {
         toast.error("Something Problem Face For Billing Address.");
       }
     }

     
    }


  return (
    <form
      // onSubmit={handleSubmit(() => {})}
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-default-200 p-6"
    >
      <h4 className="mb-6 text-xl font-medium text-default-900">
        Billing Address
      </h4>
      <div className="grid gap-6 lg:grid-cols-2">
        <TextFormInput
          name="bfName"
          label="First Name"
          type="text"
          placeholder="Enter Your First Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="blName"
          label="Last Name"
          type="text"
          placeholder="Enter Your Last Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="bcompanyName"
          label="Company Name (Optional)"
          type="text"
          placeholder="Enter Your Company Name"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <TextAreaFormInput
          name="baddress"
          label="Address"
          placeholder="Road No. 47/x, House no. 123/B, Flat No. B4"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <SelectFormInput
          name="bcountry"
          label="Country/Region"
          control={control}
          id="billing-country1"
          instanceId="billing-country1"
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
          name="bstate"
          label="State/Province"
          control={control}
          id="billing-state-province1"
          containerClassName="lg:col-span-2"
          instanceId="billing-state-province1"
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
          name="bcity"
          label="City"
          control={control}
          id="billing-city1"
          instanceId="billing-city1"
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
          name="bzipCode"
          label="ZIP/Postal Code"
          control={control}
          id="billing-zip-code1"
          instanceId="billing-zip-code1"
          options={[
            { value: 356123, label: "356123" },
            { value: 350115, label: "350115" },
            { value: 350125, label: "350125" },
            { value: 350135, label: "350135" },
            { value: 350145, label: "350145" },
          ]}
        />
        <TextFormInput
          name="bemail"
          label="Email"
          type="text"
          placeholder="demoexample@mail.com"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="bphoneNo"
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

export default BillingAddressForm;
