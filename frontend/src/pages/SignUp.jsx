import React from "react";
import { useState, useRef, useEffect } from "react";
import api from "../api/axios";
import { useStateContext } from "../contexts/contextProvider";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { setUser, setToken, user, token } = useStateContext();

  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      password: passwordRef.current.value,
      role: "CUSTOMER",
    };
    console.log(newUser);
    api
      .post("/api/signup", newUser)
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        setToken(data.token);
        console.log("Set user called with:", data.user);
        navigate("/shop/products");
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };

  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  useEffect(() => {
    console.log("token updated:", token);
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-red-600">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500">
          Join us and start your journey
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              name="name"
              type="text"
              ref={nameRef}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              name="email"
              type="email"
              ref={emailRef}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              name="address"
              type="text"
              ref={addressRef}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              ref={passwordRef}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              name="password_confirmation"
              type="password"
              ref={passwordConfirmationRef}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
