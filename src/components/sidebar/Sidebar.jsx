import React from "react";
import SidebarSearch from "./SidebarSearch";
import SidebarFilters from "./SidebarFilters";
import "./sidebar.css";
import close from "../../assets/close.png";

export default function Sidebar({
  specializations,
  filters,
  onUpdateFilter,
  onClose,
  isOpen,
}) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <img onClick={onClose} className="close-btn" src={close} alt="закрыть" />
      <SidebarSearch
        value={filters.search}
        onChange={(e) => onUpdateFilter("search", e.target.value)}
      />
      <SidebarFilters
        specializations={specializations}
        filters={filters}
        onUpdateFilter={onUpdateFilter}
      />
    </aside>
  );
}
