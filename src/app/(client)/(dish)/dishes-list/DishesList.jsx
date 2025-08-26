"use client";
import { ProductListCard } from "@/components";
import { useFilterContext } from "@/context";
import { getAPIPostDataByRefId, getFilteredProducts } from "@/helpers";
import { useEffect, useMemo, useState } from "react";
import { signIn, useSession } from "next-auth/react";


const DishesList = () => {
  const { categories, maxPrice, minPrice, rating, restaurants, search, products, setProduct, currentPage, setCurrentPage, itemsPerPage, currentProducts, setCurrentProducts } =
    useFilterContext();
 

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
    
  const dishes = getFilteredProducts({
    categories,
    maxPrice,
    minPrice,
    rating,
    restaurants,
    search,
    dishesData,
  });


  useEffect(() => {
      if (JSON.stringify(products) !== JSON.stringify(dishes)) {
        setProduct(dishes);
      }
      // setProduct(dishes);
    }, [dishes])
  
    console.log("90 products", products);
  
    // const itemsPerPage = 1;
    // const [currentPage, setCurrentPage] = useState(1);
  
    
    const currentProductsList = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      return products.slice(start, start + itemsPerPage);
    }, [currentPage, products]);
  

  return (
    <>
      {/* {dishes.map((dish) => (
        <ProductListCard key={dish.table_ref_id} dish={dish} />
      ))} */}
      {currentProductsList.map((dish) => (
        <ProductListCard key={dish.table_ref_id} dish={dish} />
      ))}
    </>
  );
};

export default DishesList;
