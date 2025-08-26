import Image from "next/image";
import Link from "next/link";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import { DemoFilterDropdown } from "@/components/filter";
import GoToAddButton from "./GoToAddButton";
import { cn, toSentenceCase } from "@/utils";
import { currentCurrency } from "@/common";
import { getCategoryById } from "@/helpers";
import { BaseURL } from "@/ApiCallMethod/Constants";

const DishDataTable = ({ rows, columns, title, buttonText, buttonLink }) => {
  const sortFilterOptions = ["Ascending", "Descending", "Trending", "Recent"];

  return (
    <>
      <div className="overflow-hidden px-6 py-4 ">
        <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
          <h2 className="text-xl font-semibold text-default-800">{title}</h2>
          <div className="flex flex-wrap items-center gap-4">
            <DemoFilterDropdown
              filterType="Sort"
              filterOptions={sortFilterOptions}
            />

            <GoToAddButton buttonText={buttonText} buttonLink={buttonLink} />
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-default-200">
              <thead className="bg-default-100">
                <tr className="text-start">
                  {columns?.map((column) => (
                    <th
                      key={column?.key}
                      className="whitespace-nowrap px-6 py-3 text-start text-sm font-medium text-default-800"
                    >
                      {column?.name}
                    </th>
                  ))}
                  {/* <th className="whitespace-nowrap px-6 py-3 text-start text-sm font-medium text-default-800">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-default-200">
                {rows?.map((row, idx) => {
                  return (
                    <tr key={idx}>
                      {/* {columns.map(async (column) => { */}
                      {columns?.map((column, idx) => {
                        if (column?.key == "Status") {
                          const tableData = row[column?.key];
                          const colorClassName =
                            tableData == "Published"
                              ? "bg-green-500/10 text-green-500"
                              : tableData == "reviewing"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-pink-500/10 text-pink-500";
                          return (
                            <td key={tableData + idx} className="px-6 py-4">
                              <span
                                className={cn(
                                  "rounded-md px-3 py-1 text-xs font-medium",
                                  colorClassName
                                )}
                              >
                                {toSentenceCase(tableData)}
                              </span>
                            </td>
                          );
                        } else if (column.key == "Action") {
                          return (
                            <td
                              // key={tableData + idx}
                              className="px-6 py-4"
                            >
                              <div className="flex gap-3">
                                <Link
                                  href={`/admin/edit-dish/${row?.table_ref_id}/${row?.user_id}`}
                                >
                                  <LuPencil
                                    size={20}
                                    className="cursor-pointer transition-colors hover:text-primary"
                                  />
                                </Link>  
                                <Link
                                  href={`/admin/dishes/${row?.table_ref_id}/${row?.user_id}`}
                                >
                                  <LuEye
                                    size={20}
                                    className="cursor-pointer transition-colors hover:text-primary"
                                  />
                                </Link>
                                <LuTrash2
                                  size={20}
                                  className="cursor-pointer transition-colors hover:text-red-500"
                                />
                              </div>
                            </td>
                          );
                        } else if (column.key == "Description") {
                          const tableData = row[column.key].split(" ").slice(0, 10).join(" ");
                          return (
                           <td key={tableData + idx} className="px-6 py-4">
                              <span
                                className={cn(
                                  "rounded-md px-3 py-1 text-xs font-medium"
                                )}
                              >
                                {toSentenceCase(tableData)}
                              </span>
                            </td>
                          );
                        } else if (column.key == "Product_Long_Description") {
                          const tableData = row[column.key].split(" ").slice(0, 10).join(" ");
                          return (
                           <td key={tableData + idx} className="px-6 py-4">
                              <span
                                className={cn(
                                  "rounded-md px-3 py-1 text-xs font-medium"
                                )}
                              >
                                {toSentenceCase(tableData)}
                              </span>
                            </td>
                          );
                        } else if (column.key == "main_image_path") {
                          const tableData = row[column.key];
                          return (
                           <td key={tableData + idx} className="px-6 py-4">
                              <Image
                                src={`${BaseURL}${tableData}`}
                                alt="Optimized image"
                                width={70}
                                height={30}
                              />
                            </td>
                          );
                        } else if (column.key == "additional_image_path") {
                          const tableData = row[column.key];
                          return (
                           <td key={tableData + idx} className="px-6 py-4">
                              <Image
                                src={`${BaseURL}${tableData}`}
                                alt="Optimized image"
                                width={70}
                                height={30}
                              />
                            </td>
                          );
                        } else {
                          const tableData = row[column.key];
                          return (
                            <td
                              key={tableData + idx}
                              className="whitespace-nowrap px-6 py-4 text-sm font-medium text-default-500"
                            >
                              {column.key == "price" && currentCurrency}
                              {tableData}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DishDataTable;
