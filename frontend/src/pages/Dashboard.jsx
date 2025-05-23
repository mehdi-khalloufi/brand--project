import { useState, useEffect } from "react";
import api from "../api/axios";
import RecentOrders from "../components/RecentOrders";
import { LifeLine } from "react-loading-indicators";

export default function Dashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderCountRes, userCountRes, productCountRes] =
          await Promise.all([
            api.get("/api/orders/count"),
            api.get("/api/users/count"),
            api.get("/api/prod/count"),
          ]);

        setOrderCount(orderCountRes.data.count);
        setUsersCount(userCountRes.data.count);
        setProductsCount(productCountRes.data.count);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données générales :",
          error
        );
      }

      try {
        const ordersRes = await api.get("/api/ordersDetails");
        setOrders(ordersRes.data);
      } catch (error) {
        console.warn("Utilisateur non autorisé à voir les commandes :", error);
        setOrders([]); // ou un état neutre
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <LifeLine color="#ee2b2b" size="medium" text="" textColor="" />
      </div>
    );
  }

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.status=="PAID" && order.total_price),
    0
  );

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-black text-white rounded-xl p-6 shadow-md">
          <h2 className="text-sm uppercase tracking-widest mb-2">Commandes</h2>
          <p className="text-2xl font-bold">{orderCount}</p>
        </div>

        <div className="bg-black text-white rounded-xl p-6 shadow-md">
          <h2 className="text-sm uppercase tracking-widest mb-2">
            Utilisateurs
          </h2>
          <p className="text-2xl font-bold">{usersCount}</p>
        </div>

        <div className="bg-black text-white rounded-xl p-6 shadow-md">
          <h2 className="text-sm uppercase tracking-widest mb-2">Produits</h2>
          <p className="text-2xl font-bold">{productsCount}</p>
        </div>

        <div className="bg-black text-white rounded-xl p-6 shadow-md">
          <h2 className="text-sm uppercase tracking-widest mb-2">Revenus</h2>
          <p className="text-2xl font-bold">{totalRevenue}Dhs</p>
        </div>
      </div>

      <div className="mt-10 bg-black text-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Commandes</h2>
        <RecentOrders orders={orders} />
      </div>
    </div>
  );
}
