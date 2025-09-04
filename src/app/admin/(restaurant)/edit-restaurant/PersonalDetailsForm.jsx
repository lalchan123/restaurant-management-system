"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuSave, LuUndo } from "react-icons/lu";
import {
  DateFormInput,
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PersonalDetailsForm = () => {
  const router = useRouter();
  const personalDetailsFormSchema = yup.object({
    fName: yup.string().required("Please enter your first name"),
    lName: yup.string().required("Please enter your last Name"),
    contactNO: yup.string().required("Please enter your contact Number"),
    panNo: yup.string().required("Please enter your PAN NO."),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    birthDate: yup.string().required("Please select your Birth Date"),
    city: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    country: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    zipCode: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    description: yup.string().required("Please Enter your description"),
  });

  const localRestaurantData = JSON.parse(localStorage.getItem("restaurantData"));
  console.log("40 localRestaurantData", localRestaurantData)

  const defaultValue = {
    fName: localRestaurantData[0]?.First_Name,
    lName: localRestaurantData[0]?.Last_Name,
    contactNO: localRestaurantData[0]?.Step1_Contact_Number,
    panNo: localRestaurantData[0]?.Pan_Card_Number,
    email: localRestaurantData[0]?.Step1_Email,
    birthDate: localRestaurantData[0]?.Birth_of_Date,
    city: {
      value: localRestaurantData[0]?.City,
      label: localRestaurantData[0]?.City,
    },
    country: {
      value: localRestaurantData[0]?.Country_Region,
      label: localRestaurantData[0]?.Country_Region,
    },
    zipCode: {
      value: localRestaurantData[0]?.Zip_Postal_Code,
      label: localRestaurantData[0]?.Zip_Postal_Code,
    },
    description:localRestaurantData[0]?.Step1_Description
  };
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(personalDetailsFormSchema),
    defaultValues: defaultValue,
  });

  const undoChanges = () => {
    reset(defaultValue);
    router.push("/admin/restaurants");
  };

  const onSubmit = async (data) => {
    localStorage.setItem("PersonalDetail", JSON.stringify(data))
    toast.success("Personal Detail Information Save Successfully.")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="tabPersonalDetail"
      role="tabpanel"
    >
      <h4 className="mb-6 text-lg font-medium text-default-900">Step 1:</h4>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <TextFormInput
          name="fName"
          type="text"
          label="First Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="lName"
          type="text"
          label="Last Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="contactNO"
          type="text"
          label="Contact Number"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="panNo"
          type="text"
          label="PAN Card Number"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="email"
          type="email"
          label="Email"
          control={control}
          fullWidth
        />
        <DateFormInput
          name="birthDate"
          type="date"
          label="Birth of Date"
          className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
          options={{
            dateFormat: "d/m/Y",
          }}
          fullWidth
          control={control}
        />
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <SelectFormInput
          name="city"
          label="City"
          control={control}
          id="billing-city"
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
          name="country"
          label="Country/Region"
          control={control}
          id="billing-country"
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
          name="zipCode"
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
        <TextAreaFormInput
          name="description"
          label="Description"
          rows={5}
          containerClassName="lg:col-span-3"
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
          // className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-600"
        >
          <LuSave size={20} />
          Save
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
