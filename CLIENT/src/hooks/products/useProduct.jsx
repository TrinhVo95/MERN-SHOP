import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productServices";

//useProductDetail là 1 hook
const useProduct = (productId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });
  return { data, isLoading };
};

export default useProduct;
