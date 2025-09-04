"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "sonner";
import { PasswordFormInput, TextFormInput } from "@/components";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import sendMail from "@/ApiCallMethod/sendMail";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const registerFormSchema = yup.object({
    firstName: yup.string().required("Please enter your First Name"),
    lastName: yup.string().required("Please enter your Last Name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
    // defaultValues: {
    //   firstName: "First Name",
    //   lastName: "Last Name",
    //   email: "user@demo.com",
    //   password: "password",
    // },
  });

  const onSubmit = async (data) => {
    console.log("31 Data:", data);
   
    const payload = {
      "first_name": data?.firstName,
      "last_name": data?.lastName,
      "email": data?.email,
      "username": "",
      "phone_number": "",
      "password": data?.password,
      "user_role_type": "user",
      "create_by": "",
      "required": {
        "email": "email",
        "username": "",
        "phone_number": ""
      }
    }

    console.log("50 payload", payload)
      
    // dynamic URL
    const apiUrl = `${BaseURL}/account/user-role-base-register/`;
    const response_data = await restAPIPost(apiUrl, payload)
    console.log("166 response_data", response_data)
    if(response_data.status == 200) {
      toast.success("User Account Created Successfully.");
      var MessageTxt = `Hi ${data?.firstName} ${data?.lastName}, 
      \Please click on below the link confirm your registration and activation email:
      \ ${BaseURL}/course/user-activate-mail/${data?.email}/
      `
      
      const EmailMessage ={
        subject: "You are account Activated Link",
        phone: "01306817790",
        email: data?.email,
        message: MessageTxt
      }
      const { result, message } = sendMail(EmailMessage);
      if (result === true) {
        toast.success("Please your email check and activation your account.");
        router.push("/auth/login");
      } else {
        toast.success("Email can't send mail.");
      }

    } else {
      toast.error("Something Problem Face For User Account Create Purpose.");
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFormInput
        name="firstName"
        control={control}
        type="text"
        placeholder="Enter your First Name"
        containerClassName="mb-6"
        label="First Name"
        fullWidth
      />
      <TextFormInput
        name="lastName"
        control={control}
        type="text"
        placeholder="Enter your Last Name"
        containerClassName="mb-6"
        label="Last Name"
        fullWidth
      />

      <TextFormInput
        name="email"
        control={control}
        type="email"
        placeholder="Enter your email"
        containerClassName="mb-6"
        label="Email"
        fullWidth
      />

      <PasswordFormInput
        name="password"
        control={control}
        label="Password"
        containerClassName="mb-6"
        fullWidth
      />

      <button
        type="submit"
        // className="w-full rounded-lg bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-500"
        className="w-full rounded-lg bg-green-500 px-6 py-3 text-base capitalize text-white transition-all hover:bg-green-500"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
