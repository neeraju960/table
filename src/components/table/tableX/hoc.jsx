import React from "react";
import Loader from "../shared/loader";
import useFetchData from "../useFetchData";

const Hoc = (WrapperComponent) => {
  return (props) => {
    const { loading, data } = useFetchData();
    if (loading) {
      return <Loader />;
    }
    return <WrapperComponent {...props} data={data} />;
  };
};

export default Hoc;
