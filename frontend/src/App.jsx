import { useEffect, useState } from "react";
import api from "./api/axios";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import ProductManager from "./pages/ProductManager";
import Buy from "./pages/Buy";
import Order from "./pages/Order";
import MyOrders from "./pages/MyOrders";
import OrderManager from "./pages/OrderManager";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* <Route path="/admin" element={<Layout />}>
          <Route path="product" element={<Products />} />
          <Route path="productManager" element={<ProductManager />} />
        </Route> */}

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/Shop" element={<Layout />}>
            <Route path="products" element={<Shop />} />
            <Route path="buy/:name" element={<Buy />} />
            <Route path="order" element={<Order />} />
            <Route path="myOrders" element={<MyOrders />} />
          </Route>
        </Route>

        <Route>
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<Layout />}>
              <Route path="product" element={<Products />} />
              <Route path="productManager" element={<ProductManager />} />
              <Route path="orders" element={<OrderManager />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
