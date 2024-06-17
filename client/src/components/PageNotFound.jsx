import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageWrapper from "./layout/PageWrapper";

function PageNotFound() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center  bg-gray-100 dark:bg-gray-900 py-44">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          Page Not Found
        </p>
        <Link
          to="/home"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition"
        >
          Go Home
        </Link>
      </div>
    </PageWrapper>
  );
}

export default PageNotFound;
