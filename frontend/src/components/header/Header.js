import React from "react";

export default function Header({ title = "Header" }) {
  return (
    <div className="top-0 z-50 w-full flex justify-center items-center h-24 bg-orange-400 text-gray-800 font-bold text-4xl shadow-md border border-gray-200">
      {title}
    </div>
  );
}