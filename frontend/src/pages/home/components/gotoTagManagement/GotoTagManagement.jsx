import React from "react";
import { Link } from "react-router-dom";

export default function GotoTagManagement() {
  return (
    <Link
      to="/tagManagement"
      className="bg-green-600 text-white px-2 py-2 rounded flex items-center"
    >
      Tag Management
    </Link>
  );
}
