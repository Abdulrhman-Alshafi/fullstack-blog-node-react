import React from "react";

const ItemCard = ({ id, name, slug, onDelete }) => {
  return (
    <div
      className={`relative group bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-default`}
    >
      <div className="text-center">
        <h3 className="font-bold text-lg truncate">{name}</h3>
        <p className="text-sm opacity-90 mt-1">#{slug}</p>
      </div>

      <button
        onClick={() => onDelete(id, name)}
        className="absolute top-2 right-2 w-9 h-9 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
        title="Delete"
        aria-label="Delete"
      >
        ×
      </button>
    </div>
  );
};

export default ItemCard;
