import axios from "axios";

export const getProducts = () => {
  return axios.get("/products");
};
export const getProductById = (id) => {
  return axios.get(`/products/${id}`);
};
export const searchProducts = (query) => {
  return axios.get("/products/search", { params: { q: query } });
};

export const createProduct = (data) => {
  return axios.post("/products/add", data);
};

export const updateProductById = (id, data) => {
  return axios.put(`/products/${id}`, data);
};
export const deleteProductById = (id) => {
  return axios.delete(`/products/${id}`);
};
