import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useStateContext } from "../contexts/contextProvider.jsx";
import { useEffect } from "react";

export default function OrderConfirmation({ product, quantity }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigue vers la page d'accueil
  };
  const { user, token, setUser, setToken } = useStateContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user");
        // console.log("User data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      } finally {
        setLoading(false);
        setFetched(true);
      }
    };
  });

  const handleSubmit = async (status) => {
    try {
      const res = await api.post("/api/orders", {
        user_id: user.id,
        product_id: product.id,
        quantity: quantity,
        price: product.price,
        status: status,
      });

      navigate("/shop/myOrders");
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">
          Confirm Your Selection
        </h1>

        <div className="flex flex-col md:flex-row gap-8 border-b border-black pb-8">
          {/* Product Image Section */}
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="border border-black p-2">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          </div>

          {/* Order Details Section */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-black">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-black p-4">
                <p className="text-sm text-gray-600">Size</p>
                <p className="font-medium text-black">{product.size}</p>
              </div>

              <div className="border border-black p-4">
                <p className="text-sm text-gray-600">Quantity</p>
                <p className="font-medium text-black">{quantity}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-black">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Price per item</p>
                <p className="font-medium text-black">{product.price}Dhs</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Total</p>
                <p className="text-2xl font-bold text-black">
                  {product.price * quantity}Dhs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={goBack}
            className="px-6 py-3 border border-black hover:bg-gray-100 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => handleSubmit("PENDING")}
            className="px-6 py-3 border border-black hover:bg-gray-100 transition-colors"
          >
            Pay later
          </button>
          <button
            className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
            onClick={() =>navigate(`/shop/CheckoutPage/${product.price * quantity}/${quantity}`)} // Add your confirmation logic here
          >
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
}
