"use client"
import { useFilterContext } from "@/context";
import { useMemo } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";


const ProductPagination = () => {
  
  const { categories, maxPrice, minPrice, rating, restaurants, search, products, setProduct, currentPage, setCurrentPage, itemsPerPage, currentProducts, setCurrentProducts } =
    useFilterContext();
  // console.log("8 products", products);
  var totalItems = products.length;
    
    const totalPages = useMemo(
      () => Math.ceil(totalItems / itemsPerPage),
      [totalItems, itemsPerPage]
    );
  
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    const renderPageNumbers = () => {
      const pages = [];
  
      if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        if (currentPage > 3) pages.push("...");
        const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
          (p) => p > 1 && p < totalPages
        );
        pages.push(...middlePages);
        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
      }
  
      return pages.map((page, index) => (
        <li key={index}>
          <span
            onClick={() => typeof page === "number" && goToPage(page)}
            className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${
              page === currentPage
                ? "border-primary bg-primary text-white"
                : "bg-default-100 text-default-800 hover:border-primary hover:bg-primary hover:text-white"
            }`}
          >
            {page}
          </span>
        </li>
      ));
    };
  
    return (
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 pt-6 md:flex-nowrap md:justify-end">
        <nav>
          <ul className="inline-flex items-center space-x-2 rounded-md text-sm">
            {renderPageNumbers()}
          </ul>
        </nav>
        <nav>
          <ul className="inline-flex items-center space-x-2 rounded-md text-sm">
            <li>
              <span
                onClick={() => goToPage(currentPage - 1)}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-default-100 text-default-800 transition-all duration-500 hover:border-primary hover:bg-primary hover:text-white"
              >
                <LuChevronLeft size={20} />
              </span>
            </li>
            <li>
              <span
                onClick={() => goToPage(currentPage + 1)}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-default-100 text-default-800 transition-all duration-500 hover:border-primary hover:bg-primary hover:text-white"
              >
                <LuChevronRight size={20} />
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
};

export default ProductPagination;
