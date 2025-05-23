// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { LifeLine } from "react-loading-indicators";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token, setUser } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user");
        console.log("User data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      } finally {
        setLoading(false);
        setFetched(true);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
      setFetched(true);
    }
  }, [token]);

  if (loading) {
    return  <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <LifeLine color="#ee2b2b" size="medium" text="" textColor="" />
        </div> 
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!fetched) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
