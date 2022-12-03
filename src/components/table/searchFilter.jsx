import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "./shared/datePicker";
import { getQueryStringJson } from "./shared/helper";
import Input from "./shared/input";
import SelectInput from "./shared/selectInput";

const SearchFilter = ({ actionTypeOptions, applicationTypeOptions }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { isQueryString, queryString } = getQueryStringJson();
    isQueryString && reset(queryString);
  }, [location]);

  const { register, handleSubmit, reset } = useForm();

  const handleOnSubmit = (values) => {
    Object.keys(values).map((key) => !values[key] && delete values[key]);
    let keys = Object.keys(values);
    if (keys.length) {
      let qs = keys.reduce(
        (final, curr) =>
          (final += `${final ? "&" : "?"}${curr}=${values[curr]}`),
        ""
      );
      navigate(qs);
    }
  };

  const manualReset = () => {
    navigate("/");
    reset({
      actionType: "",
      applicationType: "",
      fromDate: "",
      toDate: "",
      applicationId: "",
    });
  };

  return (
    <form
      className="grid grid-cols-6 gap-x-2"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <SelectInput
        label="Action Type"
        name="actionType"
        options={actionTypeOptions}
        register={register}
      />
      <SelectInput
        label="Application Type"
        name="applicationType"
        options={applicationTypeOptions}
        register={register}
      />
      <DatePicker label="From Date" name="fromDate" register={register} />
      <DatePicker label="To Date" name="toDate" register={register} />
      <Input label="Application Id" name="applicationId" register={register} />

      <div className="grid grid-cols-2 gap-x-2">
        <button className="btn btn-outline mt-9">Submit</button>
        <button
          className="btn btn-outline mt-9"
          onClick={(e) => {
            e.preventDefault();
            manualReset();
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default React.memo(SearchFilter);