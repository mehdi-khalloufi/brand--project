import { useEffect, useState } from "react";
import api from "../api/axios";
import { LifeLine } from "react-loading-indicators";

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/ordersDetails`)  // Assure-toi que cette route est correcte
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) 
    return (
      <div className="fixed inset-0 bg-opacity-70 z-50 flex items-center justify-center">
        <LifeLine color="#ee2b2b" size="medium" />
      </div>
    );

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6">LES COMMANDES</h1>

      <div className="flex flex-wrap justify-start gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="min-w-[280px] max-w-[320px] bg-white rounded-lg shadow-md border border-black p-4 hover:shadow-lg transition-shadow"
          >
            {/* En-tête de la carte */}
            <div className="mb-2 border-b border-black pb-2">
              <h2 className="text-lg font-bold text-black truncate">{order.product?.name || "Produit inconnu"}</h2>
              <p className="text-gray-600 text-xs">{order.product?.category || "Catégorie inconnue"}</p>
            </div>

            {/* Image du produit */}
            {order.product?.image_url && (
              <img
                src={order.product.image_url}
                alt={order.product.name}
                className="w-full h-32 object-cover mb-2 rounded-md"
              />
            )}

            {/* Détails de la commande */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Client:</span>
                <span>{order.user?.name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Quantité:</span>
                <span>{order.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Prix unitaire:</span>
                <span>{order.price} DH</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Prix total:</span>
                <span>{order.total_price} DH</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Statut:</span>
                <span className={`font-bold ${
                  order.status === "PAID" ? "text-green-600" :
                  order.status === "PENDING" ? "text-yellow-600" :
                  order.status === "SHIPPED" ? "text-blue-600" :
                  "text-red-600"}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Commande passée le :</span>
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderManager;
