import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../image/logo.jpg';

function Slidebar(props) {
  return (
    <div className="slidebar">
      <div className="nav">
        <img src={logo} alt="logo" />

        <ul className="nav__list">
          <li className="nav__item">
            <i className="fas fa-parachute-box"></i>
            <Link to="/nhacungcap" className="nav__link">
              Quản lý nhà cung cấp
            </Link>
          </li>
          <li className="nav__item">
            <i className="fas fa-cannabis"></i>
            <Link to="/chaucay" className="nav__link">
              Quản lý chậu cây
            </Link>
          </li>
          <li className="nav__item">
            <i className="fas fa-glass-whiskey"></i>
            <Link to="/loaichaucay" className="nav__link">
              Quản lý loại chậu cây
            </Link>
          </li>
          <li className="nav__item">
            <i className="fas fa-receipt"></i>
            <Link to="/phieunhap" className="nav__link">
              Quản lý phiếu nhập
            </Link>
          </li>
          <li className="nav__item">
            <i className="fas fa-address-card"></i>
            <Link to="/nhanvien" className="nav__link">
              Quản lý nhân viên
            </Link>
          </li>
          <li className="nav__item">
            <i className="fas fa-key"></i>
            <Link to="/taikhoan" className="nav__link">
              Quản lý tài khoản
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-bottom">
        <div className="admin">
          <div className="admin__avt"></div>
          <span className="admin__name">Mr. Owen Brady</span>
          <span className="position">Admin</span>
        </div>
        <button className="btn-logout">Đăng xuất</button>
      </div>
    </div>
  );
}

export default Slidebar;
