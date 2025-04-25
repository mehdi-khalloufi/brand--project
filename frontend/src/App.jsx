import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("api/test")
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Message depuis Laravel :</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
