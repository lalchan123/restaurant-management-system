"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TextFormInput } from "@/components";
import { BaseURL, FrontEndBaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import sendMail from "@/ApiCallMethod/sendMail";
import { toast } from "sonner";

const ForgotPasswordForm = async() => {
  const registerFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async (data) => {
    console.log("32 Data:", data);
         
    const payload = {
      "email_or_username_or_phone_number": data?.email
    }
  
    const apiUrl = `${BaseURL}/account/forgot-password-email-send-and-check/`;
    const response_data = await restAPIPost(apiUrl, payload)
    console.log("166 response_data", response_data)
    if(response_data.status == 200) {
      var message = `Hi, click on the link to reset your password: ${FrontEndBaseURL}/auth/reset-password/${data?.email}`

      const EmailMessage ={
        subject: "Forget Reset Password Link",
        phone: "01306817790",
        email: data?.email,
        message: message
      }
      const { result: result1, message: message1 } = sendMail(EmailMessage);
      console.log("98 result1", result1);
      console.log("99 message1", message1);
      if (result1 === true) {
        toast.success("Please your email check for your reset password.");
      } else {
        toast.error("Email Send Problem.");
      }
    } else {
      toast.error("Something Problem forget password email send and check Purpose.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFormInput
        name="email"
        control={control}
        type="text"
        placeholder="Enter your email"
        label="Email"
        containerClassName="mb-6"
        fullWidth
      />
      {/* <button className="w-full rounded-lg bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-500"> */}
      <button className="w-full rounded-lg bg-green-500 px-6 py-3 text-base capitalize text-white transition-all hover:bg-green-600">
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
