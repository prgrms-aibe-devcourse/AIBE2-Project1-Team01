import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../assets/img/mainLogo4.png"; // 상대경로 기준: src/category → src/assets/img

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link
          to="/"
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault(); // React Router 기본 동작 막고
            window.location.href = "/"; // 강제 새로고침
          }}
        >
          <img src={logoImg} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <Link
          to="/reviews"
          className={location.pathname.startsWith("/reviews") ? "active" : ""}
        >
          리뷰
        </Link>
        <Link
          to="/mytrips"
          className={location.pathname.startsWith("/mytrips") ? "active" : ""}
        >
          나의 여행
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
