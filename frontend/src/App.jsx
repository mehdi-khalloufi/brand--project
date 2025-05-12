import { useEffect, useState } from "react";
import api from "./api/axios";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./layouts/layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Buy from "./pages/Buy";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/layout" element={<Layout />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/Shop" element={<Layout />}>
            <Route path="products" element={<Shop />} />
            <Route path="buy" element={<Buy />} />
          </Route>
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
