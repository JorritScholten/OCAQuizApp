import React from "react";
import { Link } from "react-router-dom";

export default function GotoButton({to, text}) {
  return (
    <Link
      to={to}
      className="bg-green-600 text-white px-2 py-2 rounded flex items-center"
    >
      {text}
    </Link>
  );
}
