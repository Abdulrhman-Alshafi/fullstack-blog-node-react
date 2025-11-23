import React from "react";

const ErrorUI = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <p className="text-lg text-red-500 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorUI;
