"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import { SelectFormInput, TextFormInput } from "@/components";

// styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useSession } from "next-auth/react";
import { BaseURL } from "@/ApiCallMethod/Constants";
import { useEffect, useState } from "react";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
);

const PersonalDetailForm = () => {

  const { data: session } = useSession();
  

  const personalDetailsFormSchema = yup.object({
    fName: yup.string().required("Please enter your first name"),
    lName: yup.string().required("Please enter your last Name"),
    userName: yup.string().required("Please enter your user Name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    phoneNo: yup.string().required("Please enter your Phone NO."),
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
    })
  });

  const defaultValue = {
    fName: session?.user?.data[0]?.first_name,
    lName: session?.user?.data[0]?.last_name,
    userName: session?.user?.data[0]?.username,
    email: session?.user?.data[0]?.email,
    phoneNo: session?.user?.data[0]?.phone_number,
    country: {
      value: session?.user?.data[0]?.country,
      label: session?.user?.data[0]?.country,
    },
    state: {
      value: session?.user?.data[0]?.state,
      label: session?.user?.data[0]?.state,
    },
    zipCode: {
      value: session?.user?.data[0]?.zipcode,
      label: session?.user?.data[0]?.zipcode,
    },
  };

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(personalDetailsFormSchema),
    defaultValues: defaultValue,
  });

  const [profileImage, setProfileImage] = useState([]);

  console.log("81 profileImage", profileImage);
  console.log("82 profileImage[0].file", profileImage[0]?.file);
  // console.log("82 URL.createObjectURL(profileImage[0].file)", URL?.createObjectURL(profileImage[0]?.file));

  return (
    <div className="mb-6 rounded-lg border border-default-200 p-6">
      <div>
        <h4 className="mb-4 text-xl font-medium text-default-900">
          Personal Details
        </h4>
        <div className="grid gap-6 xl:grid-cols-5">
          <div className="xl:col-span-1">
            <div className="mx-auto">
              <FilePond
                className="mx-auto h-44 w-44 lg:h-48 lg:w-48 "
                labelIdle="Add Photo"
                imagePreviewHeight={110}
                imageCropAspectRatio="1:1"
                stylePanelLayout="compact circle"
                styleButtonRemoveItemPosition="center bottom"
                files={profileImage}
                onupdatefiles={setProfileImage}
                allowMultiple={false}
                maxFiles={1}
              />
            </div>
            {
              profileImage.length > 0 ? (
                <Image
                  src={URL.createObjectURL(profileImage[0].file)}
                  alt="burrito"
                  width={200}
                  height={75}
                  className="mx-auto w-200 h-75 object-cover rounded-full border mt-2"
                />
              ): (
                <Image
                  src={`${BaseURL}${session?.user?.data[0]?.user_profile_picture}`}
                  alt="burrito"
                  width={200}
                  height={75}
                  className="mx-auto w-200 h-75 object-cover rounded-full border mt-2"
                />
              )
            }
            
          </div>
          <div className="xl:col-span-4">
            <form
              onSubmit={handleSubmit(() => {})}
              className="grid gap-6 lg:grid-cols-2"
            >
              <TextFormInput
                name="fName"
                label="First Name"
                type="text"
                placeholder="Enter Your First Name"
                control={control}
                fullWidth
              />
              <TextFormInput
                name="lName"
                label="Last Name"
                type="text"
                placeholder="Enter Your Last Name"
                control={control}
                fullWidth
              />
              <TextFormInput
                name="userName"
                label="User Name"
                type="text"
                placeholder="Enter Your User Name"
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
                label="Country"
                control={control}
                id="billing-country2"
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
                id="billing-state-province2"
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
                id="billing-zip-code2"
                instanceId="billing-zip-code"
                options={[
                  { value: 356123, label: "356123" },
                  { value: 350115, label: "350115" },
                  { value: 350125, label: "350125" },
                  { value: 350135, label: "350135" },
                  { value: 350145, label: "350145" },
                ]}
              />
              <div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailForm;
