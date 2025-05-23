import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await api.get("/api/orders/count");
        setOrderCount(response.data.count);
      } catch (error) {
        console.error(
          "Erreur lors du chargement du nombre de commandes",
          error
        );
      }
    };

    fetchOrderCount();
  }, []);

//   useEffect(() => {
//     const fetchUserCount = async () => {
//       try {
//         const response = await api.get("/api/users/count");
//         setUsersCount(response.data.count);
//       } catch (error) {
//         console.error("Erreur lors du chargement du nombre ", error);
//       }
//     };

//     fetchUserCount();
//   }, []);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await api.get("/api/prod/count");
        setUsersCount(response.data.count);
      } catch (error) {
        console.error("Erreur lors du chargement du nombre ", error);
      }
    };

    fetchProductCount();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Tableau de Bord</h1>

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
          <h2 className="text-sm uppercase tracking-widest mb-2">Cancells</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-black text-white rounded-xl p-6 shadow-md">
          <h2 className="text-sm uppercase tracking-widest mb-2">Revenus</h2>
          <p className="text-2xl font-bold">$12,490</p>
        </div>
      </div>

      <div className="mt-10 bg-black text-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Commandes</h2>
      </div>
    </div>
  );
}
