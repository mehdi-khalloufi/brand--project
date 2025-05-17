import React from "react";
import BuyProduct from "../components/BuyProduct";
import { useParams } from "react-router-dom";

const Buy = () => {
  const { name } = useParams();

  return (
    <>
      <BuyProduct name={name} />
    </>
  );
};

export default Buy;
