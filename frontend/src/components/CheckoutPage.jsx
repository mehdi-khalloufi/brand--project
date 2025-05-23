import React from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { total, orderId } = useParams();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const res = await api.patch(`/api/orders/${orderId}/mark-paid`);
      console.log("Order paid:", res.data);
      navigate(-1);
      

    } catch (error) {
      console.error("Failed to mark order as paid:", error);
      alert(
        "Failed to mark order as paid. " + (error.response?.data?.message || "")
      );
    }
    alert("Payment Successful!");
    navigate("/confirmation", { state: { total } });
  };
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

          <div className="text-lg font-semibold text-gray-800 mb-6">
            Total to Pay:{" "}
            <span className="text-teal-600">${total}</span>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full rounded-lg border py-2 px-3"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="w-full rounded-lg border py-2 px-3"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="address" className="block text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="city" className="block text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="state" className="block text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="w-full rounded-lg border py-2 px-3"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="w-full rounded-lg border py-2 px-3"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Payment Information
            </h2>

            <div className="mt-4">
              <label htmlFor="card_number" className="block text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="card_number"
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="exp_date" className="block text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="text"
                  id="exp_date"
                  className="w-full rounded-lg border py-2 px-3"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="w-full rounded-lg border py-2 px-3"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => handlePlaceOrder()}
              className="bg-gray-900 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-700"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
