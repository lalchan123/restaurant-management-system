"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordFormInput } from "@/components";
import { useSession } from "next-auth/react";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import sendMail from "@/ApiCallMethod/sendMail";
import { signOut } from "next-auth/react";

const CredentialsManagementForm = async () => {
  const router = useRouter();
  const { data: session } = useSession();
  const credentialsManagementFormSchema = yup.object({
    currentPassword: yup
      .string()
      .required("Please enter your current password"),
    newPassword: yup.string().required("Please enter your new password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(credentialsManagementFormSchema),
  });

  const onSubmit = async (data) => {
    console.log("32 Data:", data);
             
    const payload = {
      "email_or_username_or_phone_number": session?.user?.data[0]?.email,
      "currentPassword": data?.currentPassword,
      "newPassword": data?.newPassword,
      "confirmPassword": data?.confirmPassword,
    }
    
    const apiUrl = `${BaseURL}/account/change-password-by-email/`;
    const response_data = await restAPIPost(apiUrl, payload)
    console.log("166 response_data", response_data)
    if(response_data.status == 200) {
      var message = `Your Password Change Successfully. Please try login your account with your change password.`
    
      const EmailMessage ={
        subject: "Change Password Successfully",
        phone: "01306817790",
        email: session?.user?.data[0]?.email,
        message: message
      }
      const { result: result1, message: message1 } = sendMail(EmailMessage);
      console.log("98 result1", result1);
      console.log("99 message1", message1);
      if (result1 === true) {
        toast.success(response_data?.message);
        async function logoutUser() {
          await signOut({ redirect: false });
          router.push("/auth/login");
        }
        logoutUser();
        
      } else {
        toast.error("Email Send Problem.");
      }
    } else {
      toast.error("Something Problem forget change password by email Purpose.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-4 text-xl font-medium text-default-900">
        Change Password
      </h4>
      <PasswordFormInput
        name="currentPassword"
        label="Current Password"
        containerClassName="mb-4"
        placeholder="Enter your password"
        control={control}
        fullWidth
      />
      <PasswordFormInput
        name="newPassword"
        label="New Password"
        containerClassName="mb-4"
        placeholder="Enter your new password"
        control={control}
        fullWidth
      />
      <PasswordFormInput
        name="confirmPassword"
        label="Confirm Password"
        containerClassName="mb-4"
        placeholder="Enter your confirm password"
        control={control}
        fullWidth
      />
      <div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200  hover:bg-primary-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default CredentialsManagementForm;
