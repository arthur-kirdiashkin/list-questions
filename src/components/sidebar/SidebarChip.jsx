import React, { useState } from "react";
import "./sidebar_chip.css";

export default function SidebarChip({ onClick, img, value, isActive }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`sidebar-chip ${isActive ? "selected" : ""}`}
    >
      <p className="sidebar-chip__text">{value}</p>
    </div>
  );
}
