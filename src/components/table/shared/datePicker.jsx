import React from "react";
const DatePicker = ({ label, name, register, value }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="date"
        value={value ? new Date(value).toISOString().slice(0, 10) : ""}
        {...register(name)}
        placeholder="Select Date"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default DatePicker;
