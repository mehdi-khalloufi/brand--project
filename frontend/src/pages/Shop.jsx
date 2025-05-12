import React, { use, useEffect } from "react";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate } from "react-router";
import api from "../api/axios";
import Products from "../components/Products";

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
      <Products />
    </div>
  );
};

export default Shop;
