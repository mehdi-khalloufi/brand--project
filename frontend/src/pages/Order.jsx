import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";
import { LifeLine } from "react-loading-indicators";

import api from "../api/axios";

const Order = () => {
  const location = useLocation();
  const { productId, quantity } = location.state;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
        // console.log("Product data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <LifeLine color="#ee2b2b" size="medium" />
        </div>
      ) : (
        <OrderConfirmation product={product} quantity={quantity} />
      )}
    </>
  );
};

export default Order;
