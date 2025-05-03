import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../assets/img/mainLogo4.png'; // 상대경로 기준: src/category → src/assets/img


function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left"> {/*home 링크 수정 및 로고 수정 필요*/}
        <Link to="/" className="navbar-logo"> 
          <img src={logoImg} alt="Logo" className="logo" />

        </Link>
      </div>
      <div className="navbar-right">
        <Link
          to="/reviews"
          className={location.pathname.startsWith('/reviews') ? 'active' : ''}
        >
          리뷰
        </Link>
        <Link
          to="/mytrips"
          className={location.pathname.startsWith('/mytrips') ? 'active' : ''}
        >
          나의 여행
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;