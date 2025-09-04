"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuEraser, LuSave } from "react-icons/lu";
import {
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import { BaseURL } from "@/ApiCallMethod/Constants";
import { useRestAPIPost } from "@/ApiCallMethod/useRestAPIPost";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { useRouter } from "next/navigation";


const AddCustomerForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("17 AddCustomerForm session", session)
  console.log("18 AddCustomerForm session?.user?.data[0]?.user_id", session?.user?.data[0]?.user_id)
 
  const uniqueKey =  generateUniqueKey();

  const addCustomerFormSchema = yup.object({
    fname: yup.string().required("Please enter your first name"),
    lname: yup.string().required("Please enter your last name"),
    username: yup.string().required("Please enter your user name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    // phoneNo: yup.number().required("Please enter your Phone NO."),
    phoneNo: yup.string().required("Please enter your Phone NO."),
    // country: yup.string().required("Please select your Country"),
    // state: yup.string().required("Please select your State/Province"),
    // zipCode: yup.string().required("Please select your ZIP/Postal code"),
    // description: yup.string().required("Please enter your description"),
    // country: yup.string("Please select your Country"),
    // state: yup.string("Please select your State/Province"),
    // zipCode: yup.string("Please select your ZIP/Postal code"),
    country: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    state: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    zipCode: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    description: yup.string("Please enter your description"),
  });

  console.log("32 addCustomerFormSchema", addCustomerFormSchema)

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(addCustomerFormSchema),
  });

  // const { postData, loading: restPostLoading, error: restPostError, data: restPostData } = useRestAPIPost();
  // console.log("24 restPostData", restPostData)
  // console.log("24 restPostError", restPostError)
 
  
  
  // useEffect(() => {
  //   if (restPostData?.status == 200) {
  //     toast.success("Customer Created Successfully.");
  //     reset();
  //   }

  //   if (restPostError != null) {
  //     (async () => {
  //       toast.error(restPostError?.response?.data?.message);
  //       // toast.error("Something went wrong. Please enter valid input.");
  //       // const table_id = 39;
  //       // const table_ref_id = localStorage.getItem('customer_ref_id');
  //       // const apiUrl = `${BaseURL}/account/dynamic-table-delete-api/${table_id}/${session?.user?.id}/${table_ref_id}/`;
  //       // const payload = [];

  //       // try {
  //       //   await postData(apiUrl, payload);
  //       // } catch (err) {
  //       //   console.error("API delete failed:", err);
  //       //   toast.error("Failed to delete data on server.");
  //       // }
  //     })();
  //   }
  // }, [restPostData, restPostError]);
  
  // if (restPostError != null){
  //   toast.error("Something Error.Please Valid Input.");
  //   const table_id = 39;
  //   const apiUrl = `${BaseURL}/account/dynamic-table-delete-api/${table_id}/${session?.user?.id}/${uniqueKey}/`;
  //   const payload = []
  //   await postData(apiUrl, payload);
  // }

  
  // const [dkCustomerValue, setDkCustomerValue] = useState({
  //   type: "",
  //   key: "",
  //   value: "",
  // })
  // console.log("49 dkCustomerValue", dkCustomerValue)
  
  // const DynamicInputValueChange = (event) => {
  //   const { name, value } = event.target;
  //   setDkCustomerValue((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };


  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    localStorage.setItem('customer_ref_id', uniqueKey);
    const userId = session?.user?.data[0]?.user_id;
    const payload = {
      "mode": "create",
      "user_id": userId,
      "table_id": 39,
      "table_ref_id": uniqueKey,
      "data": [
        {
          "table_id": 39,
          "table_col_id": 1,
          "column_data": data?.fname,
          "column_name": "First_Name",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        },
        {
          "table_id": 39,
          "table_col_id": 2,
          "column_data": data?.lname,
          "column_name": "Last_Name",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        },
        {
          "table_id": 39,
          "table_col_id": 3,
          "column_data": data?.username,
          "column_name": "User_Name",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        },
        {
          "table_id": 39,
          "table_col_id": 4,
          "column_data": data?.email,
          "column_name": "Email",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        },
        {
          "table_id": 39,
          "table_col_id": 5,
          "column_data": data?.phoneNo,
          "column_name": "Phone_Number",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        },
        {
          "table_id": 39,
          "table_col_id": 6,
          "column_data": data?.country?.value,
          "column_name": "Country_Region",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        },
        {
          "table_id": 39,
          "table_col_id": 7,
          "column_data": data?.state?.value,
          "column_name": "State_Province",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        },
        {
          "table_id": 39,
          "table_col_id": 8,
          "column_data": data?.zipCode?.value,
          "column_name": "Zip_Postal_Code",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        },
        {
          "table_id": 39,
          "table_col_id": 9,
          "column_data": data?.description,
          "column_name": "Description",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": userId
        }
      ]
    }

    // dynamic URL
    const apiUrl = `${BaseURL}/account/dynamic-table-create-api/`;

    const response_data = await restAPIPost(apiUrl, payload)
    if(response_data.status == 200) {
      toast.success("Customer Created Successfully.");
      router.push("/admin/customers");
    } else {
      toast.error(response_data?.response?.data?.message);
    }

    
  };

  return (
    <div className="rounded-lg border border-default-200">
      {/* <form onSubmit={handleSubmit(() => {})} className="p-6"> */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <TextFormInput
            name="fname"
            label="First Name"
            type="text"
            placeholder="Enter Your First Name"
            control={control}
            // onChange={DynamicInputValueChange}
            fullWidth
          />
          <TextFormInput
            name="lname"
            label="Last Name"
            type="text"
            placeholder="Enter Your Last Name"
            control={control}
            fullWidth
          />
          <TextFormInput
            name="username"
            label="User Name"
            type="text"
            placeholder="Enter Your Last Name"
            control={control}
            fullWidth
          />
          <TextFormInput
            name="email"
            label="Email"
            type="email"
            placeholder="demoexample@mail.com"
            control={control}
            fullWidth
          />
          <TextFormInput
            name="phoneNo"
            label="Phone Number"
            type="text"
            placeholder="+1-123-XXX-4567"
            control={control}
            fullWidth
          />
          <SelectFormInput
            name="country"
            label="Country/Region"
            control={control}
            id="billing-country1"
            instanceId="billing-country"
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
            name="state"
            label="State/Province"
            control={control}
            id="billing-state-province1"
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
            name="zipCode"
            label="ZIP/Postal Code"
            control={control}
            id="billing-zip-code1"
            instanceId="billing-zip-code"
            options={[
              { value: 356123, label: "356123" },
              { value: 350115, label: "350115" },
              { value: 350125, label: "350125" },
              { value: 350135, label: "350135" },
              { value: 350145, label: "350145" },
            ]}
          />
          <TextAreaFormInput
            name="description"
            label="Description"
            placeholder="Please enter your description"
            rows={5}
            containerClassName="lg:col-span-2"
            control={control}
            fullWidth
          />
        </div>
        <div className="flex flex-wrap justify-end gap-4">
          <button
            type="reset"
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-6 py-2.5 text-center text-sm font-semibold text-red-500 shadow-sm transition-colors duration-200 hover:bg-red-500 hover:text-white"
          >
            <LuEraser size={20} />
            Clear
          </button>
          <button
            type="submit"
            // className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
            className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-600"
          >
            <LuSave size={20} />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerForm;
