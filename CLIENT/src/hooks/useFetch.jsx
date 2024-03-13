import axios from "axios";
import { useEffect, useState } from "react";


const useFetch = (url, query, deps = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(url, { params: query }).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, deps);

  return { data, isLoading };
};

export default useFetch;
