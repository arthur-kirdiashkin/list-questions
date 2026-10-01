import { useState, useRef, useEffect } from "react";
import arrowIcon from "../../assets/arrow_down.png";
import "./nav_dropdown.css";

export default function NavDropdown({ title = "Подготовка", items = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav-dropdown">
      <button
        type="button"
        className="nav-dropdown__btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="nav-dropdown__title">{title}</span>
        <img
          src={arrowIcon}
          alt="Развернуть"
          className={`nav-dropdown__arrow ${isOpen ? "open" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="nav-dropdown__menu">
          {items.map((item, index) => (
            <li key={index} className="nav-dropdown__item">
              <a
                href={item.href}
                className="nav-dropdown__link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
