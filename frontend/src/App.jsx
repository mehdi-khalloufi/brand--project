import { useEffect, useState } from "react";
import axios from "axios";
import api from "./api/axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/api/test")
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-bold underline"> mehdi qui testi Message depuis Laravel  test chi 9:</h1>
      <p className="">{message}</p>
    </div>
  );
}

export default App;