import React from "react";
import { getQueryStringJson } from "./helper";

const DatePicker = ({ label, name, register }) => {
  const { queryString } = getQueryStringJson();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="date"
        {...(queryString[name] && {
          defaultValue: new Date(queryString[name]).toISOString().slice(0, 10),
        })}
        {...register(name)}
        placeholder="Select Date"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default DatePicker;
