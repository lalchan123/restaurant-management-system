import Image from "next/image";
import Link from "next/link";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { getAPIPostDataByRefId, getSellerById } from "@/helpers";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";


const RestaurantListCard = async ({ restaurant, table_ref_id_data, user_id_data }) => {
  // const {
  //   contact_no,
  //   address,
  //   email,
  //   logo,
  //   total_dishes,
  //   total_sales,
  //   name,
  //   seller_id,
  //   id,
  // } = restaurant;
  const {
    Account_Holder_Name,
    Account_Number,
    Bank_Name,
    Birth_of_Date,
    Branch,
    Business_Name,
    Business_Type,
    City,
    Country_Region,
    First_Name,
    GST_Number,
    IFSC_Code,
    Last_Name,
    Pan_Card_Number,
    Step1_Contact_Number,
    Step1_Description,
    Step1_Email,
    Step2_Contact_Number,
    Step2_Description,
    Step2_Email,
    Website,
    Zip_Postal_Code,
    id,
    tab_rel_id,
    table_id,
    table_ref_id,
    user_id,
  } = restaurant;

  // const seller = await getSellerById(seller_id).then((seller) => seller);
  const payload = {
    "user_id": user_id_data,
    "table_id": 41,
    "table_ref_id": table_ref_id_data
  }
  const apiUrl = `${BaseURL}/account/restaurant-products-sales-api/`;
  const response_data = await restAPIPost(apiUrl, payload)
  console.log("166 response_data", response_data)
  

  return (
    <div className="relative rounded-lg border border-default-200 p-6">
      {/* <p>Text</p> */}
      
      
      {/* <Image
        src={restaurant1Img.src}
        width={56}
        height={56}
        className="mx-auto mb-4 h-14 w-14"
        alt="restaurant"
      /> */}
      <h4 className="text-center text-base font-medium uppercase text-default-900">
        {First_Name} {Last_Name}
      </h4>
      {/* {seller && (
        <h4 className="mb-10 text-center text-base font-medium text-default-600">
          {seller.name}
        </h4>
      )} */}
      <div className="mb-8 flex justify-around">
        <div className="text-center">
          {/* <h4 className="mb-2.5 text-lg font-medium text-primary"> */}
          <h4 className="mb-2.5 text-lg font-medium text-green-500">
            {response_data?.data?.total_products}
          </h4>
          <h5 className="text-sm text-default-800">Total Product</h5>
        </div>
        <div className="border-s border-default-200" />
        <div className="text-center">
          {/* <h4 className="mb-2.5 text-lg font-medium text-primary"> */}
          <h4 className="mb-2.5 text-lg font-medium text-green-500">
            {response_data?.data?.total_sales}
          </h4>
          <h5 className="text-sm text-default-800">Total Sales</h5>
        </div>
      </div>
      <div className="mb-6 space-y-5">
        <div className="flex gap-3">
          <div className="flex-shrink">
            <LuMapPin size={20} className="text-default-800" />
          </div>
          <p className="d text-sm text-default-700">{City}, {Zip_Postal_Code}, {Country_Region}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink">
            <LuMail size={20} className="text-default-800" />
          </div>
          <p className="d text-sm text-default-700">{Step1_Email}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink">
            <LuPhone size={20} className="text-default-800" />
          </div>
          <p className="d text-sm text-default-700">{Step1_Contact_Number}</p>
        </div>
      </div>
      <div className="text-center">
        <Link
          href={`/admin/restaurants/${table_ref_id}`}
          // className="inline-flex rounded-lg bg-primary px-6 py-2.5 font-medium text-white transition-all hover:bg-primary-500"
          className="inline-flex rounded-lg bg-green-500 px-6 py-2.5 font-medium text-white transition-all hover:bg-green-600"
        >
          View Details
        </Link>
        <Link
          href={`/admin/edit-restaurant/${table_ref_id}/${user_id}`}
          className="inline-flex rounded-lg bg-green-500 px-6 py-2.5 ml-3 font-medium text-white transition-all hover:bg-green-600"
        >
          Edit Details
        </Link>
      </div>
    </div>
  );
};

export default RestaurantListCard;
