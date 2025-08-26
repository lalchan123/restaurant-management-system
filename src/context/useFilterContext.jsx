"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useMemo, useEffect } from "react";

const FilterContext = createContext(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context == undefined) {
    throw new Error("useFilterContext must be used within an FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  const INIT_FILTER_STATE = {
    categories: searchParams.has("categories")
      ? queryParams["categories"].split(",").map((name) => name)
      : [],
    restaurants: searchParams.has("restaurants")
      ? queryParams["restaurants"].split(",").map((id) => Number(id))
      : [],
    search: searchParams.has("search") ? queryParams["search"] : undefined,
    minPrice: searchParams.has("minPrice")
      ? Number(queryParams["minPrice"])
      : undefined,
    maxPrice: searchParams.has("maxPrice")
      ? Number(queryParams["maxPrice"])
      : undefined,
    rating: searchParams.has("rating")
      ? Number(queryParams["rating"])
      : undefined,
    updateCategory: () => {},
    updateRestaurant: () => {},
    updateSearch: () => {},
    updateMinPrice: () => {},
    updateMaxPrice: () => {},
    updateRating: () => {},
  };

  const [state, setState] = useState(INIT_FILTER_STATE);
  const [products, setProduct] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);

  const updateState = (changes) => setState({ ...state, ...changes });

  const updateCategory = (categoryName) => {
    const categories = state.categories;
    if (!categories.length || !categories.includes(categoryName)) {
      categories.push(categoryName);
      updateState({ categories });
    } else if (categories.includes(categoryName)) {
      updateState({ categories: categories.filter((name) => name != categoryName) });
    }
  };

  const updateRestaurant = (restaurantId) => {
    const restaurants = state.restaurants;
    if (!restaurants.length || !restaurants.includes(restaurantId)) {
      restaurants.push(restaurantId);
      updateState({ restaurants });
    } else if (restaurants.includes(restaurantId)) {
      updateState({
        restaurants: restaurants.filter((id) => id != restaurantId),
      });
    }
  };

  const updateSearch = (search) => updateState({ search });

  const updateMinPrice = (minPrice) => updateState({ minPrice });

  const updateMaxPrice = (maxPrice) => updateState({ maxPrice });

  const updateRating = (rating) => updateState({ rating });

  useEffect(() => {
    let query = "";
    if (!(!state.categories || !state.categories.length)) {
      query += `categories=${state.categories?.join(",")}&`;
    }
    if (!(!state.restaurants || !state.restaurants.length)) {
      query += `restaurants=${state.restaurants?.join(",")}&`;
    }
    if (state.minPrice) {
      query += `minPrice=${state.minPrice.toString()}&`;
    }
    if (state.maxPrice) {
      query += `maxPrice=${state.maxPrice.toString()}&`;
    }
    if (state.rating) {
      query += `rating=${state.rating.toString()}&`;
    }
    if (state.search && state.search.length != 0) {
      query += `search=${state.search}&`;
    }
    router.push(`${pathname}?${query}`, { scroll: false });
  }, [state]);

  return (
    <FilterContext.Provider
      value={useMemo(
        () => ({
          ...state,
          updateCategory,
          updateRestaurant,
          updateSearch,
          updateMinPrice,
          updateMaxPrice,
          updateRating,
          products,
          setProduct,
          currentPage,
          setCurrentPage,
          itemsPerPage, 
          currentProducts,
          setCurrentProducts
        }),
        [state, products, currentPage, itemsPerPage, currentProducts],
      )}
    >
      {children}
    </FilterContext.Provider>
  );
};
