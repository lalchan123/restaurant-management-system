"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuCreditCard, LuDollarSign } from "react-icons/lu";
import { amazonPaymentImg, paypal2PaymentImg } from "@/assets/data/images";
import {
  DateFormInput,
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";
import OrderSummary from "./OrderSummary";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import { useRouter } from "next/navigation";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { useShoppingContext } from "@/context";
import sendMail from "@/ApiCallMethod/sendMail";
import { getAPIPostDataByRefId } from "@/helpers";

const BillingInformation = () => {

  const { data: session } = useSession();
  const uniqueKey = generateUniqueKey();
  const router = useRouter();

  const { cartItems, getCalculatedOrder, removeAllCart } = useShoppingContext();

  const [restuarantRefId, setRestuarantRefId] = useState("");

  const billingFormSchema = yup.object({
    fname: yup.string().required("Please enter your user name"),
    lName: yup.string().required("Please enter your Last Name"),
    companyName: yup.string().optional(),
    address: yup.string().required("Please enter your Address"),
    country: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    state: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    city: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    zipCode: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    phoneNo: yup.string().required("Please enter your Phone NO."),
    // paymentOption: yup.string().required("Please enter Payment Option."),
    nameOnCard: yup.string().required("Please enter your Name."),
    cardNo: yup
      .number()
      // .min(16, "Card number should consist of 16 digits")
      // .max(17, "Card number should not exceed 16 digits")
      .required("Please enter your Card No."),
    expiryDate: yup.date().required("Please enter Expire date"),
    cvvNo: yup
      .number()
      // .max(4, "CVV number should not exceed 4 digits")
      // .min(3, "CVV number should consist minimum 3 digits")
      .required("Please enter CVV Number"),
    message: yup.string().optional(),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(billingFormSchema),
  });

  const [paymentMethod, setPaymentMethod] = useState("paymentCashONDelivery");

  const onSubmit = async (data) => {
    console.log("67 Billing Data:", data);
    console.log("68 paymentMethod:", paymentMethod);
    
    const billing_uniqueKey = generateUniqueKey()+"101";
    console.log("88 billing_uniqueKey", billing_uniqueKey);
    const order_product_uniqueKey = generateUniqueKey()+"201";
    console.log("89 order_product_uniqueKey", order_product_uniqueKey);
  
    const payload = {
      "mode": "create",
      "user_id": session?.user?.id,
      "table_id": 43,
      "table_ref_id": billing_uniqueKey,
      "data": [
        {
          "table_id": 43,
          "table_col_id": 1,
          "column_data": data?.fname,
          "column_name": "CB_First_Name",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 2,
          "column_data": data?.lName,
          "column_name": "CB_Last_Name",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 3,
          "column_data": data?.companyName,
          "column_name": "CB_Company_Name",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 4,
          "column_data": data?.address,
          "column_name": "CB_Address",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 5,
          "column_data": data?.country?.value,
          "column_name": "CB_Country",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 6,
          "column_data": data?.state?.value,
          "column_name": "CB_State_Province",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 7,
          "column_data": data?.city?.value,
          "column_name": "CB_City",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 8,
          "column_data": data?.zipCode?.value,
          "column_name": "CB_ZIP_Postal_Code",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 9,
          "column_data": data?.email,
          "column_name": "CB_Email",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 10,
          "column_data": data?.phoneNo,
          "column_name": "CB_Phone_Number",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 11,
          "column_data": paymentMethod,
          "column_name": "CB_Payment_Option",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 12,
          "column_data": data?.nameOnCard,
          "column_name": "CB_Name_on_Card",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 13,
          "column_data": data?.cardNo,
          "column_name": "CB_Card_Number",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 14,
          "column_data": data?.expiryDate,
          "column_name": "CB_Expire_Date",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 15,
          "column_data": data?.cvvNo,
          "column_name": "CB_CVV",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 43,
          "table_col_id": 16,
          "column_data": data?.message,
          "column_name": "CB_Message",
          "table_ref_id": billing_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        } 
      ]
    }
    
    cartItems?.map((item) => {
      console.log("93 item", item);
      const dish = item.dish;
      const quantity = cartItems.find((cartItem) => cartItem.dish_id == item.dish_id)?.quantity ?? 1;
      var List1 = [
        {
          "table_id": 45,
          "table_col_id": 1,
          "column_data": dish?.Product_Name,
          "column_name": "Product_Name",
          "table_ref_id": order_product_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 45,
          "table_col_id": 2,
          "column_data": dish?.main_image_path,
          "column_name": "Product_Image_Path",
          "table_ref_id": order_product_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 45,
          "table_col_id": 3,
          "column_data": quantity,
          "column_name": "Quantity",
          "table_ref_id": order_product_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 45,
          "table_col_id": 4,
          "column_data": dish?.Selling_Price,
          "column_name": "Price",
          "table_ref_id": order_product_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 45,
          "table_col_id": 5,
          "column_data": parseInt(quantity) * parseInt(dish?.Selling_Price),
          "column_name": "Total",
          "table_ref_id": order_product_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        },
        {
          "table_id": 45,
          "table_col_id": 6,
          "column_data": dish?.Restuarant_Name,
          "column_name": "Restaurant_Name",
          "table_ref_id": order_product_uniqueKey,
          "tab_rel_id": "",
          "user_id": session?.user?.id
        }
      ]

      setRestuarantRefId(dish?.Restuarant_Name);

      payload?.data?.push(...List1);
    })

    var orderProductList = [
      {
        "table_id": 44,
        "table_col_id": 1,
        "column_data": order_product_uniqueKey,
        "column_name": "Product_Rel_Id",
        "table_ref_id": uniqueKey,
        "tab_rel_id": "",
        "user_id": session?.user?.id
      },
      {
        "table_id": 44,
        "table_col_id": 2,
        "column_data": billing_uniqueKey,
        "column_name": "Ck_Billing_Rel_Id",
        "table_ref_id": uniqueKey,
        "tab_rel_id": "",
        "user_id": session?.user?.id
      },
      {
        "table_id": 44,
        "table_col_id": 3,
        "column_data": getCalculatedOrder().orderTotal.toFixed(2),
        "column_name": "SubTotal",
        "table_ref_id": uniqueKey,
        "tab_rel_id": "",
        "user_id": session?.user?.id
      },
      {
        "table_id": 44,
        "table_col_id": 4,
        "column_data": "Free",
        "column_name": "Shipping",
        "table_ref_id": uniqueKey,
        "tab_rel_id": "",
        "user_id": session?.user?.id
      },
      {
        "table_id": 44,
        "table_col_id": 5,
        "column_data": getCalculatedOrder().totalDiscount.toFixed(2),
        "column_name": "Discount",
        "table_ref_id": uniqueKey,
        "tab_rel_id": "",
        "user_id": session?.user?.id
      },
      {
        "table_id": 44,
        "table_col_id": 6,
        "column_data": getCalculatedOrder().tax.toFixed(2),
        "column_name": "Tax",
        "table_ref_id": uniqueKey,
        "tab_rel_id": "",
        "user_id": session?.user?.id
      },
      {
        "table_id": 44,
        "table_col_id": 7,
        "column_data": getCalculatedOrder().total.toFixed(2),
        "column_name": "Total",
        "table_ref_id": uniqueKey,
        "tab_rel_id": "",
        "user_id": session?.user?.id
      },
      {
        "table_id": 44,
        "table_col_id": 8,
        "column_data": "Paid",
        "column_name": "Status",
        "table_ref_id": uniqueKey,
        "tab_rel_id": "",
        "user_id": session?.user?.id
      }
    ]

    payload?.data?.push(...orderProductList);

    // console.log("307 payload", payload);
    if (paymentMethod === "paymentCashONDelivery") {
      // dynamic URL
      const apiUrl = `${BaseURL}/account/dynamic-table-create-api/`;
      const response_data = await restAPIPost(apiUrl, payload)
      console.log("166 response_data", response_data)
      if(response_data.status == 200) {
        console.log("392 Save response_data", response_data?.data)
        localStorage.setItem("OrderInformation", JSON.stringify(response_data?.data));
        const d = new Date();

        const restaurantsData = await getAPIPostDataByRefId(40, restuarantRefId, "0");
        console.log("401 restaurantsData", restaurantsData);
        console.log("401 restaurantsData?.data?.[0]", restaurantsData?.data?.[0]);
        
        var restaurantText = `\nRestaurant Information: 
        \Restaurant Name: ${restaurantsData?.data?.[0]?.First_Name} ${restaurantsData?.data?.[0]?.Last_Name}
        \Email: ${restaurantsData?.data?.[0]?.Step1_Email}
        \Phone No: ${restaurantsData?.data?.[0]?.Step1_Contact_Number}
        \Website: ${restaurantsData?.data?.[0]?.Website}
        \Address: ${restaurantsData?.data?.[0]?.City}, ${restaurantsData?.data?.[0]?.Country_Region}, ${restaurantsData?.data?.[0]?.Zip_Postal_Code} 
        `

        var billText = `\nShipping Information: 
        \Name: ${data?.fname} ${data?.lName}
        \Email: ${data?.email}
        \Phone No: ${data?.phoneNo}
        \Address: ${data?.address}, ${data?.city?.value}, ${data?.state?.value}, ${data?.zipCode?.value}, ${data?.country?.value}
        `
        var mText = '\n\nProduct Name \t\t\t Quantity \t\t\t Price \t\t\t Total \n';
        cartItems?.map((item) => {
          // console.log("93 item", item);
          const dish = item.dish;
          const quantity = cartItems.find((cartItem) => cartItem.dish_id == item.dish_id)?.quantity ?? 1;
          mText+=`${dish?.Product_Name}\t\t\t ${quantity} \t\t\t ${dish?.Selling_Price} \t\t\t ${parseInt(quantity) * parseInt(dish?.Selling_Price)} \n`
        })

        var SubTotalTxt = `\nSubTotal: ${getCalculatedOrder().orderTotal.toFixed(2)}
          \Shipping: 'Free'
          \Discount: ${getCalculatedOrder().totalDiscount.toFixed(2)}
          \Tax: ${getCalculatedOrder().tax.toFixed(2)}
          \Total: ${getCalculatedOrder().total.toFixed(2)}
          `

        const EmailMessage ={
          subject: "Order Confirmation Mail And Order Summary",
          phone: "01306817790",
          email: data?.email,
          message: restaurantText + billText + mText + SubTotalTxt
        }
        const { result, message } = sendMail(EmailMessage);
        
        const EmailMessage1 ={
          subject: "Order Confirmation Mail And Order Summary",
          phone: "01306817790",
          email: restaurantsData?.data?.[0]?.Step1_Email,
          message: restaurantText + billText + mText + SubTotalTxt
        }
        const { result: result2, message: message2 } = sendMail(EmailMessage1);
        removeAllCart();
        reset()
        // router.push(`/invoice/${uniqueKey}/${session?.user?.id}`);
        toast.success("Order Created and Confirmation Successfully.");
      } else {
        toast.error("Something Problem Face For Order Create Purpose.");
      }
    } else if (paymentMethod === "paymentPaypal") {
      toast.error("Please paymentPaypal.");
    } else if (paymentMethod === "paymentAmazonPay") {
      toast.error("Please paymentAmazonPay.");
    } else if (paymentMethod === "paymentCard") {
      toast.error("Please paymentCard.");
    } else {
      toast.error("Please select a payment method.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      <div className="col-span-1 lg:col-span-2">
        <div className="mb-8">
          <h4 className="mb-6 text-lg font-medium text-default-800">
            Billing Information
          </h4>
          <div className="grid gap-6 lg:grid-cols-4">
            <TextFormInput
              name="fname"
              type="text"
              label="First name"
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
              name="companyName"
              type="text"
              label="Company Name (Optional)"
              placeholder="Company Name"
              containerClassName="lg:col-span-2"
              control={control}
              fullWidth
            />

            <TextAreaFormInput
              name="address"
              label="Address"
              placeholder="Enter Your Address"
              containerClassName="lg:col-span-4"
              control={control}
              fullWidth
            />

            <SelectFormInput
              name="country"
              label="Country"
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
              name="state"
              label="State/Province"
              control={control}
              id="billing-state-province"
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
              name="zipCode"
              label="ZIP/Postal Code"
              control={control}
              id="billing-zip-code"
              instanceId="billing-zip-code"
              options={[
                { value: 356123, label: "356123" },
                { value: 350115, label: "350115" },
                { value: 350125, label: "350125" },
                { value: 350135, label: "350135" },
                { value: 350145, label: "350145" },
              ]}
            />

            <TextFormInput
              name="email"
              type="text"
              label="Email"
              className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
              placeholder="example@example.com"
              containerClassName="lg:col-span-2"
              control={control}
            />

            <TextFormInput
              name="phoneNo"
              type="text"
              label="Phone Number"
              className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
              placeholder="+1  123-XXX-7890"
              containerClassName="lg:col-span-2"
              control={control}
            />

            <div className="flex items-center">
              <input
                id="shipmentAddress"
                className="h-5 w-5 rounded border-default-200 bg-transparent text-primary focus:ring-0"
                type="checkbox"
                placeholder="+1  123-XXX-7890"
              />
              <label
                htmlFor="shipmentAddress"
                className="ms-2 block text-sm text-default-700"
              >
                Ship into different address{" "}
              </label>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h4 className="mb-6 text-lg font-medium text-default-800">
            Payment Option
          </h4>
          <div className="mb-5 rounded-lg border border-default-200 p-6 lg:w-5/6">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <div className="p-6 text-center">
                <label
                  htmlFor="paymentCOD"
                  className="mb-4 flex flex-col items-center justify-center"
                >
                  <LuDollarSign className="mb-4 text-primary" size={24} />
                  <h5 className="text-sm font-medium text-default-700">
                    Cash on Delivery
                  </h5>
                </label>
                <input
                  id="paymentCOD"
                  className="h-5 w-5 border-default-200 bg-transparent text-primary focus:ring-0"
                  type="radio"
                  name="paymentOption"
                  onChange={(e) => {
                    setPaymentMethod("paymentCashONDelivery");
                  }}
                  defaultChecked
                />
              </div>
              <div className="p-6 text-center">
                <label
                  htmlFor="paymentPaypal"
                  className="mb-4 flex flex-col items-center justify-center"
                >
                  <Image
                    src={paypal2PaymentImg}
                    className="mb-4 h-6 w-6"
                    alt="paypal"
                  />
                  <h5 className="text-sm font-medium text-default-700">
                    Paypal
                  </h5>
                </label>
                <input
                  id="paymentPaypal"
                  className="h-5 w-5 border-default-200 bg-transparent text-primary focus:ring-0"
                  type="radio"
                  name="paymentOption"
                  onChange={(e) => {
                    setPaymentMethod("paymentPaypal");
                  }}
                />
              </div>
              <div className="p-6 text-center">
                <label
                  htmlFor="paymentAmazonPay"
                  className="mb-4 flex flex-col items-center justify-center"
                >
                  <Image
                    src={amazonPaymentImg}
                    className="mb-4 h-6 w-6 dark:invert"
                    alt="amazon"
                  />
                  <h5 className="text-sm font-medium text-default-700">
                    Amazon Pay
                  </h5>
                </label>
                <input
                  id="paymentAmazonPay"
                  className="h-5 w-5 border-default-200 bg-transparent text-primary focus:ring-0"
                  type="radio"
                  name="paymentOption"
                  onChange={(e) => {
                    setPaymentMethod("paymentAmazonPay");
                  }}
                />
              </div>
              <div className="p-6 text-center">
                <label
                  htmlFor="paymentCard"
                  className="mb-4 flex flex-col items-center justify-center"
                >
                  <LuCreditCard className="mb-4 text-primary" size={24} />
                  <h5 className="text-sm font-medium text-default-700">
                    Debit/Credit Card
                  </h5>
                </label>
                <input
                  id="paymentCard"
                  className="h-5 w-5 border-default-200 bg-transparent text-primary focus:ring-0"
                  type="radio"
                  name="paymentOption"
                  onChange={(e) => {
                    setPaymentMethod("paymentCard");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <TextFormInput
              name="nameOnCard"
              type="text"
              label="Name on Card"
              className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
              placeholder="Enter card holder name"
              containerClassName="lg:col-span-2"
              control={control}
            />

            <TextFormInput
              name="cardNo"
              type="text"
              label="Card Number"
              className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
              placeholder="Enter card number"
              containerClassName="lg:col-span-2"
              control={control}
            />

            <DateFormInput
              name="expiryDate"
              type="date"
              label="Expire Date"
              className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
              placeholder="MM/YY"
              control={control}
              options={{
                dateFormat: "m/y",
              }}
              fullWidth
            />

            <TextFormInput
              name="cvvNo"
              type="text"
              label="CVV"
              className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
              placeholder="Enter CVV number"
              maxLength={4}
              control={control}
            />
          </div>
        </div>
        <div>
          <h4 className="mb-6 text-lg font-medium text-default-800">
            Additional Information
          </h4>

          <TextAreaFormInput
            name="message"
            label="Message (optional)"
            placeholder="Notes about your order, e.g. special notes for delivery"
            control={control}
            fullWidth
          />
        </div>
      </div>

      <OrderSummary />
    </form>
  );
};

export default BillingInformation;
