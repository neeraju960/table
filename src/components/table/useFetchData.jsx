import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchData = () => {
  const dataUrl =
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(dataUrl);
      setData(data.result);
      setLoading(false);
    }
    getData();
  }, []);

  return { loading, data };
};

export default useFetchData;
