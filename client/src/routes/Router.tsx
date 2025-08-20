import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import RegistrationPage from "@/pages/RegistrationPage";
import LoginPage from "@/pages/LoginPage";
import AddProductPage from "@/pages/AddProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RegistrationPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "add_product",
        element: <AddProductPage />,
      },
    ],
  },
]);

export default router;
