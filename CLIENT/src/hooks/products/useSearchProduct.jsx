import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/productServices";
import useDebounce from "../useDebounce";

const useSearchProduct = (searchString, delay) => {
    const debouncedSearch = useDebounce(searchString, delay);
  
    const { data, isLoading } = useQuery({
      queryKey: ["products", { q: debouncedSearch }],
      queryFn: () => searchProducts(searchString),
    });
    return { data, isLoading };
  };

  export default useSearchProduct