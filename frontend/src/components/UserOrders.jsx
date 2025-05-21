import { useEffect, useState } from "react";
import api from "../api/axios";
import { useStateContext } from "../contexts/contextProvider.jsx"; // adjust import path

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, setUser } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  const cancelOrder = async (orderId) => {
    try {
      const res = await api.put(`/api/orders/${orderId}/cancel`);
      console.log("Order cancelled:", res.data);
      // Optionnel : rafraîchir la liste des commandes
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELLED" } : order
        )
      );
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel order. " + (error.response?.data?.message || ""));
    }
  };

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
        {orders.map(
          (order) =>
            order.status != "CANCELLED" && (
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
                {order.status !== "PAID" && order.status !== "CANCELLED" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        setShowModal(true);
                      }}
                      className="cursor-pointer inline-block px-4 py-1 text-xs font-semibold rounded-full border border-red-600 text-red-600 hover:bg-red-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        setShowModal(true);
                      }}
                      className="cursor-pointer inline-block px-4 py-1 text-xs font-semibold rounded-full border border-green-600 text-green-600 hover:bg-green-100 transition"
                    >
                      Pay
                    </button>
                  </>
                )}
              </div>
            )
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Cancellation
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel this order?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={async () => {
                  await cancelOrder(selectedOrderId);
                  setShowModal(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
