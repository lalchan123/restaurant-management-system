import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { LuXCircle } from "react-icons/lu";
import { currentCurrency } from "@/common";
import { calculatedPrice } from "@/helpers";
import { useShoppingContext } from "@/context";
import { BaseURL } from "@/ApiCallMethod/Constants";
const ProductQuantityToggler = dynamic(
  () => import("@/components/shopping-interactivity/ProductQuantityToggler"),
  { ssr: false }
);

const ShoppingCartCard = ({ dish }) => {
  // const { name, id, images, price, sale } = dish;

  const { cartItems } = useShoppingContext();
  console.log("18 cartItems", cartItems);
  const quantity = cartItems.find((item) => item.dish_id == dish?.id)?.quantity ?? 1;

  // const discountedPrice = calculatedPrice(dish);

  return (
    <tr>
      <td className="whitespace-nowrap px-5 py-3">
        <div className="flex items-center gap-2">
          <button>
            <LuXCircle size={20} className="text-default-400" />
          </button>
          <Image
            // src={images[0]}
            src={`${BaseURL}${dish?.main_image_path}`}
            width={72}
            height={72}
            className="h-18 w-18"
            alt="onion"
          />
          <Link
            // href={`/dishes/${id}`}
            href={`/dishes/`}
            className="text-sm font-medium text-default-800"
          >
            {dish?.Product_Name}
          </Link>
        </div>
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-sm">
        <h4 className="text-base font-semibold text-primary">
          {currentCurrency}
          {dish?.Selling_Price}
          {/* {discountedPrice} */}
        </h4>

        {dish?.Cost_Price && (
          <h4 className="ms-2 text-sm text-default-500 line-through">
            {currentCurrency}
            {dish?.Cost_Price}
          </h4>
        )}
      </td>
      <td className="whitespace-nowrap px-5 py-3">
        <ProductQuantityToggler dish={dish} />
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-center text-sm text-default-800">
        {currentCurrency}
        {dish?.Selling_Price * quantity}
      </td>
    </tr>
  );
};

export default ShoppingCartCard;
