import { currentCurrency } from "@/common";
import { cn, toSentenceCase } from "@/utils";
import TableSearchBox from "./TableSearchBox";
import { DemoFilterDropdown } from "../filter";
import DateRangeFilter from "./DateRangeFilter";
import GoToAddButton from "./GoToAddButton";
import Link from "next/link";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

const sortFilterOptions = ["Ascending", "Descending"];

const statusFilterOptions = ["All", "Active", "Blocked"];

const CustomerDataTable = ({
  rows,
  columns,
  title,
  buttonLink,
  buttonText,
}) => {
  return (
    <div className="rounded-lg border border-default-200">
      <div className="border-b border-b-default-200 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-xl font-medium text-default-900">{title}</h2>

          <GoToAddButton buttonText={buttonText} buttonLink={buttonLink} />
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TableSearchBox />

          <div className="flex flex-wrap items-center gap-2">
            <DateRangeFilter />

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
      <div className="relative overflow-x-auto border-t border-default-200">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-default-200">
              <thead className="bg-default-100">
                <tr>
                  <th scope="col" className="max-w-[1rem] px-6 py-4">
                    <div className="flex h-5 items-center">
                      <input
                        id="hs-table-search-checkbox-all"
                        type="checkbox"
                        className="form-checkbox h-5 w-5 rounded border border-default-300 bg-transparent text-primary focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
                      />
                      <label
                        htmlFor="hs-table-search-checkbox-all"
                        className="sr-only"
                      >
                        Checkbox
                      </label>
                    </div>
                  </th>

                  {columns?.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="whitespace-nowrap px-6 py-4 text-start text-sm font-medium text-default-500"
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
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex h-5 items-center">
                          <input
                            id="hs-table-search-checkbox-1"
                            type="checkbox"
                            className="form-checkbox h-5 w-5 rounded border border-default-300 bg-transparent text-primary focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
                          />
                          <label
                            htmlFor="hs-table-search-checkbox-1"
                            className="sr-only"
                          >
                            Checkbox
                          </label>
                        </div>
                      </td>

                      {columns.map((column, idx) => {
                        if (column.key == "joining_date") {
                          const tableData = row[column.key];
                          return (
                            <td
                              key={tableData + idx}
                              className="whitespace-nowrap px-6 py-4 text-base text-default-800"
                            >
                              {tableData} |&nbsp;
                              <span className="text-xs">
                                {row["joining_time"]}
                              </span>
                            </td>
                          );
                        } else if (column.key == "Action") {
                          // const colorClassName = "bg-green-500/10 text-green-500"
                          // const colorClassName =
                          //   tableData == "active"
                          //     ? "bg-green-500/10 text-green-500"
                          //     : "bg-red-500/10 text-red-500";
                          return (
                            <td
                              // key={tableData + idx}
                              className="px-6 py-4"
                            >
                              <div className="flex gap-3">
                                <Link
                                  href={`/admin/edit-customer/${row?.table_ref_id}/${row?.user_id}`}
                                >
                                  <LuPencil
                                    size={20}
                                    className="cursor-pointer transition-colors hover:text-primary"
                                  />
                                </Link>  
                                <Link
                                  href='/admin/customers-order/701'
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
                        } else {
                          const tableData = row[column.key];
                          return (
                            <td
                              key={tableData + idx}
                              className="whitespace-nowrap px-6 py-4 text-base text-default-800"
                            >
                              {column.key == "order_total" && currentCurrency}
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

export default CustomerDataTable;
