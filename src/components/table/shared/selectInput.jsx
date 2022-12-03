import React, { useMemo } from "react";

function SelectInput({ label, name, register, options }) {
  const makeOptions = useMemo(
    () =>
      options?.map((name, index) => (
        <option key={name + index} value={name}>
          {name}
        </option>
      )),
    []
  );
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select defaultValue="" placeholder="te" className="select select-bordered" {...register(name)}>
        {[<option key={"defauletjah34$"+name} value="" disabled hidden>Select</option>,...makeOptions]}
      </select>
    </div>
  );
}
export default SelectInput;
