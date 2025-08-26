"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuSave, LuUndo } from "react-icons/lu";
import { TextFormInput } from "@/components";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";

const BankDetailsForm = () => {
  const router = useRouter();
  const businessDetailsFormSchema = yup.object({
    bankName: yup.string().required("Please enter your bank name"),
    branchName: yup.string().required("Please enter your branch name"),
    holderName: yup.string().required("Please enter your account holder name"),
    accountNo: yup.number().required("Please enter your account no."),
    ifscNo: yup.string().required("Please enter IFSC code"),
  });

  const localRestaurantData = JSON.parse(localStorage.getItem("restaurantData"));

  const defaultValue = {
    bankName: localRestaurantData[0]?.Bank_Name,
    branchName: localRestaurantData[0]?.Branch,
    holderName: localRestaurantData[0]?.Account_Holder_Name,
    accountNo: localRestaurantData[0]?.Account_Number,
    ifscNo: localRestaurantData[0]?.IFSC_Code,
  };
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(businessDetailsFormSchema),
    defaultValues: defaultValue,
  });

  const undoChanges = () => {
    reset(defaultValue);
    router.push("/admin/restaurants")
  };

  const onSubmit = async (data) => {
      const PersonalDetail = JSON.parse(localStorage.getItem("PersonalDetail"));
      const BusinessDetail = JSON.parse(localStorage.getItem("BusinessDetail"));
  
      if (!PersonalDetail) {
        toast.error("Please Fill Up Personal Detail Information")
      }
      else if (!BusinessDetail) {
        toast.error("Please Fill Up Business Detail Information")
      } else {
        const payload = {
          "mode": "update",
          "user_id": localRestaurantData[0]?.user_id,
          "table_id": localRestaurantData[0]?.table_id,
          "table_ref_id": localRestaurantData[0]?.table_ref_id,
          "data": [
            {
              "table_id": 40,
              "table_col_id": 1,
              "column_data": PersonalDetail?.fName,
              "column_name": "First_Name",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 2,
              "column_data": PersonalDetail?.lName,
              "column_name": "Last_Name",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 3,
              "column_data": PersonalDetail?.contactNO,
              "column_name": "Step1_Contact_Number",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 4,
              "column_data": PersonalDetail?.panNo,
              "column_name": "Pan_Card_Number",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 5,
              "column_data": PersonalDetail?.email,
              "column_name": "Step1_Email",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 6,
              "column_data": PersonalDetail?.birthDate,
              "column_name": "Birth_of_Date",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 7,
              "column_data": PersonalDetail?.city?.value,
              "column_name": "City",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 8,
              "column_data": PersonalDetail?.country?.value,
              "column_name": "Country_Region",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 9,
              "column_data": PersonalDetail?.zipCode?.value,
              "column_name": "Zip_Postal_Code",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 10,
              "column_data": PersonalDetail?.description,
              "column_name": "Step1_Description",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 11,
              "column_data": BusinessDetail?.businessName,
              "column_name": "Business_Name",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 12,
              "column_data": BusinessDetail?.businessType,
              "column_name": "Business_Type",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 13,
              "column_data": BusinessDetail?.contactNO,
              "column_name": "Step2_Contact_Number",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 14,
              "column_data": BusinessDetail?.gstNo,
              "column_name": "GST_Number",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 15,
              "column_data": BusinessDetail?.website,
              "column_name": "Website",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 16,
              "column_data": BusinessDetail?.email,
              "column_name": "Step2_Email",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 17,
              "column_data": BusinessDetail?.description,
              "column_name": "Step2_Description",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 18,
              "column_data": data?.bankName,
              "column_name": "Bank_Name",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 19,
              "column_data": data?.branchName,
              "column_name": "Branch",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 20,
              "column_data": data?.holderName,
              "column_name": "Account_Holder_Name",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 21,
              "column_data": data?.accountNo,
              "column_name": "Account_Number",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            },
            {
              "table_id": 40,
              "table_col_id": 22,
              "column_data": data?.ifscNo,
              "column_name": "IFSC_Code",
              "table_ref_id": localRestaurantData[0]?.table_ref_id,
              "tab_rel_id": "",
              "user_id": localRestaurantData[0]?.user_id
            }
          ]
        }
        
        // dynamic URL
        
        const apiUrl = `${BaseURL}/account/dynamic-table-create-api/`;
        const response_data = await restAPIPost(apiUrl, payload)
        if(response_data.status == 200) {
          toast.success("Restaurant Updated Successfully.");
          localStorage.clear()
          router.push("/admin/restaurants")
        } else {
          toast.error("Something Problem Face For Restaurant Update Purpose.");
        }
      }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="tabBankDetail"
      className="hidden"
      role="tabpanel"
    >
      <h4 className="mb-6 text-lg font-medium text-default-900">Step 3:</h4>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <TextFormInput
          name="bankName"
          type="text"
          label="Bank Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="branchName"
          type="text"
          label="Branch"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="holderName"
          type="text"
          label="Account Holder Name"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="accountNo"
          type="text"
          label="Account Number"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="ifscNo"
          type="text"
          label="IFSC Code"
          control={control}
          fullWidth
        />
      </div>
      <div className="flex flex-wrap justify-end gap-4">
        <button
          type="reset"
          onClick={undoChanges}
          className="inline-flex items-center gap-1 rounded-lg border border-primary bg-transparent px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-primary duration-500 hover:bg-primary hover:text-white"
        >
          <LuUndo size={20} />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
        >
          <LuSave size={20} />
          Final Save
        </button>
      </div>
    </form>
  );
};

export default BankDetailsForm;
