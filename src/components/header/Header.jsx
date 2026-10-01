import { useState } from "react";
import logo from "../../assets/logo.png";
import yeahub from "../../assets/yeahub.png";
import "./header.css";
import NavDropdown from "./NavDropdown";

const PREPARATION_LINKS = [
  { label: "База вопросов", href: "#!" },
  { label: "Тренажер", href: "#!" },
  { label: "Материалы", href: "#!" },
  { label: "Навыки (hh)", href: "#!" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__left">
            <div className="header__logo">
              <img src={logo} alt="Логотип заголовка" />
              <img
                className="header__logo-title"
                src={yeahub}
                alt="Заголовок"
              />
            </div>

            <div className="header__tablet-nav">
              <NavDropdown items={PREPARATION_LINKS} />
            </div>
          </div>

          <ul className="header__list">
            {PREPARATION_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="header__buttons">
            <a href="#!" className="header__entr">
              Вход
            </a>
            <button className="header__reg">Регистрация</button>
          </div>
          <button type="button" className="header__burger">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
