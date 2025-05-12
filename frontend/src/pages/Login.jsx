import React from "react";
import { useState, useRef, useEffect } from "react";
import api from "../api/axios";
import { useStateContext } from "../contexts/contextProvider";
import { useNavigate } from "react-router-dom";
import { LifeLine } from "react-loading-indicators";

const Login = () => {
  const { setUser, setToken } = useStateContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    const loginUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    api
      .post("/api/login", loginUser)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setLoading(false);
        data.user.role == "ADMIN"
          ? navigate("/admin")
          : navigate("/shop/products");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center  p-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-center gap-3">
            {/* Brand Logo - Replace with your actual logo path */}
            <img
              src="./photos/logo1.png"
              alt="Brand Logo"
              className="w-12 h-12 object-contain"
            />
            {/* Brand Name */}
            <h1 className="text-3xl font-bold text-center h1-font1">
              Ecliptic
            </h1>
          </div>
          <p className="h1-font1 text-sm text-center text-gray-500">
            Please log in to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="h1-font1 block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                ref={emailRef}
                required
                className="h1-font1 w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="h1-font1 block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                ref={passwordRef}
                required
                className="h1-font1 w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
              />
              <div className="text-right mt-2">
                <a
                  href="/forgot-password"
                  className="h1-font1 text-sm text-red-600 hover:underline"
                >
                  Forgot password ?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="h1-font1 w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md  transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="h1-font1 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="h1-font1 text-red-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <LifeLine color="#ee2b2b" size="medium" text="" textColor="" />
        </div>
      )}
    </>
  );
};

export default Login;
