"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuEraser, LuSave } from "react-icons/lu";
import { TextFormInput } from "@/components";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { useRouter } from "next/navigation";

const BankDetailsForm = () => {
  const { data: session } = useSession();
  const uniqueKey = generateUniqueKey();
  const router = useRouter();
  
  
  const bankDetailsFormSchema = yup.object({
    bankName: yup.string().required("Please enter your bank name"),
    branchName: yup.string().required("Please enter your branch name"),
    holderName: yup.string().required("Please enter your account holder name"),
    accountNo: yup.number().required("Please enter your account no."),
    ifscNo: yup.string().required("Please enter IFSC code"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(bankDetailsFormSchema),
  });

  const onSubmit = async (data) => {
    console.log("BankDetail Data:", data);
    const PersonalDetail = JSON.parse(localStorage.getItem("PersonalDetail"));
    const BusinessDetail = JSON.parse(localStorage.getItem("BusinessDetail"));

    const userId = session?.user?.data[0]?.user_id;

    if (!PersonalDetail) {
      toast.error("Please Fill Up Personal Detail Information")
    }
    else if (!BusinessDetail) {
      toast.error("Please Fill Up Business Detail Information")
    } else {
      console.log("PersonalDetail Data", PersonalDetail)
      console.log("BusinessDetail Data", BusinessDetail)
      const payload = {
        "mode": "create",
        "user_id": userId,
        "table_id": 40,
        "table_ref_id": uniqueKey,
        "data": [
          {
            "table_id": 40,
            "table_col_id": 1,
            "column_data": PersonalDetail?.fName,
            "column_name": "First_Name",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 2,
            "column_data": PersonalDetail?.lName,
            "column_name": "Last_Name",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 3,
            "column_data": PersonalDetail?.contactNO,
            "column_name": "Step1_Contact_Number",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 4,
            "column_data": PersonalDetail?.panNo,
            "column_name": "Pan_Card_Number",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 5,
            "column_data": PersonalDetail?.email,
            "column_name": "Step1_Email",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 6,
            "column_data": PersonalDetail?.birthDate,
            "column_name": "Birth_of_Date",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 7,
            "column_data": PersonalDetail?.city?.value,
            "column_name": "City",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 8,
            "column_data": PersonalDetail?.country?.value,
            "column_name": "Country_Region",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 9,
            "column_data": PersonalDetail?.zipCode?.value,
            "column_name": "Zip_Postal_Code",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 10,
            "column_data": PersonalDetail?.description,
            "column_name": "Step1_Description",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 11,
            "column_data": BusinessDetail?.businessName,
            "column_name": "Business_Name",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 12,
            "column_data": BusinessDetail?.businessType,
            "column_name": "Business_Type",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 13,
            "column_data": BusinessDetail?.contactNO,
            "column_name": "Step2_Contact_Number",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 14,
            "column_data": BusinessDetail?.gstNo,
            "column_name": "GST_Number",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 15,
            "column_data": BusinessDetail?.website,
            "column_name": "Website",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 16,
            "column_data": BusinessDetail?.email,
            "column_name": "Step2_Email",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 17,
            "column_data": BusinessDetail?.description,
            "column_name": "Step2_Description",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 18,
            "column_data": data?.bankName,
            "column_name": "Bank_Name",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 19,
            "column_data": data?.branchName,
            "column_name": "Branch",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 20,
            "column_data": data?.holderName,
            "column_name": "Account_Holder_Name",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 21,
            "column_data": data?.accountNo,
            "column_name": "Account_Number",
            "table_ref_id": uniqueKey,
            "tab_rel_id": "",
            "user_id": userId
          },
          {
            "table_id": 40,
            "table_col_id": 22,
            "column_data": data?.ifscNo,
            "column_name": "IFSC_Code",
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
        toast.success("Restaurant Created Successfully.");
        localStorage.clear()
        router.push("/admin/restaurants");
      } else {
        toast.error("Something Problem Face For Restaurant Create Purpose.");
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
          placeholder="Enter Your Bank Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="branchName"
          type="text"
          label="Branch"
          placeholder="Enter Your Branch Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="holderName"
          type="text"
          label="Account Holder Name"
          placeholder="Enter Account Holder Name"
          containerClassName="lg:col-span-2"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="accountNo"
          type="text"
          label="Account Number"
          placeholder="Enter Your Account Number"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="ifscNo"
          type="text"
          label="IFSC Code"
          placeholder="Enter IFSC Code"
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
