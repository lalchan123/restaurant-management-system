"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextAreaFormInput, TextFormInput } from "@/components";
import { useSession } from "next-auth/react";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import { useRouter } from "next/navigation";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import sendMail from "@/ApiCallMethod/sendMail";
import { toast } from "sonner";

const ContactForm = () => {
  const { data: session } = useSession();
  const uniqueKey = generateUniqueKey();
  const router = useRouter();

  const contactFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    // subject: yup.string().required("Please enter your subject"),
    message: yup.string().required("Please enter your message"),
    fName: yup.string().required("Please enter your First name"),
    lName: yup.string().required("Please enter your Last Name"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(contactFormSchema),
  });


  const onSubmit = async (data) => {
    console.log("32 Data:", data);
       
    const payload = {
      "mode": "create",
      "user_id": session?.user?.id,
      "table_id": 46,
      "table_ref_id": uniqueKey,
      "data": [
        {
          "table_id": 46,
          "table_col_id": 1,
          "column_data": data?.fName,
          "column_name": "First_Name",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 46,
          "table_col_id": 2,
          "column_data": data?.lName,
          "column_name": "Last_Name",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 46,
          "table_col_id": 3,
          "column_data": data?.email,
          "column_name": "Email",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 46,
          "table_col_id": 4,
          "column_data": data?.message,
          "column_name": "Message",
          "table_ref_id": uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        }
      ]
    }

    const apiUrl = `${BaseURL}/account/dynamic-table-create-api/`;
    const response_data = await restAPIPost(apiUrl, payload)
    console.log("166 response_data", response_data)
    if(response_data.status == 200) {
      var message = `Name: ${data?.fName} ${data?.lName}
        \Email: ${data?.email}
        \Message: ${data?.message}
        `

      const EmailMessage ={
        subject: "Contact US",
        phone: "01306817790",
        email: "lalchanbadsabd@gmail.com",
        message: message
      }
      const { result: result1, message: message1 } = sendMail(EmailMessage);
      console.log("98 result1", result1);
      console.log("99 message1", message1);
      if (result1 === true) {
        reset();
        toast.success("Contact US Submitted Successfully.");
      } else {
        toast.error("Email Send Problem.");
      }
    } else {
      toast.error("Something Problem Contact US Create Purpose.");
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 lg:grid-cols-2">
        <TextFormInput
          name="fName"
          label="First Name"
          type="text"
          placeholder="First Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="lName"
          type="text"
          label="Last Name"
          placeholder="Last Name"
          control={control}
          fullWidth
        />
        <TextFormInput
          name="email"
          label="E-mail"
          type="email"
          placeholder="Enter Your Email"
          control={control}
          fullWidth
          containerClassName="lg:col-span-2"
        />
        <TextAreaFormInput
          name="message"
          label="Message"
          rows={5}
          className="bg-transparent"
          placeholder="Enter Your Message"
          control={control}
          containerClassName="lg:col-span-2"
          fullWidth
        />
        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-10 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
