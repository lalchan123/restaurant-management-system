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
import axios from 'axios';
import { toast } from "sonner";
// styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useSession } from "next-auth/react";
import { BaseURL } from "@/ApiCallMethod/Constants";
import { useEffect, useState } from "react";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { getAPIPostDataByRefId } from "@/helpers";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
);

const PersonalDetailForm = () => {

  const { data: session } = useSession();
  const [userProfileData, setUserProfileData] = useState([]);
  
  // useEffect(() => {
  //    const fetchData = async () => {
  //     try {
  //       await DataFetch();
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //     }
  //   };
  //   fetchData();
  // }, [])
  
  // const DataFetch = async () => {
  //   const userProfileData1 = await getAPIPostDataByRefId(47, "", session?.user?.data[0]?.user_id);
  //   // console.log("39 userProfileData", userProfileData)
  //   setUserProfileData(userProfileData1?.data)
  //   // setColumns(dishesDataList?.column_name);
  //   // setDishesData(dishesDataList?.data);
  // }

  // console.log("46 userProfileData", userProfileData)
  // console.log("46 userProfileData[0]?.first_name", userProfileData[0]?.first_name)
  // console.log("46 userProfileData[0]", userProfileData[0]?.first_name)
  
  // const userProfileData = await getAPIPostDataByRefId(47, "", session?.user?.data[0]?.user_id);
  // console.log("44 userProfileData", userProfileData);

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

  // const defaultValue = {
  //   fName: userProfileData[0]?.first_name ,
  //   lName: userProfileData[0]?.last_name,
  //   userName: userProfileData[0]?.username,
  //   email: userProfileData[0]?.email,
  //   phoneNo: userProfileData[0]?.phone_number,
  //   country: {
  //     value: userProfileData[0]?.country,
  //     label: userProfileData[0]?.country,
  //   },
  //   state: {
  //     value: userProfileData[0]?.state,
  //     label: userProfileData[0]?.state,
  //   },
  //   zipCode: {
  //     value: userProfileData[0]?.zipcode,
  //     label: userProfileData[0]?.zipcode,
  //   },
  // };

  // const { control, handleSubmit } = useForm({
  //   resolver: yupResolver(personalDetailsFormSchema),
  //   defaultValues: defaultValue,
  // });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(personalDetailsFormSchema),
    defaultValues: {
      fName: "",
      lName: "",
      userName: "",
      email: "",
      phoneNo: "",
      country: null,
      state: null,
      zipCode: null,
    },
  });

  // Fetch user profile data
  useEffect(() => {
    fetchData();
  }, [session, reset]);

   const fetchData = async () => {
      try {
        const userProfileData1 = await getAPIPostDataByRefId(
          47,
          "",
          session?.user?.data[0]?.user_id
        );
        setUserProfileData(userProfileData1?.data || []);

        // ✅ Reset form values once data is fetched
        if (userProfileData1?.data?.length > 0) {
          const u = userProfileData1.data[0];
          reset({
            fName: u?.first_name || "",
            lName: u?.last_name || "",
            userName: u?.username || "",
            email: u?.email || "",
            phoneNo: u?.phone_number || "",
            country: u?.country ? { value: u.country, label: u.country } : null,
            state: u?.state ? { value: u.state, label: u.state } : null,
            zipCode: u?.zipcode ? { value: u.zipcode, label: u.zipcode } : null,
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  


  const [profileImage, setProfileImage] = useState([]);

  console.log("81 profileImage", profileImage);
  console.log("82 profileImage[0].file", profileImage[0]?.file);
  // console.log("83 profileImage.files[0]", profileImage.files[0]);
  // console.log("82 URL.createObjectURL(profileImage[0].file)", URL?.createObjectURL(profileImage[0]?.file));

  const onSubmit = async (data) => {
    console.log("32 Data:", data);
    console.log("89 profileImage:", profileImage);
    console.log("90 profileImage[0]?.file:", profileImage[0]?.file);
    console.log("91 profileImage[0]?.file?.name", profileImage[0]?.file?.name);
    if (profileImage && profileImage.length > 0 && profileImage[0]?.file) {
      const formData = new FormData();
      formData.append("file", profileImage[0]?.file, profileImage[0]?.file?.name);

      axios.post(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        // onUploadProgress: (e) => {
        //   progress(e.lengthComputable, e.loaded, e.total);
        // }
      })
      .then(res => {
        console.log("106 ProfileImage Upload success:", res.data.filePath);
        localStorage.setItem("ProfileImage", res.data.filePath);
        // setFilePathImage(res.data.filePath);

      })
      .catch(err => {
        console.error("Upload error:", err.message);
      });

      // console.log("114 filePathImage lalchan", filePathImage);
      console.log("115 profileImage lalchan", localStorage.getItem("ProfileImage"));
      // const profileImage1 = localStorage.getItem("ProfileImage");
      setTimeout(async () => {
        const payload = {
          "user_id": session?.user?.data[0]?.user_id,
          "first_name": data?.fName,
          "last_name": data?.lName,
          "email": data?.email,
          "username": data?.userName,
          "phone_number": data?.phoneNo,
          "country": data?.country?.value,
          "state": data?.state?.value,
          "zipcode": data?.zipCode?.value,
          "user_profile_picture": localStorage.getItem("ProfileImage")
        };

        const apiUrl = `${BaseURL}/account/user-profile-update/`;
        const response_data = await restAPIPost(apiUrl, payload);
        console.log("166 response_data", response_data);

        if (response_data.status == 200) {
          toast.success("User Profile Updated Successfully.");
          localStorage.clear();
          fetchData();
          window.location.reload();
          // router.push("/admin/dishes");
        } else {
          toast.error("Something Problem Face For User Profile Update Purpose.");
        }
      }, 5000); // 5000ms = 5 seconds

    } else {
      // console.log("Hello Lalchan");
      const payload={
        "user_id":session?.user?.data[0]?.user_id,
        "first_name": data?.fName,
        "last_name": data?.lName,
        "email": data?.email,
        "username": data?.userName,
        "phone_number": data?.phoneNo,
        "country": data?.country?.value,
        "state": data?.state?.value,
        "zipcode": data?.zipCode?.value,
        "user_profile_picture":  ""
      }
      const apiUrl = `${BaseURL}/account/user-profile-update/`;
      const response_data = await restAPIPost(apiUrl, payload)
      console.log("166 response_data", response_data)
      if(response_data.status == 200) {
        toast.success("User Profile Updated Successfully.");
        localStorage.clear();
        fetchData();
        window.location.reload();
        // router.push("/admin/dishes");
      } else {
        toast.error("Something Problem Face For User Profile Update Purpose.");
      }
    }
  }

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
                  // src={`${BaseURL}${session?.user?.data[0]?.user_profile_picture}`}
                  src={`${BaseURL}${userProfileData[0]?.user_profile_picture}`}
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
              onSubmit={handleSubmit(onSubmit)}
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
