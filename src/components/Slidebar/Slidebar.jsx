import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import './styles.css';
import logo from '../../image/logo.jpg';
import { Context } from '../../contexts/Context';
import { useEffect, useRef } from 'react/cjs/react.development';

function Slidebar(props) {
  const { getUserLogged, userLogged } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    getUserLogged();
    checkUserLogged();
  }, []);

  const qlNhanVien = useRef(null);
  const qlTaiKhoan = useRef(null);
  const refThongKe = useRef(null);

  const checkUserLogged = () => {
    if (userLogged?.loaitaikhoan == 'Quản lý') {
      qlNhanVien.current.style.visibility = 'visible';
      qlTaiKhoan.current.style.visibility = 'visible';
      refThongKe.current.style.visibility = 'visible';
    } else {
      qlNhanVien.current.style.visibility = 'hidden';
      qlTaiKhoan.current.style.visibility = 'hidden';
      refThongKe.current.style.visibility = 'hidden';
    }
  };

  const handleLogout = () => {
    history.push('/');
  };

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
          <li ref={qlNhanVien} className="nav__item">
            <i className="fas fa-address-card"></i>
            <Link to="/nhanvien" className="nav__link">
              Quản lý nhân viên
            </Link>
          </li>
          <li ref={qlTaiKhoan} className="nav__item">
            <i className="fas fa-key"></i>
            <Link to="/taikhoan" className="nav__link">
              Quản lý tài khoản
            </Link>
          </li>
          <li ref={refThongKe} className="nav__item">
            <i className="fas fa-chart-bar"></i>
            <Link to="/thongke" className="nav__link">
              Thống kê phiếu nhập
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-bottom">
        <div className="admin">
          <div className="admin__avt"></div>
          <span className="admin__name">{userLogged?.tentaikhoan}</span>
          <span className="position">{userLogged?.loaitaikhoan}</span>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default Slidebar;
