import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { getProductById } from "../../services/productServices";
import useProduct from "../../hooks/products/useProduct";

// //useProductDetail là 1 hook
// const useProductDetail = (productId) => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["products", productId],
//     queryFn: () => getProductById(productId),
//   });
//   return { data, isLoading };
// };
const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isLoading } = useProduct(productId);
  // const {data, isLoading} = useFetch(`/products/${productId}`);

  if (isLoading) return <p>Loading...</p>;
  const { data: product } = data;

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   axios.get(`/products/${productId}`).then((res) => setData(res.data));
  //   // fetch(`http://localhost:4000/products/${productId}`)
  //   //   .then((res) => res.json())
  //   // .then((data) => {
  //   //   setProduct(data), console.log(data);
  //   // }); dùng axios sẽ lấy dữ liệu về tương tự fetch
  // }, [productId]); // id thay đổi thì fetch lại nên truyền productId vào
  // if (!data) return <div>Loading...</div>;
  return (
    <div>
      {/* container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* layout */}
        <div className="grid md:grid-cols-2 mt-20 gap-4 md:gap-8">
          {/* ProductDetail{productId} */}
          <div>
            <img
              className="aspect-square rounded-lg"
              src={product.imageUrl}
              alt="Laptop"
            />
          </div>
          <div>
            <strong className="border-green-600 border rounded-xl bg-gray-100 text-green-600 px-2 font-normal">
              {product.category}
            </strong>
            <div className="flex justify-between mt-3 font-bold ">
              <h1 className="text-2xl">{product.title}</h1>
              <p className="text-lg">${product.price}</p>
            </div>
            <div className="mt-4 pb-10">
              <h5 className="font-extrabold">Description:</h5>
              <p>{product.description}</p>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                nam sapiente nobis ea veritatis error consequatur nisi
                exercitationem iure laudantium culpa, animi temporibus non!
                Maxime et quisquam amet. A, deserunt!
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
