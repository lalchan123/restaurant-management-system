"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SpecialMenuSwiper } from "./swipers";
import {
  categoriesData,
  specialMenuData,
  leafHomeImg,
  onionHomeImg,
} from "@/assets/data";
import { cn } from "@/utils";
import { signIn, useSession } from "next-auth/react";
import { getAPIPostDataByRefId } from "@/helpers";

const SpecialMenu = () => {

  const { data: session } = useSession();
  const [dishesData, setDishesData] = useState([
      {
        "Product_Name": "",
        "table_ref_id": "",
        "table_id": 0,
        "id": 0,
        "tab_rel_id": "",
        "user_id": "",
        "Product_Catagory": "",
        "Selling_Price": "",
        "Cost_Price": "",
        "Quantity": "",
        "Delivery_Type": "",
        "Discount": "",
        "Expiry_Date": "",
        "Description": "",
        "Product_Long_Description": "",
        "Return_Policy": "",
        "Sale_Start_On": "",
        "Sale_End_On": "",
        "main_image_path": "",
        "additional_image_path": "",
        "Restuarant_Name": "",
        "Created_By": "",
        "Status": ""
      }
    ])
       
    
  useEffect(() => {
    DataFetch()
  }, [])
    
  const DataFetch = async () => {
    // const dishesDataList = await getAPIPostDataByRefId(41, "", session?.user?.id);
    const dishesDataList = await getAPIPostDataByRefId(41, "", "0");
    setDishesData(dishesDataList?.data?.filter(r => r.Restuarant_Name === '20250811095153046'));
  }
  console.log("55 dishesData", dishesData);

  const [selectedCategory, setSelectedCategory] = useState(
    categoriesData[0].name
  );

  return (
    <section className="py-6 lg:py-16 bg-green-600/5">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-4 lg:gap-10">
          <div>
            <div>
              {/* <span className="mb-6 inline-flex rounded-full bg-primary/20 px-4 py-2 text-sm text-primary"> */}
              <span className="mb-6 inline-flex rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-500">
                Menu
              </span>
              <h2 className="mb-6 text-3xl font-semibold text-default-900">
                Special Menu for you...
              </h2>
            </div>
            <div className="flex w-full flex-wrap">
              <div className="custom-scroll -mx-4 h-auto w-screen overflow-auto px-2 lg:mx-0 lg:h-[30rem] lg:w-full">
                <nav
                  className="flex gap-2 lg:flex-col"
                  aria-label="Tabs"
                  role="tablist"
                  data-hs-tabs-vertical="true"
                >
                  {categoriesData.map((category) => (
                    <button
                      type="button"
                      role="tab"
                      key={category.id}
                      className={cn(
                        "flex p-1",
                        selectedCategory == category.name && "active"
                      )}
                      id={category.name + "-menu-toggle"}
                      data-hs-tab={"#" + category.name + "-menu"}
                      aria-controls={category.name + "-menu"}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {/* <span className="flex w-full items-center justify-start gap-4 rounded-full p-2 pe-6 text-default-900 transition-all hover:text-primary hs-tab-active:bg-primary xl:w-2/3"> */}
                      <span className="flex w-full items-center justify-start gap-4 rounded-full p-2 pe-6 text-default-900 transition-all hover:text-green-500 hs-tab-active:bg-green-500 xl:w-2/3">
                        <div>
                          <span className="inline-flex h-14 w-14 grow items-center justify-center rounded-full hs-tab-active:bg-white">
                            <Image
                              src={category.image}
                              height={32}
                              width={32}
                              className="h-8 w-8"
                              alt="category-img"
                            />
                          </span>
                        </div>
                        <span className="shrink text-base font-medium hs-tab-active:text-white">
                          {category.name}
                        </span>
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="relative lg:mt-24">
              <div className="absolute -top-14 end-15 hidden items-center gap-1 lg:flex">
                {/* <div className="special-menu-left flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-primary transition-all after:hidden after:content-[]"> */}
                <div className="special-menu-left flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-green-500 transition-all after:hidden after:content-[]">
                  <FaAngleLeft className="!h-4 !w-4 text-white" />
                </div>
                {/* <div className="special-menu-right flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-all after:hidden after:content-[]"> */}
                <div className="special-menu-right flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-green-500 text-white transition-all after:hidden after:content-[]">
                  <FaAngleRight className="!h-4 !w-4 text-white" />
                </div>
              </div>

              {/* <div className="rounded-lg bg-primary/10 lg:pb-16"> */}
              <div className="rounded-lg bg-green-500/10 lg:pb-16">
                <div className="p-4 lg:p-6">
                  {categoriesData.map((category) => {
                    return (
                      <div
                        key={category.id}
                        id={category.name + "-menu"}
                        role="tabpanel"
                        aria-labelledby="pizza-menu-item"
                        className={cn(
                          selectedCategory != category.name && "hidden"
                        )}
                      >
                        <div className="grid grid-cols-1">
                          <SpecialMenuSwiper
                            dishes={dishesData?.filter(
                              (dish) => dish.Product_Catagory == selectedCategory
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="hidden lg:flex">
                <div className="swiper-pagination !bottom-12 !start-0" />
                <span className="absolute bottom-0 start-1/4 z-10">
                  <Image src={onionHomeImg} alt="onion" />
                </span>
                <span className="absolute -bottom-12 -end-0 z-10">
                  <Image src={leafHomeImg} alt="leaf" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialMenu;
