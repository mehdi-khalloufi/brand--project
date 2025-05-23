import React from "react";
import { useNavigate } from "react-router-dom";

const RecentOrders = ({ orders }) => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/admin/orders");
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "paid":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.slice(0, 3).map((order) => (
          <div
            key={order.id}
            className="bg-white text-black rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={
                order.product.image_url ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt="order"
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{order.client_name}</h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>
              <p>
                <strong>Client:</strong> {order.user.name}
              </p>
              <p>
                <strong>Quantité:</strong> {order.quantity}
              </p>
              <p>
                <strong>Prix unitaire:</strong> {order.price} DH
              </p>
              <p>
                <strong>Prix total:</strong> {order.total_price} DH
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleShowMore}
          className="border border-white cursor-pointer  px-5 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default RecentOrders;
