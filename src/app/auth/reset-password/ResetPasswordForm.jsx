"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordFormInput } from "@/components";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import sendMail from "@/ApiCallMethod/sendMail";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ResetPasswordForm = async ({ Email }) => {
  const router = useRouter();
  const registerFormSchema = yup.object({
    // oldPassword: yup.string().required("Please enter your old password"),
    // newPassword: yup
    //   .string()
    //   .notOneOf(
    //     [yup.ref("oldPassword")],
    //     "New password should not be same as current password"
    //   )
    //   .required("Please enter your new password"),
    newPassword: yup
      .string()
      .required("Please enter your new password"),
    confirmNewPassword: yup
      .string()
      .oneOf(
        [yup.ref("newPassword")],
        "Confirm Password does not match the new Password"
      )
      .required("Please enter your new password again"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async (data) => {
    console.log("32 Data:", data);
    console.log("41 Email:", Email);
           
    const payload = {
      "email_or_username_or_phone_number": Email,
      "newPassword": data?.newPassword,
      "confirmNewPassword": data?.confirmNewPassword,
    }
    
    const apiUrl = `${BaseURL}/account/forgot-password-change-by-email/`;
    const response_data = await restAPIPost(apiUrl, payload)
    console.log("166 response_data", response_data)
    if(response_data.status == 200) {
      var message = `Your Password Change Successfully. Please try login your account with your change password.`
  
      const EmailMessage ={
        subject: "Forget Reset Password Change Successfully",
        phone: "01306817790",
        email: Email,
        message: message
      }
      const { result: result1, message: message1 } = sendMail(EmailMessage);
      console.log("98 result1", result1);
      console.log("99 message1", message1);
      if (result1 === true) {
        toast.success(response_data?.message);
        router.push("/auth/login");
      } else {
        toast.error("Email Send Problem.");
      }
    } else {
      toast.error("Something Problem forget change password by email Purpose.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <PasswordFormInput
        name="oldPassword"
        control={control}
        label="Current Password"
        labelClassName="block text-sm font-medium text-default-900 mb-2"
        containerClassName="mb-6"
        fullWidth
      /> */}

      <PasswordFormInput
        name="newPassword"
        control={control}
        label="New Password"
        labelClassName="block text-sm font-medium text-default-900 mb-2"
        containerClassName="mb-6"
        fullWidth
      />

      <PasswordFormInput
        name="confirmNewPassword"
        control={control}
        label="Confirm New Password"
        labelClassName="block text-sm font-medium text-default-900 mb-2"
        containerClassName="mb-6"
        fullWidth
      />

      <button
        type="submit"
        // className="w-full rounded-lg bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-500"
        className="w-full rounded-lg bg-green-500 px-6 py-3 text-base capitalize text-white transition-all hover:bg-green-500"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
