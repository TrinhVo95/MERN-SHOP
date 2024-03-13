import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import { EditIcon, TrashIcon } from "../../../components/common/icons";
// import useDebounce from "../../../hooks/useDebounce";
import { useRef } from "react";
import Loader from "../../../components/common/Loader";
import {
  deleteProductById,
  // searchProducts,
} from "../../../services/productServices";
import useSearchProduct from "../../../hooks/products/useSearchProduct";

const DeleteProductModal = ({ id }) => {
  const queryClient = useQueryClient();
  const ref = useRef();

  const mutation = useMutation({
    mutationFn: (productId) => deleteProductById(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ref.current.checked = false; // dùng để tắt checkbox khi delete xong
    },
  });
  return (
    <div>
      <input type="checkbox" ref={ref} id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="text-center">
            {/* warning icon */}
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {/* title */}
            <h3 className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            {/* action buttons */}
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-error text-white"
                onClick={() => mutation.mutate(id)}
              >
                <div className="flex items-center gap-2">
                  {mutation.isLoading && <Loader />}
                  <span>Yes, I'm sure</span>
                </div>
              </button>
              <label htmlFor={id} className="btn btn-outline">
                No, cancel
              </label>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

const AdminProductsAction = ({ searchString, setSearchString }) => {
  return (
    <div className="flex items-center justify-between gap-4 my-6">
      <input
        type="text"
        placeholder="Search product here..."
        className="input input-bordered w-full max-w-xs"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Link to="new" className="btn btn-primary">
        New
      </Link>
    </div>
  );
};
const AdminProductsTable = ({ data, isLoading }) => {
  const [id, setId] = useState(null);
  if (isLoading) return <GlobalSpinner />;

  const {
    data: { products },
  } = data;
  // const { data, isLoading } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => {
  //     return axios.get("/products");
  //   },
  // });
  // if (isLoading) return <GlobalSpinner />;
  //vì đã fetch ở product và nhận prop rồi nên ko cần fetch nữa
  // const {
  //   data: { products },
  // } = data; // vào key data để lấy thằng key products, const products = data.data.products

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- header */}
          <thead>
            <tr>
              <th className="bg-orange-400">NAME</th>
              <th className="bg-orange-400">CATEGORY</th>
              <th className="bg-orange-400">PRICE</th>
              <th className="bg-orange-400">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.imageUrl} alt={item.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost">{item.category}</span>
                </td>
                <td>${item.price}</td>
                <th>
                  <div className="flex items-center gap-3">
                    {/* Edit  */}
                    <div className="tooltip" data-tip="Edit">
                      <Link
                        to={`${item.id}/edit`}
                        className="btn btn-square btn-accent btn-sm hover:opacity-90"
                      >
                        <EditIcon />
                      </Link>
                    </div>

                    {/* Delete */}
                    <div className="tooltip" data-tip="Delete">
                      <label
                        htmlFor={item.id}
                        className="btn btn-sm btn-square btn-error hover:opacity-90"
                        onClick={() => setId(item.id)}
                      >
                        <TrashIcon />
                      </label>

                      {/* <button
                        className="btn btn-sm btn-square btn-error hover:opacity-90"
                        onClick={() => mutation.mutate(item.id)}
                      ></button> */}
                    </div>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {/* modal */}
        <DeleteProductModal id={id} />
      </div>
    </div>
  );
};

// const useSearchProducts = (searchString) => {
//   const debouncedSearch = useDebounce(searchString, 500);

//   const { data, isLoading } = useQuery({
//     queryKey: ["products", { q: debouncedSearch }],
//     queryFn: () => searchProducts(searchString),
//   });
//   return { data, isLoading };
// };
const AdminProducts = () => {
  const [searchString, setSearchString] = useState("");
  const { data, isLoading } = useSearchProduct(searchString, 500); // 500 là delay, có thể tùy chỉnh

  return (
    <div>
      {/* container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="py-6">
          {/* Search and New button */}
          <AdminProductsAction
            searchString={searchString}
            setSearchString={setSearchString}
          />
          {/* Table */}
          <AdminProductsTable data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
