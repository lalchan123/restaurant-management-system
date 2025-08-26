"use client";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import { LuEraser, LuSave } from "react-icons/lu";
import {
  DateFormInput,
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";

//style
import "react-quill/dist/quill.snow.css";
import BooleanFormInput from "@/components/form/BooleanFormInput";
import { getAPIPostDataByRefId } from "@/helpers";
import { toast } from "sonner";
import { useEffect } from "react";
import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { BaseURL } from "@/ApiCallMethod/Constants";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import restAPIPost from "@/ApiCallMethod/restAPIPost";

const AddDishForm = async () => {

  const { data: session } = useSession();
  console.log("30 session", session)
  const uniqueKey = generateUniqueKey();
  const router = useRouter();
  // const restaurantsData = await getAPIPostDataByRefId(40, "", session?.user?.id);

  // if (!restaurantsData) notFound();

  const [restuarantListData, setRestuarantListData] = useState([{
    table_ref_id: "",
    value: "",
    label: ""
  }]);

  useEffect(() => {
    DataFetch();
  }, [])

  const DataFetch = async () => {
  //   const payload = {
  //     "user_id": session?.user?.id,
  //     "table_id": 40,
  //     "table_ref_id": ""
  //   }
  //   // dynamic URL
  //   const apiUrl = `${BaseURL}/account/dynamic-table-get-api/`;
            
  // // await getData(apiUrl, payload);
    //   await postData(apiUrl, payload);
    const restaurantsData = await getAPIPostDataByRefId(40, "", session?.user?.data[0]?.user_id)
    // console.log("41 restaurantsData", restaurantsData);
    const listData = []
    restaurantsData?.data?.map((item, i) => {
      listData.push({
        table_ref_id: item?.table_ref_id,
        value: item?.First_Name + ' ' + item?.Last_Name,
        label: item?.First_Name + ' ' + item?.Last_Name,
      })
    });
    setRestuarantListData(listData);
  }

  let valueSnow = "";
  valueSnow = `<h5><span class="ql-size-large">Add a long description for your product</span></h5>`;

  const credentialsManagementFormSchema = yup.object({
    productname: yup.string().required("Please enter your product name"),
    restaurantName: yup.object({
      table_ref_id: yup.string(),
      value: yup.string(),
      label: yup.string(),
    }),
    productCatagory: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    sellingPrice: yup.number().required("Please enter your selling price"),
    costPrice: yup.number().required("Please enter your selling price"),
    quantity: yup.number().required("Please enter your quantity"),
    deliveryType: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    Discount: yup.boolean().oneOf([true], "You must accept the terms"),
    ExpiryDate: yup.boolean().oneOf([true], "You must accept the terms"),
    ReturnPolicy: yup.boolean().oneOf([true], "You must accept the terms"),
    description: yup.string().required("Please enter your description"),
    ProductLongDescription: yup.string().required("Please enter your description"),
    saleStartDate: yup.string().required("Please select Sale Start Date"),
    saleEndDate: yup.string().required("Please select Sale End Date"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(credentialsManagementFormSchema),
  });


  const onSubmit = async (data) => {
    console.log("52 Dish Data:", data);
    const MainImagePath = localStorage.getItem("MainImagePath");
    const AdditionalImagePath = localStorage.getItem("AdditionalImagePath");
    console.log("MainImagePath", MainImagePath);
    console.log("AdditionalImagePath", AdditionalImagePath);

    const userId = session?.user?.data[0]?.user_id;
   
    if (!MainImagePath) {
      toast.error("Please Upload Main Image Path");
    }
    else if (!AdditionalImagePath) {
      toast.error("Please Upload Additional Image Path");
    } else {
      const payload = {
        "mode": "create",
        "user_id": userId,
        "table_id": 41,
        "table_ref_id": uniqueKey,
        "data": [
          {
            "table_id": 41,
            "table_col_id": 1,
            "column_data": data?.productname,
            "column_name": "Product_Name",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 2,
            "column_data": data?.productCatagory?.value,
            "column_name": "Product_Catagory",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 3,
            "column_data": data?.sellingPrice,
            "column_name": "Selling_Price",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 4,
            "column_data": data?.costPrice,
            "column_name": "Cost_Price",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 5,
            "column_data": data?.quantity,
            "column_name": "Quantity",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 6,
            "column_data": data?.deliveryType?.value,
            "column_name": "Delivery_Type",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 7,
            // "column_data": data?.Discount?.toString(),
            "column_data": data?.Discount,
            "column_name": "Discount",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 8,
            // "column_data": data?.ExpiryDate?.toString(),
            "column_data": data?.ExpiryDate,
            "column_name": "Expiry_Date",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 9,
            "column_data": data?.description,
            "column_name": "Description",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 10,
            "column_data": data?.ProductLongDescription,
            "column_name": "Product_Long_Description",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 11,
            // "column_data": data?.ReturnPolicy?.toString(),
            "column_data": data?.ReturnPolicy,
            "column_name": "Return_Policy",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 12,
            "column_data": data?.saleStartDate,
            "column_name": "Sale_Start_On",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 13,
            "column_data": data?.saleEndDate,
            "column_name": "Sale_End_On",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 14,
            "column_data": MainImagePath,
            "column_name": "main_image_path",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 15,
            "column_data": AdditionalImagePath,
            "column_name": "additional_image_path",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 16,
            "column_data": data?.restaurantName?.table_ref_id,
            "column_name": "Restuarant_Name",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 17,
            "column_data": session?.user?.role,
            "column_name": "Created_By",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 41,
            "table_col_id": 18,
            "column_data": "Published",
            "column_name": "Status",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          }
        ]
      }
      
      // dynamic URL
      const apiUrl = `${BaseURL}/account/dynamic-table-create-api/`;
      const response_data = await restAPIPost(apiUrl, payload)
      console.log("166 response_data", response_data)
      if(response_data.status == 200) {
        toast.success("Dish Created Successfully.");
        localStorage.clear()
        router.push("/admin/dishes");
      } else {
        toast.error("Something Problem Face For Dish Create Purpose.");
      }
    }
  }

  return (
    <div className="xl:col-span-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-lg border border-default-200 p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <TextFormInput
                name="productname"
                type="text"
                label="Product Name"
                placeholder="Product Name"
                control={control}
                fullWidth
              />

              <SelectFormInput
                name="restaurantName"
                label="Restaurant Name"
                id="restaurant-name"
                instanceId="product-restaurant-name"
                control={control}
                options={restuarantListData}
                // options={[
                //   { table_ref_id: "1", value: "AB Restaurant", label: "AB Restaurant" },
                //   { table_ref_id: "2", value: "BC Restaurant", label: "BC Restaurant" },
                //   { table_ref_id: "3", value: "CA Restaurant", label: "CA Restaurant" },
                // ]}
                fullWidth
              />
              <SelectFormInput
                name="productCatagory"
                label="Product Catagory"
                id="product-catagory"
                instanceId="product-catagory"
                control={control}
                options={[
                  // { value: "Italian", label: "Italian" },
                  // { value: "BBQ", label: "BBQ" },
                  // { value: "Mexican", label: "Mexican" },
                  { value: "Coffee", label: "Coffee" },
                  { value: "Burger", label: "Burger" },
                  { value: "Noodles", label: "Noodles" },
                  { value: "Pizza", label: "Pizza" },
                  { value: "Wrap", label: "Wrap" },
                  { value: "Appetizers", label: "Appetizers" },
                  { value: "Dessert", label: "Dessert" },
                ]}
                fullWidth
              />
              <div className="grid gap-6 lg:grid-cols-2">
                <TextFormInput
                  name="sellingPrice"
                  type="text"
                  label="Selling Price"
                  placeholder="Selling Price"
                  control={control}
                  fullWidth
                />
                <TextFormInput
                  name="costPrice"
                  type="text"
                  label="Cost Price"
                  placeholder="Cost Price"
                  control={control}
                  fullWidth
                />
              </div>
              <TextFormInput
                name="quantity"
                type="text"
                label="Quantity"
                placeholder="Quantity in Stock"
                control={control}
                fullWidth
              />
              <SelectFormInput
                name="deliveryType"
                label="Delivery Type"
                id="delivery-catagory"
                instanceId="delivery-catagory"
                control={control}
                options={[
                  { value: "Delivery", label: "Delivery" },
                  { value: "Pickup", label: "Pickup" },
                  { value: "Dine-in", label: "Dine-in" },
                ]}
                fullWidth
              />
              <BooleanFormInput
                name="Discount"
                type="checkbox"
                label="Add Discount"
                control={control}
                fullWidth
              />
              <BooleanFormInput
                name="ExpiryDate"
                type="checkbox"
                label="Add Expiry Date"
                control={control}
                fullWidth
              />
            </div>
            <div className="space-y-6">
              <TextAreaFormInput
                name="description"
                label="Description"
                placeholder="short Description"
                rows={5}
                control={control}
                fullWidth
              />
              <TextAreaFormInput
                name="ProductLongDescription"
                label="Product Long Description"
                placeholder="Product Long Description"
                rows={8}
                control={control}
                fullWidth
              />
              {/* <div>
                <label
                  className="mb-2 block text-sm font-medium text-default-900"
                  htmlFor="editor"
                >
                  Product Long Description
                </label>
                <div id="editor" className="h-44">
                  <ReactQuill
                    defaultValue={valueSnow}
                    theme="snow"
                    style={{ height: "180px", paddingBottom: "26px" }}
                    className="pb-1"
                    // onChange={setValue}
                  />
                </div>
              </div> */}
              <BooleanFormInput
                name="ReturnPolicy"
                type="checkbox"
                label="Returnable"
                control={control}
                fullWidth
              />
              <div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <DateFormInput
                    name="saleStartDate"
                    type="date"
                    label="Sale Start On"
                    className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
                    placeholder="12/9/2022"
                    options={{
                      dateFormat: "d/m/Y",
                      // enableTime: true,
                    }}
                    fullWidth
                    control={control}
                  />
                  <DateFormInput
                    name="saleEndDate"
                    type="date"
                    label="Sale End On"
                    className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
                    placeholder="12/10/2022"
                    options={{
                      dateFormat: "d/m/Y",
                      // enableTime: true,
                    }}
                    fullWidth
                    control={control}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-wrap items-center justify-end gap-4">
            <div className="flex flex-wrap items-center gap-4">
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
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
              >
                <LuSave size={20} />
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDishForm;
