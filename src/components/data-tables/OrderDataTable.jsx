import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import { DemoFilterDropdown } from "@/components";
import { cn, toSentenceCase } from "@/utils";
import { currentCurrency } from "@/common";

const sortFilterOptions = ["Ascending", "Descending"];

const statusFilterOptions = ["All", "Paid", "Cancelled", "Refunded"];

const OrderDataTable = ({ rows, columns, title }) => {
  return (
    <div className="rounded-lg border border-default-200">
      <div className="overflow-hidden p-6 ">
        <div className="flex flex-wrap items-center gap-4 sm:justify-between lg:flex-nowrap">
          <h2 className="text-xl font-semibold text-default-800">{title}</h2>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <DemoFilterDropdown
              filterType="Sort"
              filterOptions={sortFilterOptions}
            />

            <DemoFilterDropdown
              filterType="Status"
              filterOptions={statusFilterOptions}
            />
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="w-full divide-y divide-default-200">
              <thead className="bg-default-100">
                <tr className="text-start">
                  {columns?.map((column) => (
                    <th
                      key={column.key}
                      className="whitespace-nowrap px-6 py-3 text-start text-sm font-medium text-default-800"
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-default-200">
                {rows?.map((row, idx) => {
                  // const dish = row.dish;
                  return (
                    <tr key={idx}>
                     {columns?.map((column, idx) => {
                        if (column.key == "Status") {
                          const tableData = row[column.key];
                          const colorClassName =
                            tableData == "Paid"
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
                                  href={`/order-details/${row?.table_ref_id}/${row?.Order_Id}`}
                                >
                                  <LuEye
                                    size={20}
                                    className="cursor-pointer transition-colors hover:text-primary"
                                  />
                                </Link>
                              </div>
                            </td>
                          );
                        }  else {
                          const tableData = row[column.key];
                          return (
                            <td
                              key={tableData + idx}
                              className="whitespace-nowrap px-6 py-4 text-sm font-medium text-default-500"
                            >
                              {column.key == "SubTotal" || column.key == "Discount" || column.key == "Tax" || column.key == "Total" && currentCurrency}
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
    </div>
  );
};

export default OrderDataTable;
