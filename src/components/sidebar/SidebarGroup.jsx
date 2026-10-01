import { useState } from "react";
import SidebarChip from "./SidebarChip";
import "./sidebar-group.css";

export default function SidebarGroup({
  title,
  items = [],
  selected,
  onSelected,
  limit = 6,
}) {
  const [show, setShow] = useState(false);

  const displayedItems = show ? items : items.slice(0, limit);

  const isItemActive = (id) => {
    return Array.isArray(selected) ? selected.includes(id) : selected === id;
  };

  const isItemSelected = (id) => {
    if (Array.isArray(selected)) {
      const selectedItems = selected.includes(id)
        ? selected.filter((e) => e !== id)
        : [...selected, id];
      onSelected(selectedItems);
    } else {
      onSelected(id);
    }
  };

  return (
    <div className="sidebar-group">
      <h3 className="sidebar-group__title">{title}</h3>
      <div className="sidebar-group__content">
        {displayedItems.map((item) => (
          <SidebarChip
            isActive={isItemActive(item.id)}
            onClick={() => isItemSelected(item.id)}
            key={item.id}
            value={item.title}
            img={item.imageSrc}
          />
        ))}
      </div>
      {items.length > limit ? (
        <p
          className="sidebar-group__btn"
          onClick={() => setShow((prev) => !prev)}
        >
          {!show ? "Посмотреть еще" : "Скрыть"}
        </p>
      ) : null}
    </div>
  );
}
