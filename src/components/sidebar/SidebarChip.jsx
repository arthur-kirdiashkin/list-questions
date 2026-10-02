import "./sidebar_chip.css";

export default function SidebarChip({ onClick, value, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`sidebar-chip ${isActive ? "selected" : ""}`}
    >
      <p className="sidebar-chip__text">{value}</p>
    </div>
  );
}
