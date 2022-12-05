import React from "react";
import { useNavigate } from "react-router-dom";

function Input({ label, name, register, onChange }) {
  const navigate = useNavigate();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        {...register(name, {
          onChange: (e) => onChange(e, name),
        })}
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
}

export default Input;
