import "./sidebar_search.css";

export default function SidebarSearch({ value, onChange }) {
  return (
    <div className="sidebar-search">
      <span className="sidebar-search__icon" />
      <input
        onChange={onChange}
        value={value}
        name="search"
        className="sidebar-search__input"
        type="text"
        placeholder="Введите запрос..."
      />
    </div>
  );
}
