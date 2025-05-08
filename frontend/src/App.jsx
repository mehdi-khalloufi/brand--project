import { useEffect, useState } from "react";
import api from "./api/axios";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   api.get("api/test")
  //     .then(res => setMessage(res.data.message))
  //     .catch(err => console.error(err));
  // }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Home />} />)
  );

  return <RouterProvider router={router} />;
}

export default App;
