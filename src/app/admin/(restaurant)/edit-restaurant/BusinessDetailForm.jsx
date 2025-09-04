"use client";
import { LuSave, LuUndo } from "react-icons/lu";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextAreaFormInput, TextFormInput } from "@/components";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const BusinessDetailForm = () => {
  const router = useRouter();
  const businessDetailsFormSchema = yup.object({
    businessName: yup.string().required("Please enter your business name"),
    businessType: yup.string().required("Please enter your business type"),
    contactNO: yup.string().required("Please enter your contact Number"),
    gstNo: yup.string().required("Please enter your GST NO."),
    website: yup.string().required("Please enter website url"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    description: yup.string().required("Please Enter your description"),
  });

  const localRestaurantData = JSON.parse(localStorage.getItem("restaurantData"));

  const defaultValue = {
    businessName: localRestaurantData[0]?.Business_Name,
    businessType: localRestaurantData[0]?.Business_Type,
    contactNO: localRestaurantData[0]?.Step2_Contact_Number,
    gstNo: localRestaurantData[0]?.GST_Number,
    website: localRestaurantData[0]?.Website,
    email: localRestaurantData[0]?.Step2_Email,
    description:localRestaurantData[0]?.Step2_Description,
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
    localStorage.setItem("BusinessDetail", JSON.stringify(data));
    toast.success("Business Detail Information Save Successfully.")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="tabBusinessDetail"
      className="hidden"
      role="tabpanel"
    >
      <h4 className="mb-6 text-lg font-medium text-default-900">Step 2:</h4>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <TextFormInput
          name="businessName"
          type="text"
          label="Business Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="businessType"
          type="text"
          label="Business Type"
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
          name="gstNo"
          type="text"
          label="GST Number"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="website"
          type="text"
          label="Website"
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
        <TextAreaFormInput
          name="description"
          label="Description"
          placeholder="Enter Description"
          rows={5}
          containerClassName="lg:col-span-2"
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

export default BusinessDetailForm;
