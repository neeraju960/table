import React from "react";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";

const TableHead = ({headerGroups}) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              className="py-3 px-6 select-none"
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              <div
                className="w-full flex items-center justify-between"
                title={
                  column.isSorted
                    ? column.isSortedDesc
                      ? "Desc"
                      : "Asc"
                    : "Sort"
                }
              >
                <p className="flex-1 text-sm text-left truncate">
                  {column.render("Header")}
                </p>
                <span className="w-fit">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )
                  ) : (
                    <FaSort />
                  )}
                </span>
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default React.memo(TableHead);
