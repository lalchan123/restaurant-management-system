"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextFormInput } from "@/components";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { toast } from "sonner";
import { useShoppingContext } from "@/context";

const CouponCodeForm = () => {
  const { getCalculatedOrder, discountAmount, setDiscountAmount, totalPrice, setTotalPrice } = useShoppingContext();
  const contactFormSchema = yup.object({
    couponCode: yup.string().required("Please enter your coupon code"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    console.log("52 Coupon Data:", data);
    
    const payload = {
      "user_id": "0",
      "table_id": 42,
      "coupon_code": data?.couponCode
    }
    console.log("27 payload", payload)
    // dynamic URL
    const apiUrl = `${BaseURL}/account/coupon-check-api/`;
    const response_data = await restAPIPost(apiUrl, payload);
    console.log("31 response_data", response_data)
    if(response_data.status == 200) {
      toast.success("Coupon Apply Successfully.");
      const subTotal = getCalculatedOrder().orderTotal.toFixed(2);
      var disCount = 0;
      console.log("37 subTotal", subTotal);
      console.log("38 response_data?.data[0]?.coupon_type coupon_amount", response_data?.data[0]?.coupon_type);
      if (response_data?.data[0]?.coupon_type ==='percentage') {
        disCount = subTotal * (parseInt(response_data?.data[0]?.coupon_amount)/100)
      } else {
        disCount = parseInt(response_data?.data[0]?.coupon_amount)
      }
      console.log("43 disCount", disCount);
      var totalPrize = getCalculatedOrder().total.toFixed(2) - disCount;
      console.log("47 totalPrize", totalPrize);
      setDiscountAmount(disCount);
      setTotalPrice(totalPrize);
      // localStorage.clear();
      // router.push("/admin/dishes");
    } else {
      toast.error(response_data?.response?.data?.message);
    } 
  }

  return (
    <div className="rounded-lg border border-default-200">
      <div className="border-b border-default-200 px-6 py-5">
        <h4 className="text-lg font-semibold text-default-800">Coupon Code</h4>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextFormInput
            name="couponCode"
            className="block bg-transparent outline-none"
            placeholder="Enter Coupon Code"
            control={control}
            fullWidth
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              // className="inline-flex items-center justify-center rounded-lg border border-primary bg-primary px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-500 hover:bg-primary-500"
              className="inline-flex items-center justify-center rounded-lg border border-green-500 bg-green-500 px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-500 hover:bg-green-500"
            >
              Apply Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponCodeForm;
