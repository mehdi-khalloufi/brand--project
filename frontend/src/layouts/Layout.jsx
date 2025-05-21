import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useStateContext } from "../contexts/contextProvider.jsx";
import api from "../api/axios.js";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Products", href: "/admin/products" },
  { name: "Calendar", href: "/calendar" },
  { name: "Reports", href: "/reports" },
];

const customerNavigation = [  
  { name: "Products", href: "/shop/products" },
  { name: "Orders", href: "/shop/myOrders" },
  { name: "panier", href: "/shop/panier" },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, token, setUser, setToken } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  const logout = () => {
    api.post("/api/logout").then(({}) => {
      setUser(null);
      setToken(null);
    });
  };

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
  }, []);

  return (
    <div className="min-h-full">
      <nav className="bg-white h-20 flex items-center w-full shadow-md">
        <div className="px-6 flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <img
              src="/photos/logo1.png"
              alt="Logo"
              className="w-8 mr-2 inline-block"
            />
            <div className="text-black font-bold text-xl h1-font1">
              ECLIPTIC
            </div>
          </div>
          <div className="ml-auto flex items-center">
            <div className="hidden sm:flex ">
              {(user.role == "ADMIN" ? navigation : customerNavigation).map(
                (item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={
                      "text-black hover:border-b-2 hover:border-black py-2 px-3 flex uppercase text-sm font-medium"
                    }
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
            <div className="hidden sm:flex items-center ml-6">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 text-sm focus:outline-none"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-black text-white font-semibold text-lg">
                  {user?.name?.charAt(0).toUpperCase() || "?"}
                </div>
              </button>
              {profileOpen && (
                <div className="absolute top-[60px] right-[42px] mt-2 w-48 bg-black shadow-lg rounded-md py-1 z-50">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        setProfileOpen(false);
                        if (item.name === "Sign out") {
                          logout();
                        }
                      }}
                      className="block px-4 py-2 text-white hover:bg-gray-700 rounded-md"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden ml-4 p-2 text-black hover:text-gray-700"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={classNames(
          "lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={classNames(
            "absolute top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <img src="/photos/logo1.png" alt="Logo" className="w-8" />
                <span className="text-black font-bold text-xl h1-font1">
                  ECLIPTIC
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-gray-100 text-black"
                      : "text-gray-600 hover:bg-gray-100",
                    "block px-4 py-3 rounded-lg font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className=" pt-2 border-t border-gray-200">
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-gray-400 hover:bg-gray-100 rounded-lg font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
