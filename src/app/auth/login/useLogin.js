"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  console.log("18 session", session)

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(loginFormSchema),
    // defaultValues: {
    //   email: "user@coderthemes.com",
    //   password: "password",
    // },
  });

  const changeUserRole = (role) => {
    reset({
      email: role == "user" ? "user@coderthemes.com" : "admin@coderthemes.com",
      password: role == "user" ? "password" : "password",
    });
  };

  useEffect(() => {
    console.log("40 session", session);
    if (session?.user) {
      const redirectLink = searchParams.get("redirectTo");
      const adminRoute = redirectLink?.startsWith("/admin");
      if (session?.user?.data[0]?.user_role_type == "admin") {
        router.push(
          redirectLink && adminRoute ? redirectLink : "/admin/dashboard"
        );
      } else if (session?.user?.data[0]?.user_role_type == "user") {
        router.push(redirectLink && !adminRoute ? redirectLink : "/");
        // router.push(redirectLink && !adminRoute ? redirectLink : "/home");
      }
    }
  }, [session]);

  const login = handleSubmit(async (values) => {
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: values?.email,
      password: values?.password,
    }).then((res) => {
      if (res?.ok) {
        toast.success("Successfully logged in. Redirecting....", {
          position: "top-right",
          duration: 2000,
        });
        // console.log("71 session", session);
        // console.log("72 session?.user?.data[0]?.user_role_type", session?.user?.data[0]?.user_role_type);
        
      } else {
        toast.error(res?.error, { position: "top-right", duration: 2000 });
      }
    });

    // const payload = {
    //   "email_or_username_or_phone_number": values?.email,
    //   "password": values?.password
    // }
    
    // console.log("50 payload", payload)
          
    // // dynamic URL
    // const apiUrl = `${BaseURL}/account/user-login/`;
    // const response_data = await restAPIPost(apiUrl, payload)
    // console.log("166 response_data", response_data)
    // if(response_data.status == 200) {
    //   toast.success("Login Successfully.");
    //   session.user = JSON.stringify(response_data[0]?.data);
      
    //   var MessageTxt = `Hi ${data?.firstName} ${data?.lastName}, 
    //     \Please click on below the link confirm your registration and activation email:
    //     \ ${BaseURL}/course/user-activate-mail/${data?.email}/
    //     `
          
    //   const EmailMessage ={
    //     subject: "You are account Activated Link",
    //     phone: "01306817790",
    //     email: data?.email,
    //     message: MessageTxt
    //   }
    //   const { result, message } = sendMail(EmailMessage);
    //   if (result === true) {
    //     toast.success("Please your email check and activation your account.");
    //     router.push("/auth/login");
    //   } else {
    //     toast.success("Email can't send mail.");
    //   }
    
    // } else {
    //   toast.error(response_data?.response?.data?.message);
    // }

    setLoading(false);
  });

  return { loading, login, control, changeUserRole };
};

export default useLogin;
