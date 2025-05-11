import React, { use, useEffect } from "react";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate } from "react-router";
import api from "../api/axios";

const Shop = () => {
  const { user, token, setUser, setToken } = useStateContext();

  const logout = () => {
    api.post("/api/logout").then(({}) => {
      setUser(null);
      setToken(null);
    });
  };

  return (
    <div>
      {user.name} --------- {token}
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded mx-20 my-2 cursor-pointer"
        onClick={logout}
      >
        LogOUT
      </button>
    </div>
  );
};

export default Shop;
