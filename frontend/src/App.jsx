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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
    <Route path="/" element={<Home />} />
    <Route path="/layout" element={<Layout />} />
    </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
