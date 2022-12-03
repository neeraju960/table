import React, { useEffect, useMemo, useState } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import SearchFilter from "../searchFilter";
import Hoc from "./hoc";
import TableBody from "./tableBody";
import TableHead from "./tableHead";
import { col } from "../columns";
import Pagination from "./pagination";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { getQueryStringJson } from "../shared/helper";

const TableX = (props) => {
  const location = useLocation();
  const [data, setData] = useState(props.data?.auditLog);

  useEffect(() => {
    const { isQueryString, queryString } = getQueryStringJson();
    if (!isQueryString) {
      setData(props.data?.auditLog);
    }
    if (isQueryString) {
      let reducedArray = props.data?.auditLog.reduce((acc, curr) => {
        const { fromDate, toDate, ...rest } = queryString;
        let flag1 = true;
        if (fromDate && !toDate) {
          flag1 = moment(curr["creationTimestamp"]).isSameOrAfter(
            fromDate,
            "day"
          );
        }
        if (toDate && !fromDate) {
          flag1 = moment(curr["creationTimestamp"]).isSameOrBefore(
            toDate,
            "day"
          );
        }
        if (toDate && fromDate) {
          flag1 = moment(curr["creationTimestamp"]).isBetween(
            fromDate,
            toDate,
            "day",
            "[]"
          );
        }
        let flag = Object.keys(rest).every(
          (key) => `${rest[key]}` === `${curr[key]}`
        );
        flag1 && flag && acc.push(curr);
        return acc;
      }, []);
      setData(reducedArray);
    }
  }, [location]);

  const {
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    pageCount,
    gotoPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns: col,
      data: data,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const getActionTypes = useMemo(
    () =>
      Object.keys(
        props.data?.auditLog.reduce((acc, curr) => {
          acc[curr.actionType] = curr.actionType;
          return acc;
        }, {})
      ),
    []
  );

  const getApplicationType = useMemo(
    () =>
      Object.keys(
        props.data?.auditLog.reduce((acc, curr) => {
          if (curr.applicationType) {
            acc[curr.applicationType] = curr.applicationType;
          }
          return acc;
        }, {})
      ),
    []
  );

  return (
    <div className="h-full w-full flex flex-col gap-y-2 overflow-hidden py-2">
      <SearchFilter
        actionTypeOptions={getActionTypes}
        applicationTypeOptions={getApplicationType}
      />
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1 overflow-auto">
          <table className=" w-full">
            <TableHead headerGroups={headerGroups} />
            <TableBody
              getTableBodyProps={getTableBodyProps}
              prepareRow={prepareRow}
              page={page}
            />
          </table>
        </div>
        <div className="h-14 flex items-center justify-center">
          <Pagination
            gotoPage={gotoPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageCount={pageCount}
            currentPageCount={state.pageCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Hoc(TableX);
