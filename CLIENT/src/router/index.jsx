import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Products from "../views/product/Products";
import ProductDetail from "../views/product/ProductDetail";
import RootLayout from "../components/layouts/RootLayout";
import AdminProducts from "../views/product/Admin/AdminProducts";
import AdminProductNew from "../views/product/Admin/AdminProductNew";
import AdminProductEdit from "../views/product/Admin/AdminProductEdit";
import NotFound from "../views/product/NotFound";

// tẠO ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />,
      },
      {
        path: "admin/products",
        element: <AdminProducts />,
      },
      {
        path: "admin/products/new",
        element: <AdminProductNew />,
      },
      {
        path: "admin/products/:productId/edit",
        element: <AdminProductEdit />,
      },
    ],
  },
]);

export default router;
