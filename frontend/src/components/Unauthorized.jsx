import React from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <LockClosedIcon className="h-16 w-16 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">401 - Unauthorized</h1>
        <p className="text-gray-600 mb-6">
          Oops! You don't have permission to access this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
