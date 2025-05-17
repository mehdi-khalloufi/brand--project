import { useEffect, useState } from "react";
import api from "../api/axios";
import { useStateContext } from "../contexts/contextProvider.jsx"; // adjust import path

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, setUser } = useStateContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user");
        console.log("User data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (!user?.id) return; // wait until user.id is available

    setLoading(true);
    setError("");

    api
      .get(`/api/orders/user/${user.id}`)
      .then((response) => {
        setOrders(response.data);
        console.log("Orders data:", response.data);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch orders");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-black">
        Your Orders
      </h2>

      {loading && (
        <p className="text-center text-gray-700">Loading orders...</p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-center text-gray-600">No orders found.</p>
      )}

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-black p-5 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-6"
          >
            {/* Product Image */}
            {order.product.image_url && (
              <img
                src={order.product.image_url}
                alt={order.product.name}
                className="w-24 h-24 object-cover rounded-md border border-black"
              />
            )}

            {/* Order Details */}
            <div className="flex-grow">
              <p className="text-lg font-bold text-black mb-1">
                 {order.product.name}
              </p>
              <p className="text-sm text-gray-700">
                Quantity: {order.quantity}
              </p>
              <p className="text-sm text-gray-700">Price: ${order.price}</p>
              <p className="text-sm text-gray-700 mt-1 font-semibold">
                Total: ${order.total_price}
              </p>
            </div>

            {/* Order Status */}
            <div className="text-right">
              <span
                className={`inline-block px-4 py-1 text-xs font-semibold rounded-full ${
                  order.status === "PAID"
                    ? "bg-black text-white"
                    : order.status === "PENDING"
                    ? "border border-black text-black"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
