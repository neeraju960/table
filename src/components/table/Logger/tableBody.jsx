import React from "react";

const TableBody = ({ getTableBodyProps, prepareRow, page }) => {
  return (
    <tbody {...getTableBodyProps()} className="h-full">
      {page.length === 0 ? (
        <tr>
          <td
            colSpan={10}
            className="h-[200px] text-center text-2xl opacity-50"
          >
            No Data
          </td>
        </tr>
      ) : (
        page.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="transition-all bg-white border-b"
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="py-4 px-6 truncate">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })
      )}
    </tbody>
  );
};

export default TableBody;
