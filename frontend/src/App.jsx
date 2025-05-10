import { useEffect, useState } from "react";
import api from "./api/axios";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("api/test")
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Accueil</h1>
      <p>{message}</p>
    </div>
  );
}

function About() {
  return <h1>À propos</h1>;
}

function NotFound() {
  return <h1>Page non trouvée</h1>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
