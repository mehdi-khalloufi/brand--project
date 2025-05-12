import { useEffect, useState } from "react";
import api from "./api/axios";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./layouts/Adminlayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import ProductManager from "./pages/ProductManager";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/admin" element ={<Layout />}>
        <Route path="product" element={<Products/>} />
        <Route path="productManager" element={<ProductManager/>} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/shop" element={<Shop />} />
        </Route>

        <Route>
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<Layout />}></Route>
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
