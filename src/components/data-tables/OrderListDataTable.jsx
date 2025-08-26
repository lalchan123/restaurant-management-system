import Image from "next/image";
import Link from "next/link";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import { DemoFilterDropdown } from "@/components/filter";
import GoToAddButton from "./GoToAddButton";
import { cn, toSentenceCase } from "@/utils";
import { currentCurrency } from "@/common";
import { getCategoryById } from "@/helpers";
import { BaseURL } from "@/ApiCallMethod/Constants";

const OrderListDataTable = ({ rows, columns }) => {
  const sortFilterOptions = ["Ascending", "Descending", "Trending", "Recent"];

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-default-200">
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
                  return (
                    <tr key={idx}>
                      {/* {columns.map(async (column) => { */}
                      {columns.map((column, idx) => {
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
                                  href={`/order-list/${row?.table_ref_id}/${row?.user_id}`}
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
    </>
  );
};

export default OrderListDataTable;
