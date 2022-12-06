import React, { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "./shared/datePicker";
import { getQueryStringJson } from "./shared/helper";
import Input from "./shared/input";
import SelectInput from "./shared/selectInput";

const SearchFilter = ({ actionTypeOptions, applicationTypeOptions }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const makeQS = useCallback((values) => {
    let keys = Object.keys(values);
    if (keys.length) {
      return keys.reduce(
        (final, curr) =>
          (final += `${final ? "&" : "?"}${curr}=${values[curr]}`),
        ""
      );
    }
    return "";
  }, []);

  useEffect(() => {
    const { isQueryString, queryString } = getQueryStringJson();
    reset(
      isQueryString
        ? queryString
        : {
            actionType: "",
            applicationType: "",
            fromDate: "",
            toDate: "",
            applicationId: "",
          }
    );
  }, [location]);

  const { register, handleSubmit, reset, getValues } = useForm();

  const handleOnSubmit = (values) => {
    Object.keys(values).map((key) => !values[key] && delete values[key]);
    navigate(makeQS(values));
  };

  const manualReset = () => {
    flag && navigate("/");
    reset({
      actionType: "",
      applicationType: "",
      fromDate: "",
      toDate: "",
      applicationId: "",
    });
  };

  const handleOnChange = (e, key) => {
    const { isQueryString, queryString } = getQueryStringJson();
    if (isQueryString) {
      queryString[key] = e.target.value;
      if (!queryString[key]) {
        delete queryString[key];
      }
      let keys = Object.keys(queryString);
      let qs = keys.reduce(
        (final, curr) =>
          (final += `${final ? "&" : "?"}${curr}=${queryString[curr]}`),
        ""
      );
      navigate(qs);
      return;
    }
    return navigate(`?${key}=${e.target.value}`);
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
      <DatePicker label="From Date" name="fromDate" register={register} value={getValues("fromDate")}/>
      <DatePicker label="To Date" name="toDate" register={register} value={getValues("toDate")}/>
      <Input
        label="Application Id"
        name="applicationId"
        register={register}
        onChange={handleOnChange}
      />

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
